/// <reference types="node" />
// TODO: Add Google Maps component.
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { catchError, debounceTime, finalize, map, startWith } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { combineLatest } from 'rxjs';
import { ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
} from 'ng-recaptcha';
import { ByteFormatPipe } from '../../pipes/byte-format.pipe';
import { SharedModule } from '../shared.module';
import { getRuntimeEnv } from '../../utils/runtime-env';

const CONTACT_FORM_STORAGE_KEY = 'contactFormState';

// TODO: Add verbose datepicker with custom formats.
// TODO: Change all the public to private.
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    NgxMatIntlTelInputComponent,
    RecaptchaModule,
    RecaptchaFormsModule,
    ByteFormatPipe,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: getRuntimeEnv('RECAPTCHA_API_KEY'),
      },
    },
  ],
})
export class ContactComponent implements OnInit, OnDestroy {
  public acceptedTerms = false;
  public readonly recaptchaSiteKey = getRuntimeEnv('RECAPTCHA_API_KEY');
  public readonly isRecaptchaConfigured = this.recaptchaSiteKey.trim().length > 0;
  /** Whether backend integrations (Firebase, storage, reCAPTCHA) are available */
  public readonly isBackendConfigured =
    !!getRuntimeEnv('FIREBASE_API_KEY') &&
    !!getRuntimeEnv('FIREBASE_PROJECT_ID') &&
    !!getRuntimeEnv('FIRESTORE_COLLECTION_MESSAGES') &&
    !!getRuntimeEnv('FIRESTORE_COLLECTION_FILES');
  private formPersistenceSub?: Subscription;
  private phoneValidationSub?: Subscription;
  private phoneHadValidValue = false;
  public currentDate: Date = new Date();
  // TODO: Make this 1 array of interface which would hold content type, download URL and filename?
  public contentType: string[] = [];
  public downloadURL: string[] = [];
  public fileName: string = '';
  /** File names for display when restored from persistence (no FileList) */
  public persistedFileNames: string[] = [];
  /** Total file size when restored from persistence */
  public persistedTotalSize = 0;
  public isUploading = false;
  public uploadProgress = 0;
  public maxFileSize = 20971520;
  public servicesItems: string[] = [
    'Cyber Security',
    'Digital Strategy',
    'Software Development',
  ];
  public validatorDescriptionMaxLength: number = 5000;
  public validatorDescriptionMinLength: number = 30;
  public validatorEmailMaxLength: number = 512;
  public validatorEmailMinLength: number = 6;
  public validatorNameMaxLength: number = 64;
  public validatorNameMinLength: number = 2;
  public validatorPhoneMaxLength: number = 14;
  public validatorPhoneMinLength: number = 4;
  private _angularFirestore: AngularFirestore | null | undefined;
  private _angularFireStorage: AngularFireStorage | null | undefined;

  /** Preferred countries for phone input, with user's locale country first when detectable */
  public readonly preferredCountries: string[] = (() => {
    const defaults = ['us', 'au', 'ca', 'de', 'ie', 'nl', 'no', 'pl', 'ch', 'uk'];
    if (typeof navigator === 'undefined') return defaults;
    const locale = navigator.language || (navigator.languages?.[0]) || '';
    const parts = locale.split('-');
    const country = parts.length > 1 ? parts[1].toLowerCase() : null;
    if (country && country.length === 2) {
      return [country, ...defaults.filter((c) => c !== country)];
    }
    return defaults;
  })();

  // Create max deadline dynamically 5 years from now.
  public day: number = this.currentDate.getDate();
  public month: number = this.currentDate.getMonth();
  public year: number = this.currentDate.getFullYear();
  public maxDate: Date = new Date(this.year + 5, this.month, this.day);

  // Create contact form with all required validators.
  public contactForm!: FormGroup;

