import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from '@components/common/logout/logout.component';
import { HomeComponent } from '@pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { LoginComponent } from './views/pages/login/login.component';

export const routes: Routes = [

  // No auth
  { path: "login", component: LoginComponent, canActivate: [GuestGuard] },

  // Con auth
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "logout", component: LogoutComponent },

  { path: "**", pathMatch: "full", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
