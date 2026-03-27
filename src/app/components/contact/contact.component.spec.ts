import '@angular/compiler';
import 'hammerjs';
import { FormBuilder } from '@angular/forms';
import { ChangeDetectorRef, Injector } from '@angular/core';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { ContactComponent } from './contact.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

const CONTACT_FORM_STORAGE_KEY = 'contactFormState';

function createMockFirestore() {
  const add = jasmine.createSpy('add').and.returnValue(Promise.resolve({ id: 'test-id' }));
  return {
    collection: jasmine.createSpy('collection').and.returnValue({ add }),
    add,
  };
}

function createMockFireStorage() {
  const getDownloadURL = jasmine.createSpy('getDownloadURL').and.returnValue(of('https://example.com/file'));
  const ref = jasmine.createSpy('ref').and.returnValue({ getDownloadURL });
  const snapshotChanges = jasmine.createSpy('snapshotChanges').and.returnValue(of({ state: 'success' }));
  const percentageChanges = jasmine.createSpy('percentageChanges').and.returnValue(of(100));
  const upload = jasmine.createSpy('upload').and.returnValue({
    snapshotChanges: () => snapshotChanges(),
    percentageChanges: () => percentageChanges(),
  });
  return {
    ref,
    upload,
    getDownloadURL,
    snapshotChanges,
    percentageChanges,
  };
}

