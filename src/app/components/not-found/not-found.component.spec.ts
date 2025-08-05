import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Renderer2 } from "@angular/core";
import * as THREE from "three";
import { NotFoundComponent } from "./not-found.component";

// Mock Three.js objects
jest.mock("three", () => ({
  Color: jest.fn().mockImplementation(() => ({
    setHex: jest.fn(),
  })),
  HemisphereLight: jest.fn().mockImplementation(() => ({
    position: {
      set: jest.fn(),
    },
  })),
  IcosahedronGeometry: jest.fn().mockImplementation(() => ({
    dispose: jest.fn(),
  })),
  Mesh: jest.fn().mockImplementation(() => ({
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    dispose: jest.fn(),
  })),
  MeshStandardMaterial: jest.fn().mockImplementation(() => ({
    dispose: jest.fn(),
  })),
  PerspectiveCamera: jest.fn().mockImplementation(() => ({
    position: {
      set: jest.fn(),
    },
    lookAt: jest.fn(),
  })),
  Scene: jest.fn().mockImplementation(() => ({
    add: jest.fn(),
    remove: jest.fn(),
    dispose: jest.fn(),
  })),
  WebGLRenderer: jest.fn().mockImplementation(() => ({
    domElement: document.createElement("canvas"),
    render: jest.fn(),
    setSize: jest.fn(),
    dispose: jest.fn(),
  })),
}));

