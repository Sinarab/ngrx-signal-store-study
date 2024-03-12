import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../model/todo.model";
import { TodosService } from "../services/todos.service";
import { inject } from "@angular/core";

export type TodosFilter = 'all' | 'pending' | 'completed';

// first define the store state
// every parameter defined here is a signal
type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
}

// then define the initial state
const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: 'all'
}



export const TodosStore = signalStore(
    // like any other service, you can provide it in the root module
    { providedIn: 'root' },
    // manage states
    // The withState feature is used to add state properties to the SignalStore. 
    withState(initialState),
    // manage behaviours
    // withMethods factory is also executed within the injection context. 
    withMethods(
        (store, todosService = inject(TodosService)) => ({
            async loadAll() {
                // The patchState function provides a type-safe way to perform updates on pieces of state.
                // Updaters passed to the patchState function must perform state updates in an immutable manner (functional).
                patchState(store, { loading: true });
                const todos = await todosService.getTodos();
                patchState(store, { todos, loading: false });
            },
            async addTodo(title: string) {
                const todo = await todosService.addTodo({ title, completed: false });
                patchState(store, (state) => ({
                    todos: [...state.todos, todo]
                }))
            }
        })
    )

)

