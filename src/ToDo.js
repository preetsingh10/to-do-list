import {format} from "date-fns";
class ToDo {
  constructor(title, discription) {
    this.title = title;
    this.discription = discription;
    this.completed = false;
  }


  setDueDate(date) {
    this.dateObject = new Date(date);
    
    this.dueDate = format(date,"dd/MM/yyyy")
    this.date = date
    
  }

  setPriority(priority) {
    this.priority = priority;
  }

  setProject(projectName){
    this.project = projectName
  }

  assignProject(projectName){
    this.projectName = projectName
    this.projectTasks = []
  }
}

export default ToDo;