  /**
   * @constructor
   * @description Creates a new instance of this component.
   * @param angularFirestore - Firestore service for reading/writing contact submissions.
   * @param angularFireStorage - Firebase Storage service for file uploads.
   * @param formBuilder - Abstraction to create form group controls for the contact form.
   * @param cdr - Change detector ref for triggering change detection when needed.
   */
  constructor(
    private injector: Injector,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    // Initialize contact form in constructor to avoid initialization order issues
    this.contactForm = this.formBuilder.group({
    acceptedTerms: ['', Validators.required],
    fileUploader: [
      null,
      Validators.compose([this.fileSizeValidator(this.maxFileSize)]),
    ],
    formControlContactPreference: '',
    formControlDeadline: '',
    formControlDescription: [
      '',
      Validators.compose([
        Validators.maxLength(this.validatorDescriptionMaxLength),
        Validators.minLength(this.validatorDescriptionMinLength),
        Validators.required,
      ]),
    ],
    formControlEmail: [
      '',
      Validators.compose([
        Validators.email,
        Validators.maxLength(this.validatorEmailMaxLength),
        Validators.minLength(this.validatorEmailMinLength),
        Validators.required,
      ]),
    ],
    formControlName: [
      '',
      Validators.compose([
        Validators.maxLength(this.validatorNameMaxLength),
        Validators.minLength(this.validatorNameMinLength),
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
    ],
    formControlPhone: [
      '',
      Validators.minLength(8), // Catches 2+ digit incomplete (e.g. "+112"); "1" alone emits undefined
    ],
    formControlService: '',
    recaptchaCheck: ['', this.isRecaptchaConfigured ? Validators.required : Validators.nullValidator],
    });

    // ngx emits undefined for "1" (all countries); for "12","123" it emits e.g. "+112" - minLength(8) catches those
    // Mark invalid when empty + never had valid; valueChanges only fires on change so no false positive on init
    const phoneCtrl = this.contactForm.get('formControlPhone')!;
    this.phoneValidationSub = phoneCtrl.valueChanges.subscribe((v) => {
      const empty = v === null || v === '' || v === undefined;
      const hasValue = !empty && String(v).length >= 8;
      if (hasValue && phoneCtrl.valid) this.phoneHadValidValue = true;
      if (empty) {
        if (!this.phoneHadValidValue) {
          phoneCtrl.setErrors({ ...(phoneCtrl.errors || {}), incompletePhone: true });
        } else {
          const { incompletePhone: _, ...rest } = phoneCtrl.errors || {};
          phoneCtrl.setErrors(Object.keys(rest).length ? rest : null);
          this.phoneHadValidValue = false; // Reset so next "1" after clear is caught
        }
      }
    });

    this.formPersistenceSub = this.contactForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => this.saveFormState(value));
  }

  private get angularFirestore(): AngularFirestore | null {
    if (this._angularFirestore !== undefined) {
      return this._angularFirestore;
    }
    try {
      this._angularFirestore = this.injector.get(AngularFirestore);
    } catch {
      this._angularFirestore = null;
    }
    return this._angularFirestore;
  }

  private get angularFireStorage(): AngularFireStorage | null {
    if (this._angularFireStorage !== undefined) {
      return this._angularFireStorage;
    }
    try {
      this._angularFireStorage = this.injector.get(AngularFireStorage);
    } catch {
      this._angularFireStorage = null;
    }
    return this._angularFireStorage;
  }

  /**
   * @access public
   * @callback ngOnInit
   * @description Angular lifecycle hook. Schedules loading of persisted form state on the next tick so the form and controls are ready.
   * @returns {void}
   */
  public ngOnInit(): void {
    setTimeout(() => this.loadFormState(), 0);
  }

  /**
   * @access public
   * @callback ngOnDestroy
   * @description Angular lifecycle hook. Unsubscribes from form persistence and phone validation subscriptions to avoid memory leaks.
   * @returns {void}
   */
  public ngOnDestroy(): void {
    this.formPersistenceSub?.unsubscribe();
    this.phoneValidationSub?.unsubscribe();
  }

  /**
   * @access private
   * @description Loads the persisted form state from local storage.
   * @returns {void}
   */
  private loadFormState(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const saved = localStorage.getItem(CONTACT_FORM_STORAGE_KEY);
      if (!saved) return;
      const state = JSON.parse(saved) as Record<string, unknown>;
      if (!state || typeof state !== 'object') return;

      const patch: Record<string, unknown> = {};
      if (typeof state['formControlName'] === 'string') patch['formControlName'] = state['formControlName'];
      if (state['formControlEmail'] != null) patch['formControlEmail'] = String(state['formControlEmail']);
      if (state['formControlPhone'] != null) patch['formControlPhone'] = state['formControlPhone'];
      if (state['formControlDeadline'] != null) {
        const d = state['formControlDeadline'];
        patch['formControlDeadline'] = typeof d === 'string' ? new Date(d) : d;
      }
      if (typeof state['formControlDescription'] === 'string') patch['formControlDescription'] = state['formControlDescription'];
      if (state['formControlContactPreference'] != null) patch['formControlContactPreference'] = state['formControlContactPreference'];
      if (Array.isArray(state['formControlService'])) patch['formControlService'] = state['formControlService'];
      if (state['acceptedTerms'] != null) {
        patch['acceptedTerms'] = state['acceptedTerms'];
        this.acceptedTerms = !!state['acceptedTerms'];
      }

      if (Array.isArray(state['downloadURL'])) this.downloadURL = [...state['downloadURL']];
      if (Array.isArray(state['contentType'])) this.contentType = [...state['contentType']];
      if (typeof state['fileName'] === 'string') this.fileName = state['fileName'];
      if (Array.isArray(state['fileNames'])) this.persistedFileNames = [...state['fileNames']];
      if (typeof state['totalSize'] === 'number') this.persistedTotalSize = state['totalSize'];

      this.contactForm.patchValue(patch, { emitEvent: false });
      this.contactForm.get('formControlEmail')?.updateValueAndValidity({ emitEvent: false });
      this.cdr.detectChanges();
    } catch {
      // Ignore parse errors or invalid stored data
    }
  }

