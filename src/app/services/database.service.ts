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

  getTasks() {
    return this.tasks;
  }

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
      console.error("Error en: "+e);
      return false;
    }
  }

  //CRUD methods
  async loadTasks() {
    try{
      const tasks = await this.db.query('SELECT * FROM Tasks;');
      this.tasks.set(tasks.values || []);
      console.log("Resultado de la carga de datos:") //borrar esto
      console.log(this.tasks()) //borrar esto
      if (this.tasks() != undefined) {
        console.log("Con datos");
      } else {
        console.log("Sin datos");
      }
    } catch (e: any) {
      console.error("Error en la consulta, detalles:")
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
    const query = "UPDATE Tasks SET title='"+title+"', priority="+priority+", date='"+date+"', hour='"+hour+"', description='"+description+"'";
    const result = await this.db.query(query);

    this.loadTasks();

    return result;
  }

  async deleteTask(id: number) {
    const query = 'DELETE FROM Tasks WHERE id='+id;
    const result = await this.db.query(query);

    this.loadTasks();

    return result;
  }
}
