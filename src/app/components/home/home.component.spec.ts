import "hammerjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HomeComponent,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create home component", () => {
    expect(component).toBeTruthy();
  });

  it("should have hero component", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-hero")).not.toBeNull();
  });

  it("should have gallery component", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-gallery")).not.toBeNull();
  });

  it("should have testimonials component", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-testimonials")).not.toBeNull();
  });
});
