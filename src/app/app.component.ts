import { Component } from '@angular/core';
import { TaskApiService } from './task-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mini-task-manager';
  constructor() {}
}
