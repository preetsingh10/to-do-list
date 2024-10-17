class ToDo {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.completed = false;
  }


  setDueDate(date) {
    this.dateObject = new Date(date);
    this.dueDate = this.dateObject.toDateString()
    
  }

  setPriority(priority) {
    this.priority = priority;
  }

  setProject(projectName){
    this.project = projectName
  }
}

export default ToDo;
