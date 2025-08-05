import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from "@angular/core";
// @ts-ignore
import * as THREE from 'three';

/**
 * @component NotFoundComponent
 * @description Create the component.
 * @implements AfterViewInit
 */
@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
  standalone: true,
  imports: []
})
export class NotFoundComponent implements AfterViewInit {
  @ViewChild("renderIcosahedron", { static: false })
  private renderIcosahedron!: ElementRef<HTMLElement>; // Get reference of span element from HTML element to render Three.js. Non-null assertion operator is required to let know the compiler that this value is not empty and exists.

  private aspect: number = 1; // Region of space in the modeled world that may appear on the screen (camera frustum) aspect ratio, usually the canvas width / canvas height.
  private far: number = 20000; // Region of space in the modeled world that may appear on the screen (camera frustum) far plane.
  private frustum: number = 90; // Region of space in the modeled world that may appear on the screen (camera frustum) vertical point of view, from bottom to top of view, in degrees.
  private near: number = 0.01; // Region of space in the modeled world that may appear on the screen (camera frustum) near plane.

  // Create the camera.
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    this.frustum,
    this.aspect,
    this.near,
    this.far
  );

  // Create renderer to display scene.
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    alpha: true, // Transparent background.
    antialias: true, // Smooth edges.
  });
  private scene: THREE.Scene = new THREE.Scene(); // Create the scene.

  /**
   * @constructor
   * @description Create a new instance of this component.
   * @param {Renderer2} renderer2 Abstraction class object to manipulate elements without accessing DOM directly.
   */
  constructor(private renderer2: Renderer2) {}

  /**
   * @access public
   * @callback ngAfterViewInit
   * @description Invoked immediately after Angular has completed initialization of a component's view.
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    const icosphereGeometry = this.createScene(this.renderer); // Return the icosahedron geometry object from after creating scene.

    // Append object to be rendered to the DOM, thus append this using Renderer2.
    this.renderer2.appendChild(
      this.renderIcosahedron.nativeElement, // Specify where on DOM render an element.
      this.renderer.domElement // Manipulate DOM using Renderer2, thus avoid manipulating it directly.
    );
    this.renderScene(icosphereGeometry, this.renderer); // Render the scene.
  }

  /**
   * @access private
   * @description Create scene of this animation.
   * @function createScene
   * @param {THREE.WebGLRenderer} renderer Renderer object to display scenes using WebGL.
   * @returns {THREE.Mesh} mesh
   */
  private createScene(renderer: THREE.WebGLRenderer): THREE.Mesh {
    this.scene.add(this.camera); // Add camera to the scene.
    renderer.setSize(450, 450); // Set up size of the scene.
    this.camera.position.set(1, -1, 100); // Set up position of the camera.

    // Create material object with properties for surfaces with highlights.
    const meshMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#061371"), // Color of the material.
      emissive: new THREE.Color("#3f51b5"), // Color of emissive light of the material.
      wireframe: true, // Render geometry as wireframe.
    });

    const light: THREE.HemisphereLight = new THREE.HemisphereLight(0xb3e5fc, 0xb2dfdb, 1); // Create light source positioned above the scene with fading from sky color (first parameters) to ground color (second parameter).
    light.position.set(-100, 500, -300); // Set up position of the light.
    this.scene.add(light); // Add light to the scene.

    // Create icosahedron geometry.
    const icosahedronGeometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry(
      40,
      16
    );
    const mesh: THREE.Mesh = new THREE.Mesh(icosahedronGeometry, meshMaterial); // Create triangular polygon mesh based objects.

    this.scene.add(mesh); // Add mesh geometry objects to the scene.

    return mesh;
  }

  /**
   * @access private
   * @description Render mesh objects geometry in the animation.
   * @function renderScene
   * @param  {THREE.Mesh} mesh Triangular polygon mesh based objects.
   * @param  {THREE.WebGLRenderer} renderer Renderer object to display scenes using WebGL.
   * @returns {void}
   */
  private renderScene(mesh: THREE.Mesh, renderer: THREE.WebGLRenderer): void {
    // Create animation.
    requestAnimationFrame(() => {
      this.renderScene(mesh, renderer);
    });

    renderer.render(this.scene, this.camera); // Render the animation.
    this.updateScene(mesh); // Rotate the mesh geometry object.
  }

  /**
   * @access private
   * @description Update rotation of the mesh objects geometry in the animation.
   * @function updateScene
   * @param {THREE.Mesh} mesh Triangular polygon mesh based objects.
   * @returns {void}
   */
  private updateScene(mesh: THREE.Mesh): void {
    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.1;
  }
}
