import { BaseService } from "./baseService.js"
export class TaskService extends BaseService {
    constructor() {
        super();//call again Constructor of class

    }
    // dinh nghia method getAllTask
    getAllTask = () => {
        return this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');


    }
    //dinh nghia ham dua du lieu ve backend 

    addTask = (task) => {
        //<= dung dinh dang backend quy dinh 
        return this.post('http://svcy.myclass.vn/api/ToDoList/AddTask', task);

    }
    deleteTask = (taskName) => {
        return this.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`)

    }
    doneTask = (taskName) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`);


    }
    rejectTask = (taskName) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`);

    }
};
//nghiep vu delete data


