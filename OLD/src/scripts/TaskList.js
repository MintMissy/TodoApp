class TaskList {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  getCompletedTasksRatio() {
    let completedTasks = this.tasks.reduce((accumulator, current) => {
      return accumulator + current ? 1 : 0;
    });

    return `${completedTasks}/${this.tasks.length}`;
  }

  addTask(task) {
    this.tasks.append(task);
  }

  removeTask(taskIndex) {
    this.tasks.splice(taskIndex, taskIndex);
  }
}
