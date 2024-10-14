class ToDo {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.completed = false;
  }


  setDueDate(date) {
    const dateObject = new Date(date);
    this.dueDate = dateObject.toDateString()
    
  }

  setPriority(priority) {
    this.priority = priority;
  }
}

export default ToDo;
