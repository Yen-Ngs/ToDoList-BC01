import { TaskService } from "../services/TaskService.js";
import { Task } from "../models/task.js";
// khai bao doi tuong service
const taskSV = new TaskService();
const getAllTask = async () => {
    //Buoc 2
  //dung service de goi API tu backend lay du lieu ve
  try {
    const result = await taskSV.getAllTask();
    // console.log("result", result);

    let taskTodo = result.data.filter((task) => task.status === false);
    console.log("task chua man ", taskTodo);

    let taskComplete = result.data.filter((task) => task.status === true);
    // console.log("task da lam", taskComplete);

    renderToDoList(taskTodo);
    renderCompleteList(taskComplete);
  } catch (err) {}
};
//buoc 3: tu du lieu tach 2 mang => render du lieu len giao dien 
const renderToDoList = (taskTodo) => {
  let contentTaskToDo = taskTodo.reduce((content, item, index) => {
    return (content += `<li>
    <span style="cursor:pointer">${item.taskName}</span>
    <span style="cursor:pointer" onclick="delTask('${item.taskName}')"> <i class="fa fa-trash"></i></span>
    <span style="cursor:pointer" onclick="doneTask('${item.taskName}')"> <i class="fa fa-check"></i></span>
    </li>`);
  },'');  

  document.getElementById("todo").innerHTML = contentTaskToDo;

};

const renderCompleteList = (taskComplete) => {
  console.log('task da lam',taskComplete)
  let contentTaskToDo = taskComplete.reduce((content, item, index) => {
    return (content += `<li><span style="cursor:pointer">${item.taskName}</span>
    <span style="cursor:pointer" onclick="delTask('${item.taskName}')"> <i class="fa fa-trash"></i></span>
    <span style="cursor:pointer"> <i class="fa fa-redo"></i></span></li>`);
  },'');
console.log(contentTaskToDo)
  document.getElementById("complete").innerHTML = contentTaskToDo;
};``
window.delTask = async (taskName) =>{
  let cfm = confirm ('Do you want to del task?');

  //goi api moi lan nguoi dung bam nut xoa du lieu 
  if(cfm){
    try{
      let result = await taskSV.deleteTask(taskName);
      console.log(result.data);
      //goi lai ham get task sau khi xoa
      getAllTask();
    }catch (err){
      console.log(err); 
    }
  }
}
getAllTask();

//======= Nghiep vu them task=======
//B1: dinh nghia su kien click cho button  #addItem
document.getElementById('addItem').onclick = async (event) =>{
    //event.preventDefault(); //Chan su kien hien tai cua the submit hay the href the a 
    //event.target <= dai dien cho the button dang duoc onclick

    //lay thong tin ng dung nhap tu giao dien 
    let taskName = document.getElementById('newTask').value;
    // tao ra object backend yeu cau
    const taskModel = new Task();
    taskModel.taskName= taskName;
    //goi Api dua du lieu ve server
    try{
        let result = await taskSV.addTask(taskModel);
        console.log('ketqua',result.data);
        getAllTask();


    }catch(err){
        console.log(err);
    }
}
window.doneTask = async (taskName) =>{
  try{
    let result = await taskSV.doneTask(taskName);
    getAllTask();
    console.log(result.data);

  }catch(err){
    console.log(err);
  }

}

