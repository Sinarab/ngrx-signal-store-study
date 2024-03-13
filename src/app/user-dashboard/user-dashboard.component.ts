import { Component } from '@angular/core';
import { User, UserRoles } from '../model/user.model';
import { patchState, signalState } from '@ngrx/signals';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PartialStateUpdater } from '@ngrx/signals';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';

type UserState = { user: User, isActivated: boolean };
@Component({
  selector: 'user-dashboard',
  standalone: true,
  imports: [
    MatSlideToggle, MatButtonToggleGroup, MatButtonToggle
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  userState = signalState<UserState>({
    user: {
      id: '1', name: 'Jonhana', email: 'jonhana@email.com', role: 'admin'
    }, isActivated: false
  });

  // The patchState function provides a type-safe way to 
  // perform updates on pieces of state. 
  onUserActivateToggled({ checked }: MatSlideToggleChange) {
    patchState(this.userState, { isActivated: checked });
  }

  onUserRoleChanged({ value }: MatButtonToggleChange) {
    patchState(this.userState, setUserRole(value));
  }


}

//Custom State Updaters
function setUserRole(role: UserRoles): PartialStateUpdater<{ user: User }> {
  return (state) => ({ user: { ...state.user, role } });
}