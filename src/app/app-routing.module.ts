import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'dob', loadChildren: () => import('./dobexample/dobexample.module').then(m => m.DobexampleModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
