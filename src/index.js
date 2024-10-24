import "./styles.css";
import displayList from "./displayToDo";
import { clearDisplay } from "./displayToDo";
import { completedList } from "./completed";
import trashList from "./trash";
import todayList from "./today";
import upcomingList from "./upcoming";
import { dialog } from "./addTodoDialog"; // Dialog Element
import { completedNotification,trashNotification } from "./displayToDo";
import { updateUpcomingNotification } from "./upcoming";

let todoList = JSON.parse(localStorage.getItem("todoList"));
if(todoList ===  null){
  todoList = []
}
// content DIV
const contentDiv = document.querySelector(".content");

// content Heading
const contentHeading = document.querySelector(".content-heading");

// Sidebar Elements
const addTask = document.querySelector(".addTask-listItem");
const general = document.querySelector(".general-listItem");
const today = document.querySelector(".today-listItem");
const upcoming = document.querySelector(".upcoming-listItem");
const completed = document.querySelector(".completed-listItem");
const trash = document.querySelector(".trash-listItem");

// event listeners

addTask.addEventListener("click", () => {
  dialog.showModal();
});

general.addEventListener("click", () => {
  contentHeading.textContent = "General";
  clearDisplay();
  todoList = JSON.parse(localStorage.getItem("todoList"));
  if(todoList ===  null){
    todoList = []
  }
  displayList(todoList);
});

today.addEventListener("click", () => {
  contentHeading.textContent = "Today's Task";
  clearDisplay();
  todoList = JSON.parse(localStorage.getItem("todoList"));
  if(todoList === null){
    todoList = []
  }

  todayList(todoList);
  console.log(todoList);
});

upcoming.addEventListener("click", () => {
  contentHeading.textContent = "Up Coming Tasks's";
  todoList = JSON.parse(localStorage.getItem("todoList"));
  updateUpcomingNotification(todoList)
  clearDisplay();
  upcomingList(todoList);
});

completed.addEventListener("click", () => {
  contentHeading.textContent = "Completed Task's";
  clearDisplay();
  completedList(todoList);
});

trash.addEventListener("click", () => {
  contentHeading.textContent = "Trash Items";
  let trashItems = JSON.parse(localStorage.getItem("trashList"));
  if(trashItems === null){
    trashItems = []
  }

  clearDisplay();
  trashList(trashItems);
});

contentHeading.textContent = "Today's tasks";

todayList(todoList); // to display the todo list on refresh
updateUpcomingNotification(todoList)


// sidbar notifiactions

// for the completed task notification on refresh and general
let completedTasks = todoList.filter((todo) => todo.completed === true).length
if(completedTasks > 0){
  completedNotification.textContent = completedTasks;
  completedNotification.classList.add("notification");
}

let trashItems = JSON.parse(localStorage.getItem("trashList")).length;
if(trashItems > 0){
  trashNotification.textContent = trashItems;
  trashNotification.classList.add("notification");
}

export { todoList };
