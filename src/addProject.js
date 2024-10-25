import { add } from "date-fns";

const addProjectDialog = document.querySelector(".add-project-dialog");

const projectName = document.querySelector("#name");
const cancelButton = document.querySelector(".cancel-project-button");
const addButton = document.querySelector(".add-project-button");
const confirmDelete = document.querySelector(".confirm-delete-dialog");
const cancelConfirmButton = document.querySelector(".cancel-confirm-button");
const deleteConfirmButton = document.querySelector(".delete-confirm-button");

function updateProjectDisplay() {
  let projectList = JSON.parse(localStorage.getItem("projectList"));
  if(projectList === null){
    projectList = []
    localStorage.setItem('projectList',JSON.stringify(projectList))
  }
    
  const projectListContainer = document.querySelector(
    ".project-list-container"
  );      
  projectListContainer.innerHTML = " "
  generateProjectListDom(projectList)

}

function generateProjectListDom(projectList){
    const projectListContainer = document.querySelector(
        ".project-list-container"
      );

    if (projectList !== null) {
        projectList.forEach((project,index) => {
          const projectDisplay = document.createElement("li");
          projectDisplay.textContent = project;
          projectDisplay.classList.add("project-display");
    
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

// const deleteProjectButtons = document.querySelectorAll('.delete-project-button')
// if(deleteProjectButtons !== null){
//     deleteProjectButtons.forEach((button,index)=>{
//         button.addEventListener('click',()=>{
//             confirmDelete.showModal()

//             // will close the confirm dialog
//             cancelConfirmButton.addEventListener('click',()=>{
//                 confirmDelete.close()
//             })

//             // will delete the project and its contents completely
//             deleteConfirmButton.addEventListener('click',()=>{
//                 let projectList = JSON.parse(localStorage.getItem('projectList'))
//                 projectList.splice(index,1)
//                 localStorage.setItem('projectList',JSON.stringify(projectList))
//                 updateProjectDisplay()
//             })

//         })
//     })
// }

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (projectName !== null) {
    let projectList = JSON.parse(localStorage.getItem("projectList"));
    projectList.push(projectName.value);
    localStorage.setItem("projectList", JSON.stringify(projectList));
    updateProjectDisplay();
  }
  projectName.value = "";
  addProjectDialog.close();
});

cancelButton.addEventListener("click", () => {
  addProjectDialog.close();
});

export { addProjectDialog, updateProjectDisplay };
