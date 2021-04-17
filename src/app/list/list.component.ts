import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _taskPriority: Task[];
  get taskPriority(): Task[] {
    return this._taskPriority;
  }
  @Input() set taskPriority(value: Task[]) {
    this._taskPriority = value;
  }
  dispalyAddTask = false;
  addDescription;
  @Output() crudOperationList = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  updateOrDeleteOperation(event) {
    console.log('==', event);
    this.crudOperationList.emit(event);
  }
  allowDrop($event) {
    $event.preventDefault();
  }
  drop($event) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData('text');
    const target = $event.target;
    const targetClassName = target.className;
    target.appendChild(document.getElementById(data));
  }
}
