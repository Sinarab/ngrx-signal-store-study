import { patchState, signalStore, type, withHooks, withMethods, withState } from "@ngrx/signals";
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from "@ngrx/signals/entities";
import { User } from "../model/user.model";
import { inject } from "@angular/core";
import { UsersService } from "../services/users.service";

// https://ngrx.io/guide/signals/signal-store/entity-management
// withEntities is an extension to facilitate 
// CRUD operations for managing entities. 
export const UsersStore = signalStore(
    { providedIn: 'root' },
    // withEntities adds 4 properties of type Signal to the UsersStore.
    // ids: Signal<EntityId[]>: ids of all entities
    // entities: Signal<Todo[]>: array of all entities
    // entityMap: Signal<EntityMap<Todo>>: map of entities where the key is the id (EntityId)

    // By default, withEntities requires your entity to
    // have a property of name id, which serves as a unique identifier.
    withEntities<User>(),
    withMethods(
        (store, usersService = inject(UsersService)) => ({
            loadAll() {
                const users = usersService.loadUsers();
                patchState(store, setAllEntities(users));
            },
            add(name: string) {
                const user: User = { id: Math.random().toString(36).substr(2, 9), name, email: 'teste@email.com', role: 'developer' };
                patchState(store, addEntity(user));
            },
            remove(id: string) {
                patchState(store, removeEntity(id));
            },
            promote(id: string, role: User['role']) {
                if (['developer', 'qa'].includes(role))
                    patchState(store, updateEntity({ id, changes: { role: 'admin' } }));
            }
        })
    ),
    withHooks({
        onInit: (store) => store.loadAll()
    })
)