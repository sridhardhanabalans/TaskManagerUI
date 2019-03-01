import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  filteredTasks: Task[];

  filterTaskName: string;
  filterParentName: string;
  filterPriorityFrom: number;
  filterPriorityTo: number;
  filterStartDate: Date;
  filterEndDate: Date;
  currentDate: Date;

  private _taskName: string;
  get taskName(): string {
    return this._taskName;
  }
  set taskName(value: string) {
    this._taskName = value;
    this.FilterTasks();
  }

  private _parentTaskName: string;
  get parentTaskName(): string {
    return this._parentTaskName;
  }
  set parentTaskName(value: string) {
    this._parentTaskName = value;
    this.FilterTasks();
  }

  private _priorityFrom: number;
  get priorityFrom(): number {
    return this._priorityFrom;
  }
  set priorityFrom(value: number) {
    this._priorityFrom = value;
    this.FilterTasks();
  }

  private _priorityTo: number;
  get priorityTo(): number {
    return this._priorityTo;
  }
  set priorityTo(value: number) {
    this._priorityTo = value;
    this.FilterTasks();
  }

  private _startDate: Date;
  get startDate(): Date {
    return this._startDate;
  }
  set startDate(value: Date) {
    this._startDate = value;
    this.FilterTasks();
  }

  private _endDate: Date;
  get endDate(): Date {
    return this._endDate;
  }
  set endDate(value: Date) {
    this._endDate = value;
    this.FilterTasks();
  }

  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private router: Router, private sharedService: SharedService) {
    this.bsConfig = Object.assign({},
      {
        containerClass: 'theme-default',
        minDate: new Date(2018, 0, 1),
        maxDate: new Date(2100, 11, 31)
      });
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);
    this.GetAllTasks();
  }

  GetAllTasks(): void {
    this.sharedService.GetAllTasks().subscribe(
      data => {
        this.tasks = data;
        this.SettingTaskButtonStatus(this.tasks);
      },
      (error) => { console.log(error); }
    );
  }

  FilterTasks() {
    this.filterTaskName = (this._taskName) ? this._taskName : "";
    this.filterParentName = (this._parentTaskName) ? this._parentTaskName : "";
    this.filterPriorityFrom = (this._priorityFrom) ? this._priorityFrom : 0;
    this.filterPriorityTo = (this._priorityTo) ? this._priorityTo : 30;
    this.filterStartDate = (this._startDate) ? this._startDate : new Date(2018, 0, 1);
    this.filterEndDate = (this._endDate) ? this._endDate : new Date(2100, 11, 31);

    this.filteredTasks = this.tasks.filter(m =>
      m.taskName.toLowerCase().indexOf(this.filterTaskName.toLowerCase()) !== -1
      && m.parent.taskName.toLowerCase().indexOf(this.filterParentName.toLocaleLowerCase()) !== -1
      && m.priority >= this.filterPriorityFrom
      && m.priority <= this.filterPriorityTo
      && m.startDate >= this.filterStartDate
      && m.endDate <= this.filterEndDate
    );
  }

  SettingTaskButtonStatus(finalList: Task[]) {
    finalList.forEach(function (value) {
      value.startDate = new Date(value.startDate);
      value.endDate = new Date(value.endDate);
    });
    this.filteredTasks = finalList;
  }

  RouteToUpdateTask(id: number) {
    this.router.navigate(['/update', id])
  }

  EndTask(task: Task) {
    task.endDate = new Date();
    this.sharedService.UpdateTask(task).subscribe(data => {
      this.Refresh();
    },
    (error) => { console.log(error); }
    )
  }

  DeleteTask(id: number) {
    if (confirm("Note: If you delete a task which is marked as the parent task in any other tasks, the latter's parent tasks will be updated as empty. Are you sure to Proceed?")) {
      this.sharedService.DeleteTask(id).subscribe(data => {
        alert("Task is deleted!");
        this.Refresh();
      },
      (error) => { console.log(error); })
    } else {
      // Do nothing!
    }

  }

  Refresh(): void {
    window.location.reload(true);
  }

}