  /**
   * @access private
   * @description Saves the current form state to local storage.
   * @param {Record<string, unknown>} value - Optional value to save, defaults to current form value.
   * @returns {void}
   */
  private saveFormState(value?: Record<string, unknown>): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const formValue = value ?? this.contactForm.value;
      const deadline = formValue['formControlDeadline'];
      const state: Record<string, unknown> = {
        formControlName: formValue['formControlName'] ?? '',
        formControlEmail: formValue['formControlEmail'] ?? '',
        formControlPhone: formValue['formControlPhone'] ?? '',
        formControlDeadline: deadline instanceof Date ? deadline.toISOString() : deadline,
        formControlDescription: formValue['formControlDescription'] ?? '',
        formControlContactPreference: formValue['formControlContactPreference'] ?? '',
        formControlService: formValue['formControlService'] ?? '',
        acceptedTerms: formValue['acceptedTerms'] ?? false,
        downloadURL: this.downloadURL,
        contentType: this.contentType,
        fileName: this.fileName,
        fileNames: this.getSelectedFileNames().length > 0 ? this.getSelectedFileNames() : this.persistedFileNames,
        totalSize: this.getSelectedFilesTotalSize() || this.persistedTotalSize,
      };
      localStorage.setItem(CONTACT_FORM_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota exceeded or other storage errors
    }
  }

  /**
   * @access private
   * @description Custom validator for file size.
   * @param {number} maxSize Maximum file size in bytes.
   * @returns {Function} Validator function.
   */
  private fileSizeValidator(maxSize: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: FileList | null = control.value;
      if (!files || files.length === 0) {
        return null;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSize) {
          return {
            maxContentSize: {
              maxSize: maxSize,
              actualSize: file.size,
            },
          };
        }
      }

      return null;
    };
  }

  /**
   * @access public
   * @description Filter available days in the datepicker to choose.
   * @param {Date} date Instance of date.
   * @returns {boolean}
   */
  public filterAvailableDays = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day !== 0 && day !== 6; // Prevent Saturday and Sunday from being selected.
  };

  /**
   * @access public
   * @description Handle state of accepted terms.
   * @returns {void}
   */
  public handleTerms(): void {
    this.acceptedTerms = !this.acceptedTerms;
  }

  /**
   * @access public
   * @description Check if phone in contact form has an error.
   * @param {event} - event for handling the error.
   * @returns {void}
   */
  public hasError(event: any): void {
    if (!event && this.contactForm.value.formControlPhone !== '') {
      this.contactForm
        .get('formControlPhone')! // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.
        .setErrors(['invalid_cell_phone', true]);
    }
  }

  /**
   * @access public
   * @description Perform certain behaviours on button submit of the contact form, both of the parameters are required due to technical requirements.
   * @param {any} form Object of submitted contact form.
   * @param {FormGroupDirective} formDirective Object required to reset validators.
   * @returns {void}
   */
  public onSubmit(form: any, formDirective: FormGroupDirective): void {
    form.contentType = this.contentType;
    form.fileUploader = this.downloadURL;
    form.fileName = this.fileName;

    if (!this.isBackendConfigured) {
      Swal.fire(
        'Temporarily unavailable',
        'Our contact form is temporarily unavailable. Please email us directly or try again later.',
        'info'
      );
      return;
    }

    if (!this.angularFirestore) {
      Swal.fire(
        'Temporarily unavailable',
        'Our contact form is temporarily unavailable. Please email us directly or try again later.',
        'info'
      );
      return;
    }

    this.angularFirestore
      .collection(
                    getRuntimeEnv('FIRESTORE_COLLECTION_MESSAGES')
      )
      .add(form)
      .then(() => {
        Swal.fire(
          'Email sent to us.',
          'Thank you for filling and sending this contact form. We will get back to you as fast as possible.',
          'success'
        );
        this.contactForm.reset(); // Reset form once user will click "Send Message".
        formDirective.resetForm(); // Reset validators, i.e. to workaround #4190 (https://github.com/angular/components/issues/4190).
        this.acceptedTerms = false;
        this.downloadURL = [];
        this.contentType = [];
        this.persistedFileNames = [];
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(CONTACT_FORM_STORAGE_KEY);
        }
      })
      .catch(() => {
        Swal.fire(
          'Error occurred.',
          'It was not possible to send the contact form. Please try again or contact us directly.',
          'error'
        );
        throw new Error('Error with submitting contact form.'); // throw an Error
      });
  }

  /**
   * @access public
   * @description Get count of selected files for display.
   * @returns {number} Number of selected files.
   */
  public getSelectedFilesCount(): number {
    const files: FileList | null = this.contactForm.get('fileUploader')?.value;
    if (files && files.length > 0) return files.length;
    return this.downloadURL.length || this.persistedFileNames.length;
  }

  /**
   * @access public
   * @description Get total size in bytes of selected files.
   * @returns {number} Total size in bytes, or 0 if no files.
   */
  public getSelectedFilesTotalSize(): number {
    const files: FileList | null = this.contactForm.get('fileUploader')?.value;
    if (files && files.length > 0) return Array.from(files).reduce((sum, f) => sum + f.size, 0);
    return this.persistedTotalSize;
  }

  /**
   * @access public
   * @description Get names of selected files for display.
   * @returns {string[]} Array of file names.
   */
  public getSelectedFileNames(): string[] {
    const files: FileList | null = this.contactForm.get('fileUploader')?.value;
    if (files && files.length > 0) return Array.from(files).map((f) => f.name);
    return this.persistedFileNames;
  }

  /**
   * @access public
   * @description Handle file input change and update form control value.
   * @param {Event} event File input change event.
   * @returns {void}
   */
  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.contactForm.get('fileUploader')?.setValue(null);
      this.downloadURL = [];
      this.contentType = [];
      this.persistedFileNames = [];
      this.persistedTotalSize = 0;
      this.saveFormState();
      return;
    }

    if (!this.isBackendConfigured || !this.angularFireStorage) {
      this.contactForm.get('fileUploader')?.setValue(null);
      Swal.fire(
        'File upload unavailable',
        'File uploads are temporarily unavailable. Please try again later or contact us directly.',
        'info'
      );
      return;
    }

    this.downloadURL = [];
    this.contentType = [];
    this.persistedFileNames = [];
    this.persistedTotalSize = 0;

    // Set the FileList as the control value so validator can access it
    this.contactForm.get('fileUploader')?.setValue(input.files);
    this.contactForm.get('fileUploader')?.updateValueAndValidity();

    // Upload files if valid
    if (this.contactForm.get('fileUploader')?.valid) {
      this.uploadFile(input.files);
    }
  }

  /**
   * @access private
   * @description Upload additional files to Firebase Storage and get URL to the files.
   * @param {FileList} files List of files to upload.
   * @returns {void}
   */
  private uploadFile(files: FileList): void {
    if (!this.angularFireStorage || !this.angularFirestore) {
      return;
    }
    const tasks: AngularFireUploadTask[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName =
        file.name +
        '_' +
        Date.now() +
        '_' +
        i; // Unique ID per file for multiple selections in same batch

      this.contentType.push(file.type);
      this.fileName = fileName;

      const fileRef: AngularFireStorageReference =
        this.angularFireStorage.ref(fileName);

      const task: AngularFireUploadTask = this.angularFireStorage.upload(
        fileName,
        file,
        { contentType: file.type }
      );
      tasks.push(task);

      (task.snapshotChanges() as any)
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe({
              next: (downloadURL: string) => {
                if (!this.isBackendConfigured || !this.angularFirestore) {
                  return;
                }
                this.angularFirestore
                  .collection(
                    getRuntimeEnv('FIRESTORE_COLLECTION_FILES')
                  )
                  .add({ downloadURL })
                  .catch((err) => {
                    console.error('Failed to store file reference:', err);
                  });
                this.downloadURL.push(downloadURL);
                this.saveFormState();
              },
              error: (err) => {
                console.error('Failed to get download URL:', err);
                Swal.fire(
                  'Upload error.',
                  'A file was uploaded but the download link could not be retrieved. Please try again.',
                  'error'
                );
              },
            });
          }),
          catchError(() => {
            this.isUploading = false;
            Swal.fire(
              'Upload failed.',
              'Could not upload one or more files. Please check your connection and try again.',
              'error'
            );
            return EMPTY;
          })
        )
        .subscribe();
    }

    // Track combined upload progress across all files
    if (tasks.length > 0) {
      this.isUploading = true;
      this.uploadProgress = 0;

      combineLatest(
        tasks.map((t) =>
          (t.percentageChanges() as any).pipe(
            startWith(0),
            map((p: number | undefined) => p ?? 0)
          )
        )
      )
        .pipe(
          map((progresses) =>
            Math.round(
              progresses.reduce((a, b) => a + b, 0) / progresses.length
            )
          ),
          catchError(() => {
            this.isUploading = false;
            return EMPTY;
          }),
          finalize(() => {
            this.isUploading = false;
            this.uploadProgress = 100;
          })
        )
        .subscribe((p) => (this.uploadProgress = p));
    }
  }
}
