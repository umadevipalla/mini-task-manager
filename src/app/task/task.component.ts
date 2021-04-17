import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _task: Task[];
  get task(): Task[] {
    return this._task;
  }
  @Input() set task(value: Task[]) {
    this._task = value;
  }
  @Output() crudOperation = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickOfUpdateTask() {
    this.crudOperation.emit({task: this.task, val: 'update'});
  }
  onClickOfDeleteTask() {
    this.crudOperation.emit({task: this.task, val: 'delete'});
  }
  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

}
