import displayList from "./displayToDo";
import popSound from "./audio/pop.mp3";

let trashItems = [];

// content DIV
const contentDiv = document.querySelector(".content");

function trashList(list) {
  // ITERATING THROUGH ALL THE TODO OBJECTS
  list.forEach((todo, index) => {
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

    contentDiv.appendChild(todoDiv);

    todoDiv.appendChild(todoContentContainer);

    todoContentContainer.appendChild(todoTitle);
    todoContentContainer.appendChild(todoDiscription);
  });
}

export default trashList;

export { trashItems };
