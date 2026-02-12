import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct tel: link', () => {
    expect(component.getPhoneHref('123 456 789')).toBe('tel:123456789');
  });

  it('should return correct mailto: link', () => {
    expect(component.getEmailHref('test@example.com')).toBe('mailto:test@example.com');
  });

  it('should invalidate incorrect email', () => {
    component.formControlEmail.setValue('not-an-email');
    expect(component.formControlEmail.valid).toBe(false);
  });

  it('should validate correct email', () => {
    component.formControlEmail.setValue('test@example.com');
    expect(component.formControlEmail.valid).toBe(true);
  });

  // You can add more tests for onSubmit, but you may need to mock HttpClient and Swal.fire
});
