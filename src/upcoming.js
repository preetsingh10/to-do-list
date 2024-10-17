import popSound from "./audio/pop.mp3";
import { trashItems } from "./trash";
import { clearDisplay } from "./displayToDo";

const popAudio = new Audio(popSound);
const div = document.querySelector(".content"); // selecting the content container

// content DIV
const contentDiv = document.querySelector(".content");

function upcomingList(list) {
  // ITERATING THROUGH ALL THE TODO OBJECTS
  list.forEach((todo, index) => {
    const todoButton = document.createElement("input"); // TO DO CHECK LIST BUTTON
    todoButton.type = "checkbox";
    todoButton.classList = "todo-button";
    todoButton.addEventListener("click", () => {
      popAudio.play(); // MAKES THE POP SOUND ON CLICK
      todo.completed = true; // After clicking setting the object property to true

      clearDisplay(); // Cleaning the display
      upcomingList(list); // Re render the whole List
      console.log(todo);
    });
    const todoDiv = document.createElement("div");
    todoDiv.classList = "todo-item";

    const todoContentContainer = document.createElement("div");
    todoContentContainer.classList = "todo-content-container";

    const todoTitle = document.createElement("p");
    todoTitle.classList = "todo-title";

    const todoDiscription = document.createElement("p");
    todoDiscription.classList = "todo-discription";

    const deleteTodo = document.createElement("button");
    deleteTodo.classList = "delete-todo";

    deleteTodo.addEventListener("click", () => {
      trashItems.push(todo);
      list.splice(index, 1);
      clearDisplay();
      upcomingList(list);
    });

    todoTitle.textContent = todo.title;
    todoDiscription.textContent = todo.description;

    // today date logic
    const today = new Date();
    console.log(todo.dateObject);
    if (todo.dateObject > today && todo.completed === false) {
      div.appendChild(todoDiv);

      todoDiv.appendChild(todoButton);
      todoDiv.appendChild(todoContentContainer);
      todoDiv.appendChild(deleteTodo);

      todoContentContainer.appendChild(todoTitle);
      todoContentContainer.appendChild(todoDiscription);

      if (todo.dueDate) {
        const dueDate = document.createElement("p");
        dueDate.classList = "due-date";
        dueDate.textContent = `Due date: ${todo.dueDate}`;
        todoContentContainer.appendChild(dueDate);
      }

      if (todo.priority) {
        todoDiv.className = "important todo-item";
      }
    }
  });
}

export default upcomingList;
