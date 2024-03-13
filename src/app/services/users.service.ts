import { Injectable } from "@angular/core";
import { USERS } from "../model/mock.data";
import { User } from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    loadUsers(): User[] {
        return USERS;
    }
}