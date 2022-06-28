import { GuestsGuard } from './guards/guests.guard';
import { RoleGuard } from './guards/role.guard';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PassRecoverComponent } from './auth/pass-recover/pass-recover.component';
import { AppComponent2 } from './pages/app/app.component'
import { HomeComponent } from './pages/home/home.component'
import { ActivitiesComponent } from "./pages/activities/activities.component";
import { PublicationComponent } from "./pages/publication/publication.component";
import { MeetingsComponent } from "./pages/meetings/meetings.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { CommunityComponent } from "./pages/community/community.component";
import { FilesComponent } from "./pages/files/files.component";
import { AboutComponent } from "./pages/about/about.component";
import { AuthGuard } from './guards/auth.guard';
import { MeetingDetailsComponent } from './pages/meeting-details/meeting-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate:[GuestsGuard] },
  { path: 'about', component: AboutComponent, canActivate:[GuestsGuard] },
  { path: 'login', component: LoginComponent, canActivate:[GuestsGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[GuestsGuard] },
  { path: 'recovery', component: PassRecoverComponent, canActivate:[GuestsGuard] },
  { path: 'activities', component: ActivitiesComponent, canActivate:[AuthGuard] },
  { path: 'activities/:id', component: PublicationComponent, canActivate:[AuthGuard] },
  { path: 'meetings', component: MeetingsComponent, canActivate:[AuthGuard] },
  { path: 'meetings/:id', component: MeetingDetailsComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'files', component: FilesComponent},
  { path: 'community', component: CommunityComponent, canActivate:[AuthGuard] },
  { path: 'community/:id', component: PublicationComponent, canActivate:[AuthGuard] },
  { path: 'app', component: AppComponent2, canActivate:[AuthGuard] }

  //path para administrador
  // { path: 'admin', component: AppComponent, canActivate:[RoleGuard], data:{roleId:1} }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
