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

export interface Count {
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  private tasks: WritableSignal<Tasks[]> = signal<Tasks[]>([]);
  private selectedTask: WritableSignal<Tasks[]> = signal<Tasks[]>([]);
  private idTask: WritableSignal<Tasks[]> = signal<Tasks[]>([]);
  private dates: WritableSignal<Tasks[]> = signal<Tasks[]>([]);

  private countTasks1: WritableSignal<Count[]> = signal<Count[]>([]);
  private countTasks2: WritableSignal<Count[]> = signal<Count[]>([]);
  private countTasks3: WritableSignal<Count[]> = signal<Count[]>([]);

  public developMode: boolean = false;

  getTasks() {
    return this.tasks;
  }

  getSelectedTask() {
    return this.selectedTask;
  }

  getIdTask() {
    return this.idTask;
  }

  getDates() {
    return this.dates;
  }

  getTaskCount1() {
    return this.countTasks1();
  }

  getTaskCount2() {
    return this.countTasks2();
  }

  getTaskCount3() {
    return this.countTasks3();
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
      // console.error(e);
      console.log("Iniciando aplicacion en modo Desarrollador");
      this.developMode = true;
      return false;
    }
  }

  //CRUD methods
  async loadTasks() {
    try{
      const tasks = await this.db.query('SELECT * FROM Tasks ORDER BY date DESC;');
      this.tasks.set(tasks.values || []);
    } catch (e: any) {
      console.error("Error en la consulta, detalles:")
      console.error(e);
    }
  }

  async loadTaskDate(date: any) {
    try {
      const tasks = await this.db.query('SELECT * FROM Tasks where date = "'+ date +'" ORDER BY hour;');
      // this.tasks.set(tasks.values || []);
      this.selectedTask.set(tasks.values || []);
    } catch (e: any) {
      console.error(e);
    }
  }

  async loadTaskId(id: any) {
    try {
      const tasks = await this.db.query('SELECT * FROM Tasks where id = "'+ id +'";');
      this.idTask.set(tasks.values || []);
    } catch (e: any) {
      console.error(e);
    }
  }

  async loadOnlyDates() {
    try {
      const dates = await this.db.query("SELECT date FROM Tasks ORDER BY date;");
      this.dates.set(dates.values || []);
    } catch (e: any) {
      console.error(e);
    }
  }

  async loadAll(date: string) {
    try {
      await this.loadTasks();
      await this.loadOnlyDates();
      await this.loadTaskDate(date);
      await this.countTaskByPriority(date);
    } catch(e: any) {
      console.error(e);
    }
  }

  async addTasks(title: string, status: number, priority: number, date: string, hour: string, description: string) {
    const query = "INSERT INTO Tasks (title, status, priority, date, hour, description) VALUES ('"+title+"', "+status+","+priority+", '"+date+"', '"+hour+"', '"+description+"')";
    const result = await this.db.query(query);

    this.loadTasks();

    return result;
  }

  async updateTasks(id: number, title: string, status: number, priority: number, date: string, hour: string, description: string) {
    try {
      const query = "UPDATE Tasks SET title='"+title+"', status="+status+", priority="+priority+", date='"+date+"', hour='"+hour+"', description='"+description+"' WHERE id="+id;
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

  async countTaskByPriority(date: string) {
    try {
      const lowCount = await this.db.query("SELECT count(*) AS count FROM Tasks WHERE priority = 1 AND date = '"+date+"';");
      const mediumCount = await this.db.query("SELECT count(*) AS count FROM Tasks WHERE priority = 2 AND date = '"+date+"';");
      const highCount = await this.db.query("SELECT count(*) AS count FROM Tasks WHERE priority = 3 AND date = '"+date+"';");

      this.countTasks1.set(lowCount.values || []);
      this.countTasks2.set(mediumCount.values || []);
      this.countTasks3.set(highCount.values || []);
    } catch (e: any) {
      console.error(e);
    }
  }
}
