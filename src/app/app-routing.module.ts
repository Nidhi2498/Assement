import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';

const routes: Routes = [
  { path:'pagination', component:PaginationComponent},
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
