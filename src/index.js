import "./styles.css";
import displayList from "./displayToDo";
import { clearDisplay } from "./displayToDo";
import { completedList } from "./completed";
import trashList from "./trash";
import { trashItems } from "./trash";
import todayList from "./today";
import { dialog } from "./dialog"; // Dialog Element

import ToDo from "./ToDo";

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

// sample to do objects

const todo1 = new ToDo("first task", "i am task 1");
const todo2 = new ToDo("second task", "i am task 2");
todo1.setDueDate("2001-03-10");
console.log(todo1.dueDate);

export let todoList = [todo1, todo2];

// event listeners

addTask.addEventListener("click", () => {
  dialog.showModal();
});

general.addEventListener("click", () => {
  contentHeading.textContent = "General";
  clearDisplay();
  displayList(todoList);
});

today.addEventListener("click", () => {
  contentHeading.textContent = "Today";
  clearDisplay();
  todayList(todoList);
  console.log(todoList)
});

upcoming.addEventListener("click", () => {
  contentHeading.textContent = "Up Coming Tasks's";
});

completed.addEventListener("click", () => {
  contentHeading.textContent = "Completed Task's";
  clearDisplay();
  completedList(todoList);
});

trash.addEventListener("click", () => {
  contentHeading.textContent = "Deleted Task's";
  clearDisplay();
  trashList(trashItems);
});

contentHeading.textContent = "General";

displayList(todoList, contentDiv);
