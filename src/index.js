import "./styles.css";
import displayList from "./displayToDo";
import { clearDisplay } from "./displayToDo";
import { completedList } from "./completed";
import trashList from "./trash";

import todayList, { updateTodayNotifiaction } from "./today";
import upcomingList from "./upcoming";
import { dialog } from "./addTodoDialog"; // Dialog Element
import { completedNotification, trashNotification } from "./displayToDo";
import { updateUpcomingNotification } from "./upcoming";
import { addProjectDialog } from "./addProject";
import { updateProjectDisplay } from "./addProject";


// if there is no dat in local storage the code below will make empty arrays 
let todoList = JSON.parse(localStorage.getItem("todoList"));
if (todoList === null) {
  todoList = [];
}
let trashItems = JSON.parse(localStorage.getItem("trashList"));
if(trashItems === null){
  trashItems = []
  localStorage.setItem('trashList',JSON.stringify(trashItems))
}
let projectList = JSON.parse(localStorage.getItem("projectList"))
if(projectList === null){
  projectList = []
  localStorage.setItem('projectList',JSON.stringify(projectList))
}

// content DIV
const contentDiv = document.querySelector(".content");

// content Heading
const contentHeading = document.querySelector(".content-heading");
const contentButtonContainer = document.querySelector('.add-task-button-container')

// Sidebar Elements
const addTask = document.querySelector(".addTask-listItem");
const general = document.querySelector(".general-listItem");
const today = document.querySelector(".today-listItem");
const upcoming = document.querySelector(".upcoming-listItem");
const completed = document.querySelector(".completed-listItem");
const trash = document.querySelector(".trash-listItem");
const addProject = document.querySelector('.add-project-listItem')



// event listeners

addTask.addEventListener("click", () => {
  dialog.showModal();
});

general.addEventListener("click", () => {
  contentHeading.textContent = "General";
  clearDisplay();
  todoList = JSON.parse(localStorage.getItem("todoList"));
  if (todoList === null) {
    todoList = [];
  }
  displayList(todoList);
  contentButtonContainer.innerHTML = ' '
});

today.addEventListener("click", () => {
  contentHeading.textContent = "Today's Task";
  clearDisplay();
  todoList = JSON.parse(localStorage.getItem("todoList"));
  if (todoList === null) {
    todoList = [];
  }

  todayList(todoList);
  updateTodayNotifiaction(todoList);
  contentButtonContainer.innerHTML = ' '
});


upcoming.addEventListener("click", () => {
  contentHeading.textContent = "Up Coming Tasks's";
  todoList = JSON.parse(localStorage.getItem("todoList"));
  updateUpcomingNotification(todoList);
  clearDisplay();
  upcomingList(todoList);
    contentButtonContainer.innerHTML = ' '
});

completed.addEventListener("click", () => {
  contentHeading.textContent = "Completed Task's";
  clearDisplay();
  completedList(todoList);
    contentButtonContainer.innerHTML = ' '
});

trash.addEventListener("click", () => {
  contentHeading.textContent = "Trash Items";
  trashItems = JSON.parse(localStorage.getItem("trashList"));
  if (trashItems === null) {
    trashItems = [];
  }

  clearDisplay();
  contentButtonContainer.innerHTML = ' '
  trashList(trashItems);
});

addProject.addEventListener('click',()=>{
addProjectDialog.showModal()
})

// ON Refresh and defaults template state

contentHeading.textContent = "Today's tasks";
todayList(todoList); // to display the todo list on refresh
updateProjectDisplay()

// sidbar notifiactions

// for the completed task notification on refresh and general
let completedTasks = todoList.filter((todo) => todo.completed === true).length;
if (completedTasks > 0) {
  completedNotification.textContent = completedTasks;
  completedNotification.classList.add("notification");
}

 trashItems = JSON.parse(localStorage.getItem("trashList")).length;
if (trashItems > 0) {
  trashNotification.textContent = trashItems;
  trashNotification.classList.add("notification");
}
updateUpcomingNotification(todoList);
updateTodayNotifiaction(todoList);

export { todoList };
