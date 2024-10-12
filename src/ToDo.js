class ToDo{
    constructor(title,description){
        this.title = title;
        this.description = description
    };

    
     setDueDate(date) {
        this.dueDate = date;
    }

    setPriority(priority){
        this.priority = priority;
    }
}

export default ToDo