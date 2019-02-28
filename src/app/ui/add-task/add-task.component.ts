import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  tasks: Task[];
  task: Task = {
    taskId: null,
    taskName: null,
    parentId: null,
    parent: null,
    priority: null,
    startDate: null,
    endDate: null
  }
  startDate: string;
  endDate: string;

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
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.sharedService.GetAllTasks().subscribe(data => {this.tasks = data},
      (error) => { console.log(error); });
  }

  AddTask() {
    this.task.taskId = 0;
    this.task.startDate = new Date(this.startDate);
    this.task.endDate = new Date(this.endDate);
    this.sharedService.AddTask(this.task).subscribe(data => { alert("Task added!"); this.router.navigate(['/view']); },
    (error) => { console.log(error); }
    );
  }

  Reset(): void {
    this.task = {
      taskId: null,
      taskName: null,
      parentId: null,
      parent: null,
      priority: null,
      startDate: null,
      endDate: null
    }
  }
}
