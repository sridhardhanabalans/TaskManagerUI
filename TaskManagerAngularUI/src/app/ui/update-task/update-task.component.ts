import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  task: Task = {
    taskId: null,
    taskName: null,
    parentId: null,
    parent: null,
    priority: null,
    startDate: null,
    endDate: null
  }
  tasks: Task[];
  startDate: string;
  endDate: string;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private route: ActivatedRoute, private location: Location,private router: Router, private sharedService: SharedService) { 
    this.bsConfig = Object.assign({}, 
      { 
        containerClass: 'theme-default' ,
        minDate: new Date(2018,0,1),
        maxDate: new Date(2100,11,31)
      });
  }
  

  ngOnInit() {
    this.getAllTasks();
    this.getTask();
  }

  getAllTasks(): void {
    this.sharedService.GetAllTasks().subscribe(data => {this.tasks = data},
      (error) => { console.log(error); });
  }

  getTask(): void {
    const id =+this.route.snapshot.paramMap.get('id');
    this.sharedService.GetTaskById(id).subscribe(data => { this.task = data; this.startDate = new Date(this.task.startDate).toLocaleDateString(); this.endDate = new Date(this.task.endDate).toLocaleDateString();},
    (error) => { console.log(error); });
  }

  UpdateTask(): void {
    this.task.startDate = new Date(this.startDate);
    this.task.endDate = new Date(this.endDate);
    this.sharedService.UpdateTask(this.task).subscribe(
      data=> {alert("Task updated!"); this.router.navigate(['/view']);},
      (error) => { console.log(error); }
    );
  }

  Cancel(): void {
    this.location.back();
  }

}
