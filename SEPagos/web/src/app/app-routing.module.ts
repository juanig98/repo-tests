import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', canActivateChild: [GuestGuard], loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule) },
  { path: '', canActivateChild: [AuthGuard], loadChildren: () => import('./modules/authenticated/authenticated.module').then(m => m.AuthenticatedModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
