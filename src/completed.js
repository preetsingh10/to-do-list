import { clearDisplay, playSound } from "./displayToDo";

const div = document.querySelector(".content"); // selecting the content container
const completedNotification = document.querySelector(".completed-notification");
const trashNotification = document.querySelector(".trash-notification");


function completedList(list) {
  if(list === null){
    return 0
  }
  // ITERATING THROUGH ALL THE TODO OBJECTS
  list.forEach((todo,index) => {
    const todoButton = document.createElement("input"); // TO DO CHECK LIST BUTTON
    todoButton.type = "checkbox";
    todoButton.checked = true;
    todoButton.classList.add("todo-button");
    todoButton.addEventListener("click", () => {
      playSound(); // MAKES THE POP SOUND ON CLICK
      todo.completed = false; // After clicking setting the object property to false

      let objectArray = JSON.parse(localStorage.getItem('todoList'))
      objectArray[index].completed = false
      localStorage.setItem('todoList', JSON.stringify(objectArray))
      
      let completedTasks = list.filter((task) => task.completed === true);

      if(completedTasks.length > 0){
        completedNotification.textContent = completedTasks.length;
        completedNotification.classList = "notification";
      }else{
        completedNotification.classList = ' '
        completedNotification.textContent = ''
      }

      clearDisplay(); // Cleaning the display
      completedList(list); // Re render the whole List
      console.log(todo);
    });
    const todoDiv = document.createElement("div");
    todoDiv.classList = "todo-item";

    let alreadyExpanded = false 
    todoDiv.addEventListener('click',()=>{
     
      if(alreadyExpanded === false){
        todoDiscription.style.whiteSpace = 'pre-wrap';
        alreadyExpanded = true
      }else{
        todoDiscription.style.whiteSpace = 'normal';
        alreadyExpanded = false

      }
    })
    const todoContentContainer = document.createElement("div");
    todoContentContainer.classList = "todo-content-container";

    const todoTitle = document.createElement("p");
    todoTitle.classList = "todo-title";

    const todoDiscription = document.createElement("p");
    todoDiscription.classList = "todo-discription";

    todoTitle.textContent = todo.title;
    todoDiscription.textContent = todo.description;

    const deleteTodo = document.createElement("button");
    deleteTodo.classList = "delete-todo";

    deleteTodo.addEventListener("click", () => {
      let trashItems = JSON.parse(localStorage.getItem("trashList"));
      if (trashItems === null) {
        trashItems = [];
      }
      trashItems.push(todo);

      localStorage.setItem("trashList", JSON.stringify(trashItems));
      list.splice(index, 1);

      let objectArray = JSON.parse(localStorage.getItem("todoList"));
      objectArray.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(objectArray));

      clearDisplay();
      completedList(list);

      trashNotification.textContent = trashItems.length;
      trashNotification.classList = "notification";
    });

    if (todo.completed === true) {
      div.appendChild(todoDiv);

      todoDiv.appendChild(todoButton);
      todoDiv.appendChild(todoContentContainer);
      todoDiv.appendChild(deleteTodo);

      todoContentContainer.appendChild(todoTitle);
      todoContentContainer.appendChild(todoDiscription);
    }
  });
}

export { completedList };
