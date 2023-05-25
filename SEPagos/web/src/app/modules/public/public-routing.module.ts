import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-clave', component: RestorePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
