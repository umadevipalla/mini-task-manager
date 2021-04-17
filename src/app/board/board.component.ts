import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskApiService } from '../task-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  highPriorityTaskList: Task[];
  mediumPriorityTaskList: Task[];
  lowPriorityTaskList: Task[];
  popup = false;
  updateVal;

  constructor(public taskApi: TaskApiService) {}

  private getTaskApiList(taskApi: TaskApiService) {
    taskApi.getListOfTasks().subscribe((res) => {
      this.highPriorityTaskList = this.fetchPriorityList(res, '1');
      this.mediumPriorityTaskList = this.fetchPriorityList(res, '2');
      this.lowPriorityTaskList = this.fetchPriorityList(res, '3');
    });
  }

  private fetchPriorityList(res, compareVal) {
    const taskList = [];
    res.tasks.forEach((val: Task) => {
      if (val.priority === compareVal) {
        taskList.push(val);
      }
    });
    return taskList;
  }

  ngOnInit() {
    this.getTaskApiList(this.taskApi);
  }

  onClickOfAddTask() {
    this.popup = true;
  }
  onClickOfClose() {
    this.popup = false;
  }
  displayFormInput(event) {
    if (event === true) {
      this.onClickOfClose();
    } else {
      const payload = {
        message: event.formValue.message,
        due_date: event.formValue.dueDate,
        priority: event.formValue.priority,
        assigned_to: event.formValue.assigneeName
      };
      if (event.updateFlag) {
        this.addTaskApiResponse(event, payload);
      } else {
        this.updateTaskApiResponse(event, payload);
      }
    }
    this.popup = false;
  }
  private updateTaskApiResponse(event: any, payload) {
    if (event.formValue.message) {
      this.taskApi.addTask(payload).pipe(
        map((res) => res)).subscribe(response => {
          this.getTaskApiList(this.taskApi);
        });
    }
  }

  private addTaskApiResponse(event: any, payload) {
    if (event.formValue.message) {
      this.taskApi.updateTask(payload).pipe(
        map((res) => res)).subscribe(response => {
          this.getTaskApiList(this.taskApi);
        });
    }
  }

  getTask(event) {
    console.log('getTask', event);
    if (event.val === 'update') {
      this.popup = true;
      this.updateVal = event;
    } else {
      this.deleteTaskApiResponse(event);
    }
  }

  private deleteTaskApiResponse(event: any) {
    if (event.formValue.message) {
      this.taskApi.deleteTask(event.id).pipe(
        map((res) => res)).subscribe(response => {
          this.getTaskApiList(this.taskApi);
        });
    }
  }
}
