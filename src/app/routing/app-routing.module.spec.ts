import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ROUTER_CONFIGURATION } from "@angular/router";
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

describe("RoutingModule scrollPositionRestoration", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoutingModule],
    });
  });

  it("scrolls to the top on navigation", () => {
    const config = TestBed.inject(ROUTER_CONFIGURATION);
    expect(config.scrollPositionRestoration).toBe("top");
  });
});
