import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { UsersStore } from '../store/users.store';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { UserRoles } from '../model/user.model';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [
    MatList, MatListItem, MatIcon,
    MatButtonModule, MatFormField, MatLabel,
    MatSuffix, MatInput
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  usersStore = inject(UsersStore);

  onAddUser(name: string) {
    this.usersStore.add(name);
  }

  onPromoteUser(id: string, role: UserRoles) {
    this.usersStore.promote(id, role);
  }

  onDeleteUser(id: string) {
    this.usersStore.remove(id);
  }
}
