import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
  ],
})
export class RoutingModule {}
