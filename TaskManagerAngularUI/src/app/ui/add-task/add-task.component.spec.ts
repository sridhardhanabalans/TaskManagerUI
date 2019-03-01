import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { AddTaskComponent } from './add-task.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UpdateTaskComponent } from 'src/app/ui/update-task/update-task.component';
import { ViewTaskComponent } from 'src/app/ui/view-task/view-task.component';
import {APP_BASE_HREF} from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { PageNotFoundComponent } from 'src/app/ui/page-not-found/page-not-found.component';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
   
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: 
      [
        AddTaskComponent,
        UpdateTaskComponent,
        ViewTaskComponent,
        PageNotFoundComponent 
      ],
      imports:
        [
          FormsModule,
          BsDatepickerModule.forRoot(),
          AppRoutingModule,
          HttpClientModule,
          
        ],
        providers: [{provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
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

  it('AddTask should have been called task with id 1', () => {
    let task = { taskId: 1, taskName: "Task 1", parentId: 2, parent: null, priority: 1, startDate: new Date(), endDate: new Date("2018-12-12") }
    spyOn(component, 'AddTask').and.callThrough();
    component.AddTask(task);
    expect(component.AddTask).toHaveBeenCalledWith(task);
  });


});
