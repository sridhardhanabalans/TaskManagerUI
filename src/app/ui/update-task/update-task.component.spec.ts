import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { UpdateTaskComponent } from './update-task.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AddTaskComponent } from 'src/app/ui/add-task/add-task.component';
import { ViewTaskComponent } from 'src/app/ui/view-task/view-task.component';
import {APP_BASE_HREF} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from 'src/app/ui/page-not-found/page-not-found.component';

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: 
      [
        FormsModule, 
        BsDatepickerModule.forRoot(),
        AppRoutingModule,
        HttpClientModule
      ],
      declarations: [ 
        AddTaskComponent,
        UpdateTaskComponent,
        ViewTaskComponent,
        PageNotFoundComponent 
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two tasks', () => {
    spyOn(component, 'getAllTasks').and.callThrough();
    component.getAllTasks();
    expect(component.getAllTasks).toHaveBeenCalled();
  });

  it('UpdateTask should have been called with task with Id: 1', () => {
    let task = { taskId: 1, taskName: "Task 1", parentId: 2, parent: null, priority: 1, startDate: new Date(), endDate: new Date("2018-12-31") }
    spyOn(component, 'UpdateTask').and.callThrough();
    component.UpdateTask(task);
    expect(component.UpdateTask).toHaveBeenCalledWith(task);
  });

  it('getTask should have been called with id: 1', () => {
    spyOn(component, 'getTask').and.callThrough();
    component.getTask(1)
    expect(component.getTask).toHaveBeenCalledWith(1);
  });
  
});
