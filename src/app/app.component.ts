import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todos.store';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, JsonPipe, TodosListComponent,
    MatProgressSpinner, UserDashboardComponent, InfoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  store = inject(TodosStore);

  ngOnInit() {
    this.loadTodos()
      .then(() => console.log('Todos loaded'));
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
