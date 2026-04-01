import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RoutingModule } from "./app-routing.module";
import { RouterTestingModule } from "@angular/router/testing";

describe("RoutingModule", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, RoutingModule],
    }).compileComponents();
  });

  it("should create routing module", () => {
    expect(RoutingModule).toBeDefined();
  });
});
