import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  apiURL = 'https://devza.com/tests/tasks';
  token = '0cHcn01eKfX1DnCUWiJjS5F7oHRJXqWq';

  private readonly authToken = new HttpHeaders().set('AuthToken', this.token);

  constructor(private httpClient: HttpClient) { }

  getListOfTasks() {
    const header = this.authToken;
    return this.httpClient.get<Task[]>(`${this.apiURL}/list`, {headers: header});
  }
  addTask(payload) {
    const body = JSON.stringify(payload);
    // const header = new HttpHeaders().set('AuthToken', this.token);
    return this.httpClient.post<Task[]>(`${this.apiURL}/create `, body, {headers: this.authToken});
  }
  updateTask(payload) {
    const body = JSON.stringify(payload);
    return this.httpClient.put<Task[]>(`${this.apiURL}/update `, body, {headers: this.authToken});
  }
  deleteTask(id) {
    const options = {
      headers: this.authToken,
      body: id
    };
    return this.httpClient.delete<Task[]>(`${this.apiURL}/delete `, options);
  }
}
