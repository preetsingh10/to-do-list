import ToDo from "./ToDo";
// import { todoList } from ".";
import { clearDisplay } from "./displayToDo";
import displayList from "./displayToDo";
import { updateUpcomingNotification } from "./upcoming";
import { updateTodayNotifiaction } from "./today";

// Dialog Element
const dialog = document.querySelector(".add-todo-dialog");
const cancelButton = document.querySelector(".cancel-button");

const dialogForm = document.querySelector(".dialog-form");


cancelButton.addEventListener("click", (e) => {
  dialog.close()
});

dialogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const title = formData.get("title");
  const discription = formData.get("discription");
  const date = formData.get("date");
  const priority = formData.get("priority")
const project = formData.get('project')
  let newTask = new ToDo(title, discription);
  if(date){
    newTask.setDueDate(date);

  }
 if(priority){
    newTask.setPriority(true)
 }
 if(project){
  newTask.setProject(project)
 }
 let todoList = JSON.parse(localStorage.getItem('todoList')) 
 if(todoList === null){
  todoList = []
 } 
 todoList.push(newTask);
localStorage.setItem('todoList',JSON.stringify(todoList))
updateUpcomingNotification(todoList)
updateTodayNotifiaction(todoList)


  clearDisplay();
  displayList(todoList);

  dialogForm.reset();
  dialog.close();
});

export { dialog };
