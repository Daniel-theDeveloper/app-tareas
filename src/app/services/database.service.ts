import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_TASKS = 'tasksdb';

export interface Tasks {
  id: number;
  title: string;
  status: number;
  priority: number,
  date: string;
  hour: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  private tasks: WritableSignal<Tasks[]> = signal<Tasks[]>([]);
  // private selectedTask: WritableSignal<Tasks[]> = signal<Tasks[]>([]);

  public developMode: boolean = false;

  getTasks() {
    return this.tasks;
  }

  // getSelectedTask() {
  //   return this.selectedTask;
  // }

  constructor() { }

  async initializPlugin() {
    console.log("Iniciando plugin") //borrar esto
    try {
      this.db = await this.sqlite.createConnection(
        DB_TASKS,
        false,
        "no-encryption",
        1,
        false
      );
      this.db.open();
      const schema = 'CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, status INTEGER NOT NULL, priority INTEGER NOT NULL, date TEXT NOT NULL, hour TEXT NOT NULL, description TEXT NOT NULL);';
  
      await this.db.execute(schema);
      this.loadTasks();
      console.log("Base de datos creada con exito");
      return true;
    } catch (e: any) {
      // console.error(e);
      console.log("Iniciando aplicacion en modo Desarrollador");
      this.developMode = true;
      return false;
    }
  }

  //CRUD methods
  async loadTasks() {
    try{
      const tasks = await this.db.query('SELECT * FROM Tasks;');
      this.tasks.set(tasks.values || []);
    } catch (e: any) {
      console.error("Error en la consulta, detalles:")
      console.error(e);
    }
  }

  async loadTaskDate(date: any) {
    try {
      const tasks = await this.db.query('SELECT * FROM Tasks where date = "'+ date +'";');
      this.tasks.set(tasks.values || []);
      // this.selectedTask.set(tasks.values || []);
    } catch (e: any) {
      console.error(e);
    }
  }

  async addTasks(title: string, status: number, priority: number, date: string, hour: string, description: string) {
    const query = "INSERT INTO Tasks (title, status, priority, date, hour, description) VALUES ('"+title+"', "+status+","+priority+", '"+date+"', '"+hour+"', '"+description+"')";
    const result = await this.db.query(query);

    this.loadTasks();

    return result;
  }

  async updateTasks(title: string, priority: number, date: string, hour: string, description: string) {
    console.log("Comienzo del metodo") //borrar esto
    try {
      const query = "UPDATE Tasks SET title='"+title+"', priority="+priority+", date='"+date+"', hour='"+hour+"', description='"+description+"'";
      const result = await this.db.query(query);
      console.log("Resultado:");
      console.log(result);
  
      this.loadTasks();
  
      return true;
    } catch (e: any) {
      console.error(e);
      return false;
    }
  }

  async updateStatus(id: number, status: number) {
    const query = "UPDATE Tasks SET status="+status+" WHERE id="+id;
    const result = await this.db.query(query);

    this.loadTasks();

    return result;
  }

  async deleteTask(id: number) {
    try {
      const query = 'DELETE FROM Tasks WHERE id='+id;
      const result = await this.db.query(query);
      this.loadTasks();
      console.log("Resultado:") //borrar esto
      console.log(result) //borrar esto
  
      return true;
    } catch (e: any) {
      console.error(e);
      return false;
    }
  }
}
