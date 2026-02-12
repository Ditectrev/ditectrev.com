import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Renderer2 } from "@angular/core";
import { NotFoundComponent } from "./not-found.component";

describe("NotFoundComponent", () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let mockRenderer2: jasmine.SpyObj<Renderer2>;

  beforeEach(async () => {
    mockRenderer2 = jasmine.createSpyObj("Renderer2", [
      "appendChild", "createElement", "setProperty", "removeChild", "insertBefore",
      "nextSibling", "parentNode", "setAttribute", "removeAttribute", "addClass",
      "removeClass", "setStyle", "removeStyle", "setValue", "listen", "destroy",
    ]);

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        { provide: Renderer2, useValue: mockRenderer2 },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  });

  describe("Component Creation", () => {
    it("should create not found component", () => {
      expect(component).toBeTruthy();
    });

    it("should have correct component properties", () => {
      expect(component["aspect"]).toBe(1);
      expect(component["far"]).toBe(20000);
      expect(component["frustum"]).toBe(90);
      expect(component["near"]).toBe(0.01);
    });

    it("should have camera, scene and renderer from THREE", () => {
      expect(component["camera"]).toBeDefined();
      expect(component["camera"].position).toBeDefined();
      expect(component["scene"]).toBeDefined();
      expect(component["scene"].add).toBeDefined();
      expect(component["renderer"]).toBeDefined();
      expect(component["renderer"].setSize).toBeDefined();
      expect(component["renderer"].domElement).toBeDefined();
    });
  });

  describe("ngAfterViewInit", () => {
    it("should initialize Three.js scene and renderer", () => {
      const createSceneSpy = spyOn(component as any, "createScene").and.callThrough();
      const renderSceneSpy = spyOn(component as any, "renderScene");
      component["renderIcosahedron"] = { nativeElement: document.createElement("div") } as any;

      component.ngAfterViewInit();

      expect(createSceneSpy).toHaveBeenCalledWith(component["renderer"]);
      expect(renderSceneSpy).toHaveBeenCalled();
      if (mockRenderer2.appendChild.calls.count() > 0) {
        const appendArgs = mockRenderer2.appendChild.calls.mostRecent().args;
        expect(appendArgs.length).toBe(2);
        expect(appendArgs[1]?.tagName).toBe("CANVAS");
      }
    });
  });

  describe("createScene", () => {
    it("should create scene with proper configuration", () => {
      const renderer = component["renderer"];
      const scene = component["scene"];
      const camera = component["camera"];
      const sceneAddSpy = spyOn(scene, "add");
      const setSizeSpy = spyOn(renderer, "setSize");
      const cameraPositionSpy = spyOn(camera.position, "set");

      const result = component["createScene"](renderer);

      expect(sceneAddSpy).toHaveBeenCalledWith(camera);
      expect(setSizeSpy).toHaveBeenCalledWith(450, 450);
      expect(cameraPositionSpy).toHaveBeenCalledWith(1, -1, 100);
      expect(result).toBeDefined();
      expect(result.rotation).toBeDefined();
    });

    it("should add light to scene", () => {
      const renderer = component["renderer"];
      const scene = component["scene"];
      const sceneAddSpy = spyOn(scene, "add");

      component["createScene"](renderer);

      expect(sceneAddSpy.calls.count()).toBeGreaterThan(1);
    });
  });

  describe("renderScene", () => {
    it("should render scene and update mesh", () => {
      const mockMesh = component["createScene"](component["renderer"]);
      const renderer = component["renderer"];
      const scene = component["scene"];
      const camera = component["camera"];
      const renderSpy = spyOn(renderer, "render");
      const updateSceneSpy = spyOn(component as any, "updateScene");
      const originalRAF = window.requestAnimationFrame;
      const mockRAF = jasmine.createSpy("requestAnimationFrame").and.returnValue(0);
      window.requestAnimationFrame = mockRAF as any;

      component["renderScene"](mockMesh, renderer);

      expect(renderSpy).toHaveBeenCalledWith(scene, camera);
      expect(updateSceneSpy).toHaveBeenCalledWith(mockMesh);
      expect(mockRAF).toHaveBeenCalled();
      window.requestAnimationFrame = originalRAF;
    });
  });

  describe("updateScene", () => {
    it("should update mesh rotation", () => {
      const mockMesh = component["createScene"](component["renderer"]);
      const initialX = mockMesh.rotation.x;
      const initialY = mockMesh.rotation.y;

      component["updateScene"](mockMesh);

      expect(mockMesh.rotation.x).toBe(initialX + 0.1);
      expect(mockMesh.rotation.y).toBe(initialY + 0.1);
    });

    it("should increment rotation values correctly", () => {
      const mockMesh = component["createScene"](component["renderer"]);
      component["updateScene"](mockMesh);
      component["updateScene"](mockMesh);
      component["updateScene"](mockMesh);
      expect(mockMesh.rotation.x).toBeCloseTo(0.3, 10);
      expect(mockMesh.rotation.y).toBeCloseTo(0.3, 10);
    });
  });

  describe("Component Cleanup", () => {
    it("should handle component destruction gracefully", () => {
      expect(() => fixture.destroy()).not.toThrow();
    });
  });

  describe("Error Handling", () => {
    it("should throw when ViewChild element is missing", () => {
      component["renderIcosahedron"] = undefined as any;
      expect(() => component.ngAfterViewInit()).toThrow();
    });
  });
});
