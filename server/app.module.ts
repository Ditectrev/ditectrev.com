import { AngularUniversalModule } from '@nestjs/ng-universal';
import { AppServerModule } from '../src/app/app.server.module';
import { join } from 'path';
import { Module } from '@nestjs/common';

// Get working directory of client bundle.
// const BROWSER_DIR = join(
//   process.cwd(),
//   'functions',
//   'dist',
//   'apps',
//   'ditectrev-browser'
// ); // Use when testing locally without Firebase Cloud Functions solely on NestJS.
const BROWSER_DIR = join(process.cwd(), 'dist/ditectrev-browser'); // Use when deploying to & testing with Firebase Cloud Functions.

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      templatePath: join(BROWSER_DIR, 'index2.html'), //! That's needed, otherwise there are problems with rendering Firebase on root and NestJS returns ERROR "Failed to lookup view “index” in views directory".
      viewsPath: BROWSER_DIR,
    }),
  ],
})
export class ApplicationModule {}
