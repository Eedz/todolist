function Todo (title, description) {
    this.title = title;
    this.description = description;
    this.dueDate = Date.now();
    this.priority = 1;
    this.notes = '';
    this.completed = false;
}