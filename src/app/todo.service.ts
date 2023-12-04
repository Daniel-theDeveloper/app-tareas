import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    public storage: Storage
  ) { }

  public async generateKey(): Promise<string> {
    let key = 'todo${ parseInt(`${Math.random() * 100}`)}';
    let ret = await this.storage.get(key);

    while (ret) {
      key = 'todo${ parseInt(`${Math.random() * 100}`)}';
      let ret = await this.storage.get(key);
    }
    return key;
  }

  public async read(): Promise<Todo[]> {

    let todos: Array<Todo> = [];
    await this.storage.forEach((v, key, i) => {
      if (key.startsWith("todo")) {
        todos.push(v);
      }
    });
    return todos;
  }

  public async create(key: string, todo: Todo) {
    console.log("Creando la base de datos: ", todo);
    return await this.storage.set(key, todo);
  }

  // public async update(todo: Todo) {
  //   return await this.storage.set(todo.key, todo);
  // }

  public async delete(key: string){
    return await this.storage.remove(key);
  }

}
