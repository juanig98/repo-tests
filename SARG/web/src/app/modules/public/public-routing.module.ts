import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from 'app/core/guards/guest.guard';
import { LoginComponent } from './login/login.component';
// Pages

const routes: Routes = [

  { path: 'login', canActivate: [GuestGuard], component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
