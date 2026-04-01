import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared.module';
import * as d3 from 'd3';
import {
  ChartConfiguration,
  ChartType,
} from 'chart.js';
import {
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  TorusKnotGeometry,
  WebGLRenderer,
} from 'three';
import { GeoJsonProperties } from 'geojson';
import { GeoPath, GeoPermissibleObjects, GeoProjection } from 'd3';

/**
 * @component PrivacyAndSecurityComponent
 * @description Create the component.
 * @implements AfterViewInit
 */
@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  imports: [SharedModule, RouterLink, NgChartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements AfterViewInit {
  // Cyber Security animation target element.
  @ViewChild('renderTorusKnot', { static: false })
  private renderTorusKnot!: ElementRef<HTMLElement>; // Get reference of span element from HTML element to render Three.js. Non-null assertion operator is required to let know the compiler that this value is not empty and exists.

  // Software Development animation target element.
  @ViewChild('renderGeoProjection', { static: false })
  private renderGeoProjection!: ElementRef<HTMLCanvasElement>; // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.

  // Cyber Security animation variables.
  private aspect = 1; // Region of space in the modeled world that may appear on the screen (camera frustum) aspect ratio, usually the canvas width / canvas height.
  private readonly far = 20000; // Region of space in the modeled world that may appear on the screen (camera frustum) far plane.
  private readonly frustum = 90; // Region of space in the modeled world that may appear on the screen (camera frustum) vertical point of view, from bottom to top of view, in degrees.
  private readonly near = 0.01; // Region of space in the modeled world that may appear on the screen (camera frustum) near plane.
  private readonly torusHeight = 450;

  // Software Development animation variables.
  private context: CanvasRenderingContext2D | null | undefined;
  private geoGenerator!: GeoPath<any, GeoPermissibleObjects>; // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.
  private geoJSON!: GeoJsonProperties | GeoPermissibleObjects | any; // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.
  private height = 450; // Height of Software Development animation.
  private projection!: GeoProjection; // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.
  private size: number | undefined; // Size of Software Development animation.
  private width = 0; // Width of Software Development animation.

  // Create the camera.
  private camera: PerspectiveCamera = new PerspectiveCamera(
    this.frustum,
    this.aspect,
    this.near,
    this.far,
  );

  // Create renderer to display scene.
  private renderer3d: WebGLRenderer = new WebGLRenderer({
    alpha: true, // Transparent background.
    antialias: true, // Smooth edges.
  });
  private scene: Scene = new Scene(); // Create the scene.

  private readonly renderer2 = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  // Digital Strategy animation variables.
  public readonly lineChartData: ChartConfiguration['data'] = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        backgroundColor: 'rgba(63, 81, 181, .3)',
        borderColor: '#3f51b5',
        borderWidth: 5,
        data: [0, 33, 34, 66, 67, 100],
        fill: 'origin',
        tension: 0.4,
      },
    ],
  };
  public readonly lineChartOptions: ChartConfiguration['options'] = {
    animation: {
      duration: 13000,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    layout: {
      padding: 30,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  public readonly lineChartType: ChartType = 'line';

  /**
   * @access public
   * @callback ngAfterViewInit
   * @description Invoked immediately after Angular has completed initialization of a component's view.
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    // Check if the platform is browser.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const torusHost = this.renderTorusKnot.nativeElement;
    const torusWidth =
      torusHost.clientWidth ||
      Math.min(window.innerWidth * 0.4, 320);
    this.aspect = torusWidth / this.torusHeight;
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();

    this.renderer3d.setSize(torusWidth, this.torusHeight);

    const group = this.createScene(this.renderer3d, torusWidth); // Return the group geometry object from after creating scene.

    // Append object to be rendered to the DOM, thus append this using Renderer2.
    this.renderer2.appendChild(
      torusHost, // Specify where on DOM render an element.
      this.renderer3d.domElement, // Manipulate DOM using Renderer2, thus avoid manipulating it directly.
    );

    this.renderScene(group, this.renderer3d); // Render the scene.

    const projectionCanvas = this.renderGeoProjection.nativeElement;
    this.context = projectionCanvas.getContext('2d');

    const fallbackWidth = Math.min(window.innerWidth * 0.4, 280);
    const fallbackHeight = Math.min(window.innerHeight * 0.25, 150);
    this.width = projectionCanvas.clientWidth || fallbackWidth;
    this.height = projectionCanvas.clientHeight || fallbackHeight;
    this.size = d3.min([this.width, this.height]) ?? this.height;

    // Create orthographic projection, scale and center it.
    this.projection = d3
      .geoOrthographic()
      .scale(0.5 * this.size)
      .translate([0.5 * this.width, 0.5 * this.height]);

    // Create new geographic path generator on the given context and projection.
    this.geoGenerator = d3
      .geoPath()
      .context(this.context!)
      .projection(this.projection);

    // GeoJSON settings.
    this.geoJSON = {
      type: 'Feature', // Spatially bounded thing.
      geometry: {
        coordinates: [[0, 0]], // Starting coordinates.
        type: 'LineString', // An array of positions forming a continuous line
      },
    };

    // Set up height and height
    d3.select(projectionCanvas)
      .attr('height', `${this.height}px`)
      .attr('width', `${this.width}px`);

    if (this.context) {
      this.context.lineWidth = 1; // Set line width.
      this.context.strokeStyle = 'rgba(63, 81, 181, .3)'; // This is in hex #3f51b5, but alpha channel is required therefore it was transformed to RGBA.
    }

    this.renderProjection(); // Render the projection.
  }

  /**
   * @access private
   * @description Create scene of this animation.
   * @function createScene
   * @param {WebGLRenderer} renderer Renderer object to display scenes using WebGL.
   * @param {number} width Width of the scene.
   * @returns {Group} group
   */
  private createScene(renderer: WebGLRenderer, width: number): Group {
    this.scene.add(this.camera); // Add camera to the scene.
    renderer.setSize(width, this.torusHeight); // Set up size of the scene.
    this.camera.position.set(1, -1, 30); // Set up position of the camera.

    // Create material object with properties for surfaces with highlights.
    const lineMaterial = new LineBasicMaterial({
      opacity: 0.3, // Set opacity of the material.
      transparent: true, // Set transparency of the material.
    });

    // Create material object with properties for surfaces with highlights.
    const meshMaterial = new MeshPhongMaterial({
      color: 0x3f51b5, // Set color of the material.
      emissive: 0x030040, // Set emissive color of the material.
      flatShading: true, // Set flat shading of the material.
    });

    // Create the torus knot geometry.
    const p: number = 1;
    const q: number = 20;
    const radius: number = 6;
    const radialSegments: number = 20;
    const tabularSegments: number = 40;
    const tube: number = 10;
    const torusKnotGeometry: TorusKnotGeometry = new TorusKnotGeometry(
      radius,
      tube,
      tabularSegments,
      radialSegments,
      p,
      q
    );

    const group = new Group(); // Create group to enable objects grouping.

    // Create series of lines drawn between pairs of vertices.
    const lineSegments = new LineSegments(
      torusKnotGeometry,
      lineMaterial,
    );
    const mesh = new Mesh(torusKnotGeometry, meshMaterial); // Create triangular polygon mesh based objects.
    const lights: PointLight[] = []; // Create empty array of PointLight's.

    // Add objects to the group.
    group.add(lineSegments);
    group.add(mesh);

    // Create lights which are emitted from a single point in all directions (PointLight).
    lights[0] = new PointLight(0xffffff, 1, 0);
    lights[1] = new PointLight(0xffffff, 1, 0);
    lights[2] = new PointLight(0xffffff, 1, 0);
    lights[3] = new PointLight(0xffffff, 1, 0);

    // Set up position of the light.
    lights[0].position.set(10, 10, 10);
    lights[1].position.set(-10, -10, 10);
    lights[2].position.set(10, 10, -10);
    lights[3].position.set(-10, -10, -10);

    lights.forEach((light) => this.scene.add(light)); // Add lights to the scene.
    this.scene.add(group); // Add group objects geometry to the scene.

    return group;
  }

  /**
   * @access private
   * @description Render group objects geometry in the animation.
   * @function renderScene
   * @param  {Group} group Group of geometry objects.
   * @param  {WebGLRenderer} renderer Renderer object to display scenes using WebGL.
   * @returns {void}
   */
  private renderScene(group: Group, renderer: WebGLRenderer): void {
    // Create animation.
    requestAnimationFrame(() => {
      this.renderScene(group, renderer);
    });

    renderer.render(this.scene, this.camera); // Render the animation.
    this.updateScene(group); // Rotate the mesh geometry object.
  }

  /**
   * @access private
   * @description Update rotation of the mesh objects geometry in the animation.
   * @function updateScene
   * @param {Group} group Group of geometry objects.
   * @returns {void}
   */
  private updateScene(group: Group): void {
    group.rotation.x += 0.005;
    group.rotation.y += 0.005;
  }

  /**
   * @access private
   * @description Generate random latitude.
   * @function randomLongitude
   * @returns {number} latitude
   */
  private randomLatitude(): number {
    return -90 + Math.random() * 180;
  }

  /**
   * @access private
   * @description Generate random longitude.
   * @function randomLongitude
   * @returns {number} longitude
   */
  private randomLongitude(): number {
    return -180 + Math.random() * 360;
  }

  /**
   * @access private
   * @description Add points to the animation based on GeoJSON coordinates.
   * @function addPoint
   * @returns {void}
   */
  private addPoint(): void {
    this.geoJSON.geometry.coordinates.push([
      this.randomLatitude(),
      this.randomLongitude(),
    ]);
  }

  /**
   * @access private
   * @description Render projection animation.
   * @function renderProjection
   * @returns {void}
   */
  private renderProjection(): void {
    if (!this.context || !this.geoGenerator) {
      return; // If the context or geoGenerator is not found, return.
    }

    // Add points to the animation unless 10k GeoJSON coordinates has been created.
    if (this.geoJSON.geometry.coordinates.length < 10000) {
      this.addPoint();
    }

    this.context.clearRect(0, 0, this.width, this.height); // Erase pixels in rectangular area.
    this.context.beginPath(); // Start a new path.
    this.geoGenerator(this.geoJSON); // Render the given GeoJSON.
    this.context.stroke(); // Draw a path.

    // Create animation.
    requestAnimationFrame(() => {
      this.renderProjection();
    });

    this.updateProjection(); // Rotate the projection.
  }

  /**
   * @access private
   * @description Update the projection.
   * @function updateProjection
   * @returns {void}
   */
  private updateProjection(): void {
    if (!this.projection) {
      return; // If the projection is not found, return.
    }

    // Make the projection's rotation shaking.
    this.projection.rotate([
      Math.random(),
      Math.random(),
      Math.random(),
    ]);
  }
}
