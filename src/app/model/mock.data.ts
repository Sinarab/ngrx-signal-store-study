import { Todo } from "./todo.model";
import { User } from "./user.model";

export const TODOS: Todo[] = [
    {
        id: "1",
        title: "signalStore",
        completed: true
    },
    {
        id: "2",
        title: "withState",
        completed: true
    },
    {
        id: "3",
        title: "withMethod",
        completed: true
    },
    {
        id: "4",
        title: "withComputed",
        completed: true
    },
    {
        id: "5",
        title: "patchState",
        completed: true
    },
    {
        id: "5",
        title: "signalState",
        completed: false
    }
];

export const USERS: User[] = [
    {
        id: Math.random().toString(36).substr(2, 9),
        name: "Jonhana",
        email: "teste@email.com",
        role: "admin"
    },
    {
        id: Math.random().toString(36).substr(2, 9),
        name: "Maria",
        email: "teste@email.com",
        role: "qa"
    },
    {
        id: Math.random().toString(36).substr(2, 9),
        name: "José",
        email: "teste@email.com",
        role: "developer"
    }
]