describe('ContactComponent', () => {
  let component: ContactComponent;
  let mockFirestore: ReturnType<typeof createMockFirestore>;
  let mockFireStorage: ReturnType<typeof createMockFireStorage>;
  let mockCdr: { detectChanges: jasmine.Spy };
  let localStorageStore: Record<string, string>;

  beforeAll(() => {
    (window as any).process = (window as any).process || { env: {} };
    (window as any).process.env = {
      ...(window as any).process.env,
      FIREBASE_API_KEY: 'test-api-key',
      FIREBASE_PROJECT_ID: 'test-project-id',
      FIRESTORE_COLLECTION_MESSAGES: 'messages',
      FIRESTORE_COLLECTION_FILES: 'files',
    };
    Object.defineProperty(window, 'matchMedia', {
      value: jasmine.createSpy('matchMedia').and.returnValue({
        matches: true,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
      writable: true,
    });
    Object.defineProperty(window, 'intlTelInput', {
      value: jasmine.createSpy('intlTelInput').and.returnValue({}),
      writable: true,
    });
  });

  beforeEach(() => {
    mockFirestore = createMockFirestore();
    mockFireStorage = createMockFireStorage();
    mockCdr = { detectChanges: jasmine.createSpy('detectChanges') };
    localStorageStore = {};
    spyOn(Storage.prototype, 'getItem').and.callFake((key: string) => localStorageStore[key] ?? null);
    spyOn(Storage.prototype, 'setItem').and.callFake((key: string, value: string) => {
      localStorageStore[key] = value;
    });
    spyOn(Storage.prototype, 'removeItem').and.callFake((key: string) => {
      delete localStorageStore[key];
    });

    const proc = typeof process !== 'undefined' ? process : (window as any).process;
    if (proc && proc.env) {
      proc.env.FIREBASE_API_KEY = 'test-api-key';
      proc.env.FIREBASE_PROJECT_ID = 'test-project-id';
      proc.env.FIRESTORE_COLLECTION_MESSAGES = 'messages';
      proc.env.FIRESTORE_COLLECTION_FILES = 'files';
    }

    const injectorMock = {
      get: (token: unknown) => {
        if (token === AngularFirestore) return mockFirestore as unknown as AngularFirestore;
        if (token === AngularFireStorage) return mockFireStorage as unknown as AngularFireStorage;
        throw new Error('Unknown token');
      },
    } as unknown as Injector;
    const formBuilder = new FormBuilder();
    component = new ContactComponent(
      injectorMock,
      formBuilder,
      mockCdr as unknown as ChangeDetectorRef
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.contactForm).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should load form state from localStorage on next tick', (done) => {
      const savedState = JSON.stringify({
        formControlName: 'Jane',
        formControlEmail: 'jane@example.com',
        formControlPhone: '+48123456789',
        formControlDescription: 'Hello',
      });
      localStorageStore[CONTACT_FORM_STORAGE_KEY] = savedState;

      component.ngOnInit();

      setTimeout(() => {
        expect(component.contactForm.get('formControlName')?.value).toBe('Jane');
        expect(component.contactForm.get('formControlEmail')?.value).toBe('jane@example.com');
        expect(component.contactForm.get('formControlDescription')?.value).toBe('Hello');
        expect(mockCdr.detectChanges).toHaveBeenCalled();
        done();
      }, 10);
    });

    it('should do nothing when localStorage has no saved state', (done) => {
      component.ngOnInit();
      setTimeout(() => {
        expect(component.contactForm.get('formControlName')?.value).toBe('');
        done();
      }, 10);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscriptions on destroy', () => {
      const formSub = (component as any).formPersistenceSub;
      const phoneSub = (component as any).phoneValidationSub;
      expect(formSub).toBeDefined();
      expect(phoneSub).toBeDefined();

      spyOn(formSub, 'unsubscribe');
      spyOn(phoneSub, 'unsubscribe');

      component.ngOnDestroy();

      expect(formSub.unsubscribe).toHaveBeenCalled();
      expect(phoneSub.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('filterAvailableDays', () => {
    it('should return false for Saturday', () => {
      const sat = new Date(2025, 0, 4); // Saturday
      expect(component.filterAvailableDays(sat)).toBe(false);
    });

    it('should return false for Sunday', () => {
      const sun = new Date(2025, 0, 5); // Sunday
      expect(component.filterAvailableDays(sun)).toBe(false);
    });

    it('should return true for weekdays', () => {
      const mon = new Date(2025, 0, 6); // Monday
      const wed = new Date(2025, 0, 8); // Wednesday
      expect(component.filterAvailableDays(mon)).toBe(true);
      expect(component.filterAvailableDays(wed)).toBe(true);
    });
  });

  describe('handleTerms', () => {
    it('should toggle acceptedTerms from false to true', () => {
      component.acceptedTerms = false;
      component.handleTerms();
      expect(component.acceptedTerms).toBe(true);
    });

    it('should toggle acceptedTerms from true to false', () => {
      component.acceptedTerms = true;
      component.handleTerms();
      expect(component.acceptedTerms).toBe(false);
    });
  });

  describe('hasError', () => {
    it('should set phone errors when event is falsy and phone has a value', () => {
      component.contactForm.get('formControlPhone')?.setValue('+48123456789');
      component.hasError(null);
      expect(component.contactForm.get('formControlPhone')?.errors).toEqual(['invalid_cell_phone', true]);
    });

    it('should not set errors when event is truthy', () => {
      component.contactForm.get('formControlPhone')?.setValue('+48123456789');
      component.hasError({});
      expect(component.contactForm.get('formControlPhone')?.errors).toBeNull();
    });

    it('should not set errors when phone is empty', () => {
      component.contactForm.get('formControlPhone')?.setValue('');
      component.hasError(null);
      const errors = component.contactForm.get('formControlPhone')?.errors;
      expect(Array.isArray(errors) ? errors[0] : (errors as any)?.invalid_cell_phone).not.toBe('invalid_cell_phone');
    });
  });

  describe('getSelectedFilesCount', () => {
    it('should return 0 when no files and no persisted', () => {
      expect(component.getSelectedFilesCount()).toBe(0);
    });

    it('should return persisted file names count when no form files', () => {
      component.persistedFileNames = ['a.pdf', 'b.pdf'];
      expect(component.getSelectedFilesCount()).toBe(2);
    });

    it('should return downloadURL length when no form files but has downloadURL', () => {
      component.downloadURL = ['url1', 'url2', 'url3'];
      expect(component.getSelectedFilesCount()).toBe(3);
    });

    it('should return FileList length when form has files', () => {
      const file = new File(['x'], 'f.txt', { type: 'text/plain' });
      const list = { 0: file, length: 1, item: () => file };
      component.contactForm.get('fileUploader')?.setValue(list);
      expect(component.getSelectedFilesCount()).toBe(1);
    });
  });

  describe('getSelectedFilesTotalSize', () => {
    it('should return 0 when no files', () => {
      expect(component.getSelectedFilesTotalSize()).toBe(0);
    });

    it('should return persistedTotalSize when no form files', () => {
      component.persistedTotalSize = 1024;
      expect(component.getSelectedFilesTotalSize()).toBe(1024);
    });

    it('should return sum of file sizes from FileList', () => {
      const f1 = new File(['a'], 'a.txt', { type: 'text/plain' });
      const f2 = new File(['bb'], 'b.txt', { type: 'text/plain' });
      Object.defineProperty(f1, 'size', { value: 100 });
      Object.defineProperty(f2, 'size', { value: 200 });
      const list = { 0: f1, 1: f2, length: 2, item: (i: number) => (i === 0 ? f1 : f2) };
      component.contactForm.get('fileUploader')?.setValue(list);
      expect(component.getSelectedFilesTotalSize()).toBe(300);
    });
  });

  describe('getSelectedFileNames', () => {
    it('should return empty array when no files', () => {
      expect(component.getSelectedFileNames()).toEqual([]);
    });

    it('should return persistedFileNames when no form files', () => {
      component.persistedFileNames = ['a.pdf', 'b.pdf'];
      expect(component.getSelectedFileNames()).toEqual(['a.pdf', 'b.pdf']);
    });

    it('should return file names from FileList', () => {
      const f1 = new File([], 'first.txt', { type: 'text/plain' });
      const f2 = new File([], 'second.txt', { type: 'text/plain' });
      const list = { 0: f1, 1: f2, length: 2, item: (i: number) => (i === 0 ? f1 : f2) };
      component.contactForm.get('fileUploader')?.setValue(list);
      expect(component.getSelectedFileNames()).toEqual(['first.txt', 'second.txt']);
    });
  });

  describe('onFileChange', () => {
    it('should clear file uploader and related state when no files selected', () => {
      component.downloadURL = ['url'];
      component.contentType = ['text/plain'];
      component.persistedFileNames = ['x.txt'];
      component.persistedTotalSize = 100;

      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', { value: null, writable: true });
      const event = { target: input } as unknown as Event;

      component.onFileChange(event);

      expect(component.contactForm.get('fileUploader')?.value).toBeNull();
      expect(component.downloadURL).toEqual([]);
      expect(component.contentType).toEqual([]);
      expect(component.persistedFileNames).toEqual([]);
      expect(component.persistedTotalSize).toBe(0);
    });

    it('should set FileList on control when files are selected', () => {
      const file = new File(['x'], 'test.txt', { type: 'text/plain' });
      const list = { 0: file, length: 1, item: () => file };
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', { value: list, writable: true });
      const event = { target: input } as unknown as Event;

      component.onFileChange(event);

      expect(component.contactForm.get('fileUploader')?.value).toBe(list);
    });
  });

  describe('onSubmit', () => {
    it('should call Firestore add with form data and show success', async () => {
      const form = {
        formControlName: 'John',
        formControlEmail: 'john@example.com',
        formControlPhone: '+48111222333',
        formControlDescription: 'Test message',
        formControlDeadline: null,
        formControlContactPreference: 'email',
        formControlService: 'Software Development',
        acceptedTerms: true,
        recaptchaCheck: 'token',
      };
      const formDirective = { resetForm: jasmine.createSpy('resetForm') } as any;

      component.contentType = ['text/plain'];
      component.downloadURL = ['https://example.com/f'];
      component.fileName = 'file.txt';
      component.contactForm.patchValue(form);

      component.onSubmit(form, formDirective);

      await Promise.resolve();

      expect(mockFirestore.collection).toHaveBeenCalledWith('messages');
      expect(mockFirestore.add).toHaveBeenCalledWith(
        jasmine.objectContaining({
          ...form,
          contentType: ['text/plain'],
          fileUploader: ['https://example.com/f'],
          fileName: 'file.txt',
        })
      );
      expect(component.contactForm.get('formControlName')?.value).toBeNull();
      expect(component.acceptedTerms).toBe(false);
      expect(component.downloadURL).toEqual([]);
      expect(component.contentType).toEqual([]);
      expect(component.persistedFileNames).toEqual([]);
      expect(localStorageStore[CONTACT_FORM_STORAGE_KEY]).toBeUndefined();
      expect(formDirective.resetForm).toHaveBeenCalled();
    });

    xit('should show error when Firestore add rejects', async () => {
      (mockFirestore.add as jasmine.Spy).and.returnValue(Promise.reject(new Error('Network error')));
      const form = {
        formControlName: 'John',
        formControlEmail: 'john@example.com',
        formControlPhone: '+48111222333',
        formControlDescription: 'Test message',
        formControlDeadline: null,
        formControlContactPreference: 'email',
        formControlService: '',
        acceptedTerms: true,
        recaptchaCheck: 'token',
      };
      const formDirective = { resetForm: jasmine.createSpy('resetForm') } as any;
      const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({} as any));

      component.onSubmit(form, formDirective);
      await new Promise((r) => setTimeout(r, 10));

      expect(mockFirestore.add).toHaveBeenCalled();
      expect(swalFireSpy).toHaveBeenCalledWith(
        'Error occurred.',
        'It was not possible to send the contact form. Please try again or contact us directly.',
        'error'
      );
    });
  });
});
