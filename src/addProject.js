import { add } from "date-fns";
import ToDo from "./ToDo";
import { dialog } from "./addTodoDialog";

const addProjectDialog = document.querySelector(".add-project-dialog");

const projectName = document.querySelector("#name");
const cancelButton = document.querySelector(".cancel-project-button");
const addButton = document.querySelector(".add-project-button");
const confirmDelete = document.querySelector(".confirm-delete-dialog");
const cancelConfirmButton = document.querySelector(".cancel-confirm-button");
const deleteConfirmButton = document.querySelector(".delete-confirm-button");

const contentHeading = document.querySelector(".content-heading");
const contentButtonContainer = document.querySelector('.add-task-button-container')
const contentHeadingContainer = document.querySelector(
  ".content-heading-container"
);
const projectListContainer = document.querySelector(
    ".project-list-container"
  );
  const projectDropdown = document.getElementById('project-dropdown')


function updateProjectDisplay() {
  let projectList = JSON.parse(localStorage.getItem("projectList"));
  if (projectList === null) {
    projectList = [];
    localStorage.setItem("projectList", JSON.stringify(projectList));
  }

  projectListContainer.innerHTML = " ";
  projectDropdown.innerHTML = ' '
  generateProjectListDom(projectList);
  updateProjectDropdown(projectList)
}

function updateProjectDropdown(projectList){

   
    
    projectList.forEach(project=>{
        const projectOption = document.createElement('option') 
        projectOption.textContent = project.projectName
        projectDropdown.appendChild(projectOption)
    })   
}

function generateProjectListDom(projectList) {
  const projectListContainer = document.querySelector(
    ".project-list-container"
  );

  if (projectList !== null) {
    projectList.forEach((project, index) => {
      const projectDisplay = document.createElement("li");
      projectDisplay.textContent = project.projectName;
      projectDisplay.classList.add("project-display");

      projectDisplay.addEventListener("click", () => {

        const addTaskButton = document.createElement("button");
        addTaskButton.classList.add("add-task-button");
        addTaskButton.classList.add("edit-button")
        addTaskButton.textContent = "Add Task";

        
        addTaskButton.addEventListener('click',()=>{
            dialog.showModal()
        })
        contentHeading.textContent = `Project: ${project.projectName}`;
        contentButtonContainer.innerHTML = '' // to remove perivious buttons
        contentButtonContainer.appendChild(addTaskButton);
      });

      const deleteProjectButton = document.createElement("button");
      deleteProjectButton.classList.add("delete-project-button");
      projectListContainer.appendChild(projectDisplay);
      projectDisplay.appendChild(deleteProjectButton);

      deleteProjectButton.addEventListener("click", () => {
        confirmDelete.showModal();

        // will close the confirm dialog
        cancelConfirmButton.addEventListener("click", () => {
          confirmDelete.close();
        });

        // will delete the project and its contents completely
        deleteConfirmButton.addEventListener("click", () => {
          projectList.splice(index, 1);
          localStorage.setItem("projectList", JSON.stringify(projectList));
          confirmDelete.close();
          updateProjectDisplay();
        });
      });
    });
  }
}

// event listeners

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (projectName !== null) {
    let projectList = JSON.parse(localStorage.getItem("projectList"));
    let todoObject = new ToDo();
    todoObject.assignProject(projectName.value);
    projectList.push(todoObject);
    localStorage.setItem("projectList", JSON.stringify(projectList));
    updateProjectDisplay();
  }
  projectName.value = "";
  addProjectDialog.close();
});

cancelButton.addEventListener("click", () => {
  addProjectDialog.close();
});

export { addProjectDialog, updateProjectDisplay, updateProjectDropdown };
