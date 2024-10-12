import ToDo from "./ToDo";
import popSound from './audio/pop.mp3'
const popAudio = new Audio(popSound)

// sample to do objects

const todo1 = new ToDo("first task", "i am task 1");
const todo2 = new ToDo("second task", "i am task 2");

const todoList = [todo1, todo2,todo1, todo2,todo1, todo2,todo1,
     todo2, todo2,todo1, todo2,todo1, todo2,todo1, todo2,todo1,];

// selecting the content container
const div = document.querySelector(".content");
todoList.forEach((todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList = "todo-item";

  const todoButton = document.createElement("input");
  todoButton.type = "radio";
  todoButton.classList = "todo-button";
  todoButton.addEventListener('click',()=>{
    popAudio.play()
  })

const todoContentContainer = document.createElement('div')
todoContentContainer.classList = 'todo-content-container'

  const todoTitle = document.createElement("p");
  todoTitle.textContent = todo.title;
  todoTitle.classList = 'todo-title'

  const todoDiscription = document.createElement("p");
  todoDiscription.textContent = todo.description;
  todoDiscription.classList = 'todo-discription'

  div.appendChild(todoDiv);

  todoDiv.appendChild(todoButton);
  todoDiv.appendChild(todoContentContainer)
  
  todoContentContainer.appendChild(todoTitle);
  todoContentContainer.appendChild(todoDiscription);
});

export default div;
