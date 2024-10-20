import { clearDisplay } from "./displayToDo";
import { trashNotification } from "./displayToDo";

let trashItems = JSON.parse(localStorage.getItem("trashList"));

// content DIV
const contentDiv = document.querySelector(".content");

function trashList(list) {
  // ITERATING THROUGH ALL THE TODO OBJECTS
  list.forEach((todo,index) => {
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
    todoTitle.textContent = todo.title;

    const todoDiscription = document.createElement("p");
    todoDiscription.classList = "todo-discription";
    todoDiscription.textContent = todo.description;

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener('click',()=>{
      list.splice(index,1)
      localStorage.setItem('trashList', JSON.stringify(list))
      clearDisplay()
      trashList(list)
      trashNotification.textContent = list.length

      if(list.length === 0){
        trashNotification.textContent = ''
        trashNotification.classList = ''
      }
    })

    contentDiv.appendChild(todoDiv);

    todoDiv.appendChild(todoContentContainer);
    todoContentContainer.appendChild(todoTitle);
    todoContentContainer.appendChild(todoDiscription);
    todoDiv.appendChild(deleteButton)
  });
}

export default trashList;

export { trashItems };
