import "./styles.css";
import displayList from "./displayToDo";
import { clearDisplay } from "./displayToDo";
import { completedList } from "./completed";
import trashList from "./trash";
import { trashItems } from "./trash";
import todayList from "./today";
import upcomingList from "./upcoming";
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

const todo1 = new ToDo("Go to the gym", "Do legs don't skip it");
const todo2 = new ToDo("Make breakfast", "Scramble eggs and oatmeal");
const todo3 = new ToDo("Grossary", "eggs,oats,coffee beans,rice");
todo1.setDueDate("2024-12-10");
todo2.setDueDate("2024-12-11");
todo3.setDueDate("2024-12-12");
todo1.setPriority(true)
todo1.setProject("Home")

export let todoList = [todo1, todo2,todo3];

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
  clearDisplay()
  upcomingList(todoList)
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
