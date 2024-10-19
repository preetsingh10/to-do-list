import popSound from "./audio/pop.mp3";
// import { trashItems } from "./trash";
import editDialog from "./editTodoDialog";
import { editTodo } from "./editTodoDialog";

const div = document.querySelector(".content"); // selecting the content container
const projectListContainer = document.querySelector("project-list-container");

// content DIV
const contentDiv = document.querySelector(".content");




// // edit dialog element
// const editDialog = document.querySelector(".edit-todo-dialog");
// const cancelButton = document.querySelector(".cancel-edit-button");

// const dialogForm = document.querySelector(".edit-form");

// // edit input elements
// const  editTitle = document.querySelector("#edit-title");
// const  editDiscription = document.querySelector("#edit-discription");
// const editDate = document.querySelector("#edit-date");
// const editPriority = document.querySelector("#edit-priority");

// notificaiton element
const trashNotification = document.querySelector(".trash-notification");
const completedNotification = document.querySelector(".completed-notification");

let trashItems = JSON.parse(localStorage.getItem('trashList'))

// function to clear display
function clearDisplay() {
  contentDiv.innerHTML = "";
}

// function to play sound on completion
function playSound() {
  const popAudio = new Audio(popSound);
  popAudio.play();
}

function displayList(list) {
  // ITERATING THROUGH ALL THE TODO OBJECTS
  list.forEach((todo, index) => {
    const todoButton = document.createElement("input"); // TO DO CHECK LIST BUTTON

    todoButton.type = "checkbox";
    todoButton.classList = "todo-button";

    todoButton.addEventListener("click", () => {
      playSound(); // MAKES THE POP SOUND ON CLICK
      todo.completed = true; // After clicking setting the object property to true 

      let objectArray = JSON.parse(localStorage.getItem('todoList'))
      objectArray[index].completed = true
      localStorage.setItem('todoList', JSON.stringify(objectArray))
      
      let completedTasks = list.filter((task) => task.completed === true);
      completedNotification.textContent = completedTasks.length;
      completedNotification.classList = "notification";

      clearDisplay(); // Cleaning the display
      displayList(list); // Re render the whole List
    });

    const todoDiv = document.createElement("div");
    todoDiv.classList = "todo-item";

    const todoContentContainer = document.createElement("div");
    todoContentContainer.classList = "todo-content-container";

    const todoTitle = document.createElement("p");
    todoTitle.classList = "todo-title";

    const todoDiscription = document.createElement("p");
    todoDiscription.classList = "todo-discription";

    const editButton = document.createElement("button");
    editButton.classList = "edit-button";
    editButton.textContent = "Edit";

    // edit button event handler

    editButton.addEventListener("click", () => {
      // editDialog.showModal();
      // editTodo(todo,list)
      const titleInput = document.createElement('input')
      titleInput.type = 'text'
      titleInput.value = todo.title;
      titleInput.classList.add('todo-title')
      todoContentContainer.replaceChild(titleInput,todoTitle)
      
    });

    const deleteTodo = document.createElement("button");
    deleteTodo.classList = "delete-todo";

    deleteTodo.addEventListener("click", () => {
      trashItems.push(todo);

      localStorage.setItem('trashList',JSON.stringify(trashItems))
      list.splice(index, 1);

      let objectArray = JSON.parse(localStorage.getItem('todoList'))
      objectArray.splice(index,1)
      localStorage.setItem('todoList', JSON.stringify(objectArray)) 

      clearDisplay();
      displayList(list);

      trashNotification.textContent = trashItems.length;
      trashNotification.classList = "notification";
    });

    todoTitle.textContent = todo.title;
    todoDiscription.textContent = todo.discription;

    // check for the task completion
    if (todo.completed === false) {
      div.appendChild(todoDiv);

      todoDiv.appendChild(todoButton);
      todoDiv.appendChild(todoContentContainer);
      todoDiv.appendChild(editButton);
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
          dueDate.textContent = `Due on ${todo.dueDate}`;
          dueDate.style.textDecoration = "line-through";
          todoContentContainer.appendChild(dueDate);
        } else {
          const dueDate = document.createElement("p");
          dueDate.classList = "due-date";
          dueDate.textContent = `Due on ${todo.dueDate}`;
          todoContentContainer.appendChild(dueDate);
        }
      }

      if (todo.priority) {
        todoDiv.className = "important todo-item";
        todoButton.classList.add('important-todo-buttn')
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
export { clearDisplay, playSound };
