import popSound from "./audio/pop.mp3";
import { format } from "date-fns";
import { clearDisplay } from "./displayToDo";

const div = document.querySelector(".content"); // selecting the content container
const projectListContainer = document.querySelector("project-list-container");

// content DIV
const contentDiv = document.querySelector(".content");

// notificaiton element
const trashNotification = document.querySelector(".trash-notification");
const completedNotification = document.querySelector(".completed-notification");
const todayNotifaction = document.querySelector(".today-notificaiton");
const upcomingNotification = document.querySelector('.upcoming-notification')

// function to play sound on completion
function playSound() {
  const popAudio = new Audio(popSound);
  popAudio.play();
}

function updateUpcomingNotification(list) {
  if(list === null){
    return null
  }
  upcomingNotification.textContent = list.filter(todo=>{
            let today = new Date()
            let todoDate = new Date(todo.date)
            return todoDate.getTime() > today.getTime() && todo.completed === false
  }).length;
  upcomingNotification.classList.add('notification')
  upcomingNotification.style.backgroundColor = 'green'

  if (upcomingNotification.textContent == 0) {
    upcomingNotification.textContent = "";
    upcomingNotification.classList = "";
  }
}

let isEditOpen = false;

function upcomingList(list) {
  // ITERATING THROUGH ALL THE TODO OBJECTS
  if(list === null){
    return 0
  }
  list.forEach((todo, index) => {
    const todoButton = document.createElement("input"); // TO DO CHECK LIST BUTTON
    todoButton.type = "checkbox";
    todoButton.classList = "todo-button";

    todoButton.addEventListener("click", () => {
      playSound(); // MAKES THE POP SOUND ON CLICK
      todo.completed = true; // After clicking setting the object property to true

      let objectArray = JSON.parse(localStorage.getItem("todoList"));
      objectArray[index].completed = true;
      localStorage.setItem("todoList", JSON.stringify(objectArray));

      let completedTasks = list.filter((task) => task.completed === true);
      completedNotification.textContent = completedTasks.length;
      completedNotification.classList.add("notification");

      updateUpcomingNotification(list)

      clearDisplay(); // Cleaning the display
      upcomingList(list); // Re render the whole List
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
      todoDiv.removeChild(editButton);

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = todo.title;
      titleInput.id = "title";

      const discriptionInput = document.createElement("textarea");
      discriptionInput.rows = 5;
      discriptionInput.cols = 10;
      if (todo.discription === "") {
        discriptionInput.placeholder = "Discription..";
      } else {
        discriptionInput.value = todo.discription;
      }
      discriptionInput.id = "discription";

      const dateInput = document.createElement("input");
      dateInput.type = "date";
      dateInput.id = "date";
      dateInput.style.width = "fit-content";

      if (!todo.date) {
        todoContentContainer.appendChild(dateInput);
      }

      const dueDates = document.querySelectorAll(".due-date");
      console.log(dueDates);
      let removedChild;
      dueDates.forEach((dueDate) => {
        if (dueDate.dataset.index == index) {
          removedChild = dueDate;

          dateInput.value = todo.date;
          todoContentContainer.removeChild(dueDate);
          todoContentContainer.appendChild(dateInput);
        }
      });

      const priorityDiv = document.createElement("div");
      priorityDiv.style.display = "flex";
      priorityDiv.style.gap = "10px";

      const priorityLabel = document.createElement("p");
      priorityLabel.textContent = "Make it a priority: ";
      const priorityButton = document.createElement("input");
      priorityButton.type = "checkbox";
      priorityButton.style.width = "15px";

      if (todo.priority === true) {
        priorityButton.checked = true;
      }

      console.log(todo.priority);

      todoContentContainer.replaceChild(titleInput, todoTitle);
      todoContentContainer.replaceChild(discriptionInput, todoDiscription);
      todoContentContainer.appendChild(priorityDiv);
      priorityDiv.appendChild(priorityLabel);
      priorityDiv.appendChild(priorityButton);
      titleInput.focus();

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save Changes";
      saveButton.classList.add("addTask-button");
      saveButton.style.alignSelf = "flex-end";
      saveButton.style.marginLeft = "auto";

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.classList.add("cancel-button");
      cancelButton.style.alignSelf = "flex-end";

      cancelButton.addEventListener("click", () => {
        todoDiv.appendChild(editButton);
        todoDiv.append(deleteTodo);
        todoDiv.removeChild(saveButton);
        todoDiv.removeChild(cancelButton);
        todoContentContainer.replaceChild(todoTitle, titleInput);
        todoContentContainer.replaceChild(todoDiscription, discriptionInput);
        todoContentContainer.removeChild(dateInput);
        clearDisplay();
        upcomingList(list);
      });

      todoDiv.appendChild(saveButton);
      todoDiv.appendChild(cancelButton);
      todoDiv.removeChild(deleteTodo);

      saveButton.addEventListener("click", () => {
        todo.title = titleInput.value;
        todo.discription = discriptionInput.value;
        if (dateInput.value) {
          todo.dueDate = format(dateInput.value, "dd/MM/yyyy");
          todo.date = dateInput.value;
        }
        if (priorityButton.checked === true) {
          todo.priority = true;
        } else {
          todo.priority = false;
        }
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList[index].title = titleInput.value;
        todoList[index].discription = discriptionInput.value;
        if (dateInput.value) {
          todoList[index].dueDate = format(dateInput.value, "dd/MM/yyyy");
          todoList[index].date = dateInput.value;
        }

        if (priorityButton.checked === true) {
          todoList[index].priority = true;
        } else {
          todoList[index].priority = false;
        }
        localStorage.setItem("todoList", JSON.stringify(todoList));

        todoContentContainer.replaceChild(todoTitle, titleInput);
        todoContentContainer.replaceChild(todoDiscription, discriptionInput);
        todoDiv.replaceChild(editButton, saveButton);
        updateUpcomingNotification(list)
        clearDisplay();
        upcomingList(list);
      });
    });

    const deleteTodo = document.createElement("button");
    deleteTodo.classList = "delete-todo";

    deleteTodo.addEventListener("click", () => {
      let trashItems = JSON.parse(localStorage.getItem("trashList"));
      trashItems.push(todo);

      localStorage.setItem("trashList", JSON.stringify(trashItems));
      list.splice(index, 1);

      let objectArray = JSON.parse(localStorage.getItem("todoList"));
      objectArray.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(objectArray));

      updateUpcomingNotification(list)

      clearDisplay();
      upcomingList(list);

      upcomingNotification.classList = "notification";
    });

    todoTitle.textContent = todo.title;
    todoDiscription.textContent = todo.discription;

    // check for the task completion

    // today date logic
    const today = new Date();
    const todoDate = new Date(todo.date)

    if (todoDate.getTime()> today.getTime() && todo.completed === false) {
      div.appendChild(todoDiv);

      todoDiv.appendChild(todoButton);
      todoDiv.appendChild(todoContentContainer);
      todoDiv.appendChild(editButton);
      todoDiv.appendChild(deleteTodo);

      todoContentContainer.appendChild(todoTitle);
      todoContentContainer.appendChild(todoDiscription);

      if (todo.dueDate) {
        // check for the due date input
        let today = new Date();
        if (todo.dateObject < today) {
          // check if it was in past then add line-through
          const dueDate = document.createElement("p");
          dueDate.classList = "due-date";
          dueDate.dataset.index = index;
          dueDate.textContent = `Due on ${todo.dueDate}`;
          dueDate.style.textDecoration = "line-through";
          todoContentContainer.appendChild(dueDate);
        } else {
          const dueDate = document.createElement("p");
          dueDate.classList = "due-date";
          dueDate.dataset.index = index;
          dueDate.textContent = `Due on ${todo.dueDate}`;
          todoContentContainer.appendChild(dueDate);
        }
      }

      if (todo.priority) {
        todoDiv.className = "important todo-item";
        todoButton.classList.add("important-todo-buttn");
      }

      //   if(todo.project){

      //     const project = document.createElement("li")
      //     project.textContent = `${todo.project}`
      //     projectListContainer.appendChild(project)

      //   }
    }
  });
}

export default upcomingList;
export {updateUpcomingNotification}