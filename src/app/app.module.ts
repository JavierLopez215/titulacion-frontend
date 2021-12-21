import { UtillitiesService } from './services/utillities.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgModule, PipeTransform } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

// libreria de toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { CommunityComponent } from './pages/community/community.component';
import { FilesComponent } from './pages/files/files.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

import { PipeFiles } from './pipes/pipe-transform';


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
    PipeFiles
    
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
    })
  ],
  providers: [
    //JWT
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    //Interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    UtillitiesService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
