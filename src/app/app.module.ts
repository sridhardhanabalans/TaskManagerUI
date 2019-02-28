import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ViewTaskComponent } from './ui/view-task/view-task.component';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { UpdateTaskComponent } from './ui/update-task/update-task.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
