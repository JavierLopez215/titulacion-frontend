import { UtillitiesService } from './services/utillities.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgModule, PipeTransform } from '@angular/core';
import { BrowserModule, SafeHtml } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PassRecoverComponent } from './auth/pass-recover/pass-recover.component';
import { HomeComponent } from './pages/home/home.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AppComponent2 } from "./pages/app/app.component";
import { ActivitiesComponent } from './pages/activities/activities.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { ProfileComponent } from './pages/profile/profile.component';
// import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import {
  HighlightModule,
  HIGHLIGHT_OPTIONS,
  HighlightOptions,
} from 'ngx-highlightjs';

// libreria de toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { CommunityComponent } from './pages/community/community.component';
import { FilesComponent } from './pages/files/files.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

import { PipeFiles } from './pipes/pipe-transform';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeetingDetailsComponent } from './pages/meeting-details/meeting-details.component';
import { AboutComponent } from './pages/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PassRecoverComponent,
    HomeComponent,
    AppComponent2,
    ActivitiesComponent,
    PublicationComponent,
    MeetingsComponent,
    ProfileComponent,
    CommunityComponent,
    FilesComponent,
    PipeFiles,
    MeetingDetailsComponent,
    AboutComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxDocViewerModule,
    ToastrModule.forRoot({
      // timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    HighlightModule,
    NgbModule
  ],
  providers: [
    //JWT
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    //Interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    UtillitiesService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        // fullLibraryLoader: () => import('highlight.js'),

        coreLibraryLoader: () => import('highlight.js/lib/core'),
        //  lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
          csharp: () => import('highlight.js/lib/languages/csharp'),
          delphi: () => import('highlight.js/lib/languages/delphi'),
          fortran: () => import('highlight.js/lib/languages/fortran'),
          java: () => import('highlight.js/lib/languages/java'),
          js: () => import('highlight.js/lib/languages/javascript'),
          json: () => import('highlight.js/lib/languages/json'),
          kotlin: () => import('highlight.js/lib/languages/kotlin'),
          matlab: () => import('highlight.js/lib/languages/matlab'),
          perl: () => import('highlight.js/lib/languages/perl'),
          php: () => import('highlight.js/lib/languages/php'),
          // pgsql: () => import('highlight.js/lib/languages/pgsql'),
          python: () => import('highlight.js/lib/languages/python'),
          scss: () => import('highlight.js/lib/languages/scss'),
          html: () => import('highlight.js/lib/languages/apache'),
          http: () => import('highlight.js/lib/languages/http'),
        },
        //  themePath: 'node_modules/highlight.js/styles/github.css'
      }
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
