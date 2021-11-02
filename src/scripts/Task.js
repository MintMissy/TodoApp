class Task {
  constructor(description, completed = false, deadline = null) {
    this.completed = completed;
    this.description = description;
    this.deadline = deadline;
  }

  setComplete = () => (this.completed = true);

  setIncomplete = () => (this.completed = false);

  assignDeadline = (newDeadlineDate) => (this.deadline = newDeadlineDate);
}
