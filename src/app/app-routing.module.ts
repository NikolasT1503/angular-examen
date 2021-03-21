import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Comp404Component } from './comp404/comp404.component';
import { MatexpandtableComponent } from './matexpandtable/matexpandtable.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gittable', 
    pathMatch: 'full'
  },
  {
    path: 'gittable',
    component: MatexpandtableComponent,   
  },
  {
    path: '404',
    component: Comp404Component,
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
