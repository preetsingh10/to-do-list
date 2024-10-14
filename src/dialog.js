import ToDo from "./ToDo";
import { todoList } from ".";
import { clearDisplay } from "./displayToDo";
import displayList from "./displayToDo";

// Dialog Element
const dialog = document.querySelector("dialog");
const cancelButton = document.querySelector(".cancel-button");

const dialogForm = document.querySelector(".dialog-form");

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

dialogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target)

  const title = formData.get('title')
  const discription = formData.get('discription')
  const date = formData.get('date')

  const newTask = new ToDo(title, discription)
newTask.setDueDate(date)
  todoList.push(newTask)

  clearDisplay()
  displayList(todoList)

  dialogForm.reset()
  dialog.close()
});

export { dialog };
