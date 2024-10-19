import ToDo from "./ToDo";

let todoList = [];

// sample to do objects

let todo1 = new ToDo("Go to the gym 💪", "Do legs don't skip it");
let todo2 = new ToDo("Make breakfast 🥗", "Scramble eggs and oatmeal");
let todo3 = new ToDo(
  "Grossary",
  `    1. eggs
    2. oats 
    3. coffee-beans
    4. rice
  `
);
todo1.setDueDate("2024-9-10");
todo2.setDueDate("2024-12-11");
todo3.setDueDate("2024-12-12");
todo1.setPriority(true);
todo1.setProject("Home");

todoList.push(todo1, todo2, todo3);

localStorage.setItem("todoList", JSON.stringify(todoList));
export {todoList}