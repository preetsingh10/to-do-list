import { clearDisplay } from "./displayToDo";
import displayList from "./displayToDo";
// edit dialog element
const editDialog = document.querySelector(".edit-todo-dialog");
const cancelButton = document.querySelector(".cancel-edit-button");

const dialogForm = document.querySelector(".edit-form");

// edit input elements
const editTitle = document.querySelector("#edit-title");
const editDiscription = document.querySelector("#edit-discription");
const editDate = document.querySelector("#edit-date");
const editPriority = document.querySelector("#edit-priority");

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  editDialog.close();
});


function editTodo(todoObject,list) {
  dialogForm.reset();

  editTitle.value = todoObject.title;
  editDiscription.value = todoObject.discription;
  editDate.value = todoObject.date;
  todoObject.priority
    ? (editPriority.checked = true)
    : (editPriority.checked = false);


  dialogForm.addEventListener("submit", (e)=>{
      e.preventDefault()
      const formData = new FormData(e.target);

      const title = formData.get("edit-title");
      const discription = formData.get("edit-discription");
      const date = formData.get("edit-date");
      const priority = formData.get("edit-priority");
    
      if (title) {
        todoObject.title = title;
        console.log(todoObject);
      }
      // if (discription) {
      //   todo.discription = discription;
      // }
      // if (date) {
      //   todo.setDueDate(date)
      // }
      // if (priority) {
      //   todo.setPriority(priority)
      // }
    
      dialogForm.reset();
      editDialog.close();
      clearDisplay();
      displayList(list);
  })


  ;
}

export default editDialog;
export { editTodo};
