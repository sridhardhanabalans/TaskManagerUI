import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ViewTaskComponent } from './view-task.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UpdateTaskComponent } from 'src/app/ui/update-task/update-task.component';
import { AddTaskComponent } from 'src/app/ui/add-task/add-task.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from 'src/app/ui/page-not-found/page-not-found.component';
import { SharedService } from 'src/app/services/shared.service';
import { MockServiceService } from 'src/app/mock/mock-service.service';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let de: DebugElement;
  let el: HtmlElement;

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
        PageNotFoundComponent]
      ,
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: SharedService, useClass: MockServiceService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two tasks', () => {
    expect(component.tasks.length).toEqual(2)
  });

  it('EndTask should have called task with id 1', () => {
    let task = { taskId: 1, taskName: "Task 1", parentId: 2, parent: null, priority: 1, startDate: new Date(), endDate: new Date("2018-12-12") }
    spyOn(component, 'EndTask').and.callThrough();
    component.EndTask(task);
    expect(component.EndTask).toHaveBeenCalledWith(task);
  });

  it('DeleteTask should have been called with id 1', () => {
    spyOn(component, 'DeleteTask').and.callThrough();
    component.DeleteTask(1)
    expect(component.DeleteTask).toHaveBeenCalledWith(1);
  });

});
