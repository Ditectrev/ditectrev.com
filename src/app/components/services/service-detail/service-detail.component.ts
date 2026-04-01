import { Component, Input } from '@angular/core';
import { ServiceItem } from '@interfaces';
import { SharedModule } from '../../shared.module';

/**
 * @component ServiceDetailComponent
 * @description Shared component for displaying service detail pages (Cyber Security, Digital Strategy, Software Development).
 */
@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent {
  @Input() public title = '';
  @Input() public serviceItems: ServiceItem[] = [];
  @Input() public serviceName = '';
}

