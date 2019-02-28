import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewTaskComponent } from './ui/view-task/view-task.component';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { UpdateTaskComponent } from './ui/update-task/update-task.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: 'add', component: AddTaskComponent },
  { path: 'update/:id', component: UpdateTaskComponent },
  { path: 'view', component: ViewTaskComponent },
  { path : '**', component: PageNotFoundComponent}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
