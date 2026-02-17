import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";

@NgModule({
  bootstrap: [AppComponent],
  imports: [AppModule, ServerModule],
})
export class AppServerModule {}
