import { Component, effect, inject, viewChild } from '@angular/core';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormField, MatInput, MatIcon,
    MatSuffix, MatLabel, MatButtonToggleGroup,
    MatButtonToggle, MatSelectionList, MatListOption,
    NgStyle
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore)
  // view child signal based to query component from template
  filter = viewChild.required(MatButtonToggleGroup);


  constructor() {
    // An effect is an operation that runs whenever one or more signal values change
    // effects keep track of their dependencies dynamically,
    // and only track signals which were read in the most recent execution.
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    })
  }

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onTodoToggled(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);

  }
}
