import popSound from "./audio/pop.mp3";
import { trashItems } from "./trash";

const popAudio = new Audio(popSound);
const div = document.querySelector(".content"); // selecting the content container
const projectListContainer = document.querySelector("project-list-container");

// content DIV
const contentDiv = document.querySelector(".content");

// notificaiton element
const trashNotification = document.querySelector(".trash-notification");
const completedNotification = document.querySelector(".completed-notification");

// function to clear display
function clearDisplay() {
  contentDiv.innerHTML = " ";
}

// function to display single Todo

function displayTodo(todoObject) {
  const todoButton = document.createElement("input"); // TO DO CHECK LIST BUTTON

  todoButton.type = "checkbox";
  todoButton.classList = "todo-button";
  todoButton.addEventListener("click", () => {
    popAudio.play(); // MAKES THE POP SOUND ON CLICK
    todoObject.completed = false; // After clicking setting the object property to true

    clearDisplay(); // Cleaning the display
    displayTodo(todoObject); // Re render the whole List
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
    displayTodo(todoObject);

    trashNotification.textContent = trashItems.length;
    trashNotification.classList = "notification";
  });

  todoTitle.textContent = todoObject.title;
  todoDiscription.textContent = todoObject.description;

  // check for the task completion

    div.appendChild(todoDiv);

    todoDiv.appendChild(todoButton);
    todoDiv.appendChild(todoContentContainer);
    todoDiv.appendChild(deleteTodo);

    todoContentContainer.appendChild(todoTitle);
    todoContentContainer.appendChild(todoDiscription);
}

function displayList(list) {
  // ITERATING THROUGH ALL THE TODO OBJECTS
  list.forEach((todo, index) => {
    const todoButton = document.createElement("input"); // TO DO CHECK LIST BUTTON

    todoButton.type = "checkbox";
    todoButton.classList = "todo-button";
    
    todoButton.addEventListener("click", () => {
      popAudio.play(); // MAKES THE POP SOUND ON CLICK
      todo.completed = true; // After clicking setting the object property to true

      let completedTasks = list.filter((task) => task.completed === true);
      completedNotification.textContent = completedTasks.length;
      completedNotification.classList = "notification";

      clearDisplay(); // Cleaning the display
      displayList(list); // Re render the whole List
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
      displayList(list);

      trashNotification.textContent = trashItems.length;
      trashNotification.classList = "notification";
    });

    todoTitle.textContent = todo.title;
    todoDiscription.textContent = todo.description;

    // check for the task completion
    if (todo.completed === false) {
      div.appendChild(todoDiv);

      todoDiv.appendChild(todoButton);
      todoDiv.appendChild(todoContentContainer);
      todoDiv.appendChild(deleteTodo);

      todoContentContainer.appendChild(todoTitle);
      todoContentContainer.appendChild(todoDiscription);

      if (todo.dueDate) {
        // check for the due date input
        const today = new Date();
        if (todo.dateObject < today) {
          // check if it was in past then add line-through
          console.log("i am here daddy");
          const dueDate = document.createElement("p");
          dueDate.classList = "due-date";
          dueDate.textContent = `Due date: ${todo.dueDate}`;
          dueDate.style.textDecoration = "line-through";
          todoContentContainer.appendChild(dueDate);
        } else {
          const dueDate = document.createElement("p");
          dueDate.classList = "due-date";
          dueDate.textContent = `Due date: ${todo.dueDate}`;
          todoContentContainer.appendChild(dueDate);
        }
      }

      if (todo.priority) {
        todoDiv.className = "important todo-item";
      }

      //   if(todo.project){

      //     const project = document.createElement("li")
      //     project.textContent = `${todo.project}`
      //     projectListContainer.appendChild(project)

      //   }
    }
  });
}

export default displayList;
export { clearDisplay,displayTodo };
