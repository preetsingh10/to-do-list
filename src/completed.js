import popSound from "./audio/pop.mp3";
const popAudio = new Audio(popSound);
const div = document.querySelector(".content"); // selecting the content container
import { clearDisplay } from "./displayToDo";
function completedList(list) {
  // ITERATING THROUGH ALL THE TODO OBJECTS
  list.forEach((todo, index) => {
    const todoButton = document.createElement("input"); // TO DO CHECK LIST BUTTON
    todoButton.type = "checkbox";
    todoButton.checked = true;
    todoButton.classList = "todo-button";
    todoButton.addEventListener("click", () => {
      popAudio.play(); // MAKES THE POP SOUND ON CLICK
      todo.completed = false; // After clicking setting the object property to false

      clearDisplay(); // Cleaning the display
      completedList(list); // Re render the whole List
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

    todoTitle.textContent = todo.title;
    todoDiscription.textContent = todo.description;

    if (todo.completed === true) {
      div.appendChild(todoDiv);

      todoDiv.appendChild(todoButton);
      todoDiv.appendChild(todoContentContainer);

      todoContentContainer.appendChild(todoTitle);
      todoContentContainer.appendChild(todoDiscription);
    }
  });
}

export { completedList };
