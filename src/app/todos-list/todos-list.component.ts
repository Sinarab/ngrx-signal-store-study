import { Component, inject } from '@angular/core';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TodosStore } from '../store/todos.store';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatListOption, MatSelectionList } from '@angular/material/list';
@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormField, MatInput, MatIcon,
    MatSuffix, MatLabel, MatButtonToggleGroup,
    MatButtonToggle, MatSelectionList, MatListOption
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore)

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }
}