describe("NotFoundComponent", () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let renderer2: Renderer2;
  let mockRenderer2: jest.Mocked<Renderer2>;

  beforeEach(async () => {
    // Create mock for Renderer2
    mockRenderer2 = {
      appendChild: jest.fn(),
      createElement: jest.fn(),
      setProperty: jest.fn(),
      removeChild: jest.fn(),
      insertBefore: jest.fn(),
      nextSibling: jest.fn(),
      parentNode: jest.fn(),
      setAttribute: jest.fn(),
      removeAttribute: jest.fn(),
      addClass: jest.fn(),
      removeClass: jest.fn(),
      setStyle: jest.fn(),
      removeStyle: jest.fn(),
      setValue: jest.fn(),
      listen: jest.fn(),
      destroy: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      providers: [
        { provide: Renderer2, useValue: mockRenderer2 },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    renderer2 = TestBed.inject(Renderer2);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
  });

  describe("ngAfterViewInit", () => {
    it("should initialize Three.js scene and renderer", () => {
      // Spy on private methods
      const createSceneSpy = jest.spyOn(component as any, "createScene");
      const renderSceneSpy = jest.spyOn(component as any, "renderScene");
      const appendChildSpy = jest.spyOn(mockRenderer2, "appendChild");

      // Mock ViewChild element
      component["renderIcosahedron"] = {
        nativeElement: document.createElement("div"),
      } as any;

      component.ngAfterViewInit();

      expect(createSceneSpy).toHaveBeenCalledWith(component["renderer"]);
      expect(appendChildSpy).toHaveBeenCalledWith(
        component["renderIcosahedron"].nativeElement,
        component["renderer"].domElement
      );
      expect(renderSceneSpy).toHaveBeenCalled();
    });
  });

  describe("createScene", () => {
    it("should create scene with proper configuration", () => {
      const mockRenderer = new THREE.WebGLRenderer();
      const mockScene = component["scene"];
      const mockCamera = component["camera"];

      // Spy on scene and camera methods
      const sceneAddSpy = jest.spyOn(mockScene, "add");
      const cameraPositionSpy = jest.spyOn(mockCamera.position, "set");
      const rendererSetSizeSpy = jest.spyOn(mockRenderer, "setSize");

      const result = component["createScene"](mockRenderer);

      expect(sceneAddSpy).toHaveBeenCalledWith(mockCamera);
      expect(rendererSetSizeSpy).toHaveBeenCalledWith(450, 450);
      expect(cameraPositionSpy).toHaveBeenCalledWith(1, -1, 100);
      expect(result).toBeDefined();
      expect(THREE.MeshStandardMaterial).toHaveBeenCalledWith({
        color: expect.any(Object),
        emissive: expect.any(Object),
        wireframe: true,
      });
      expect(THREE.HemisphereLight).toHaveBeenCalledWith(0xb3e5fc, 0xb2dfdb, 1);
      expect(THREE.IcosahedronGeometry).toHaveBeenCalledWith(40, 16);
    });

    it("should add light to scene with correct position", () => {
      const mockRenderer = new THREE.WebGLRenderer();
      const mockScene = component["scene"];
      const sceneAddSpy = jest.spyOn(mockScene, "add");

      component["createScene"](mockRenderer);

      expect(sceneAddSpy).toHaveBeenCalledWith(expect.any(Object)); // Light
      expect(THREE.HemisphereLight).toHaveBeenCalledWith(0xb3e5fc, 0xb2dfdb, 1);
    });
  });

  describe("renderScene", () => {
    it("should render scene and update mesh", () => {
      const mockMesh = new THREE.Mesh();
      const mockRenderer = new THREE.WebGLRenderer();
      const mockScene = component["scene"];
      const mockCamera = component["camera"];

      // Spy on renderer and updateScene
      const rendererRenderSpy = jest.spyOn(mockRenderer, "render");
      const updateSceneSpy = jest.spyOn(component as any, "updateScene");

      // Mock requestAnimationFrame
      const originalRequestAnimationFrame = window.requestAnimationFrame;
      const mockRequestAnimationFrame = jest.fn();
      window.requestAnimationFrame = mockRequestAnimationFrame;

      component["renderScene"](mockMesh, mockRenderer);

      expect(rendererRenderSpy).toHaveBeenCalledWith(mockScene, mockCamera);
      expect(updateSceneSpy).toHaveBeenCalledWith(mockMesh);
      expect(mockRequestAnimationFrame).toHaveBeenCalled();

      // Restore original
      window.requestAnimationFrame = originalRequestAnimationFrame;
    });
  });

  describe("updateScene", () => {
    it("should update mesh rotation", () => {
      const mockMesh = new THREE.Mesh();
      const initialRotationX = mockMesh.rotation.x;
      const initialRotationY = mockMesh.rotation.y;

      component["updateScene"](mockMesh);

      expect(mockMesh.rotation.x).toBe(initialRotationX + 0.1);
      expect(mockMesh.rotation.y).toBe(initialRotationY + 0.1);
    });

    it("should increment rotation values correctly", () => {
      const mockMesh = new THREE.Mesh();

      // Call updateScene multiple times
      component["updateScene"](mockMesh);
      component["updateScene"](mockMesh);
      component["updateScene"](mockMesh);

      expect(mockMesh.rotation.x).toBe(0.3);
      expect(mockMesh.rotation.y).toBe(0.3);
    });
  });

  describe("Three.js Integration", () => {
    it("should create PerspectiveCamera with correct parameters", () => {
      expect(THREE.PerspectiveCamera).toHaveBeenCalledWith(
        component["frustum"],
        component["aspect"],
        component["near"],
        component["far"]
      );
    });

    it("should create WebGLRenderer with correct options", () => {
      expect(THREE.WebGLRenderer).toHaveBeenCalledWith({
        alpha: true,
        antialias: true,
      });
    });

    it("should create Scene", () => {
      expect(THREE.Scene).toHaveBeenCalled();
    });
  });

  describe("Component Cleanup", () => {
    it("should handle component destruction gracefully", () => {
      // This test ensures the component can be destroyed without errors
      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  describe("Error Handling", () => {
    it("should handle missing ViewChild element gracefully", () => {
      // Test that component doesn't crash if ViewChild is not available
      component["renderIcosahedron"] = undefined as any;

      expect(() => {
        component.ngAfterViewInit();
      }).not.toThrow();
    });
  });
});
