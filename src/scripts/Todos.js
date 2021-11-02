class Todos {
  static todosContainer = document.querySelector(".todos-container");
  static todosList = [];

  static addEmptyTodoList(elementBeforeInsert) {
    // Add element to page
    elementBeforeInsert.insertAdjacentHTML(
      "beforebegin",
      TodoList.todoListTemplate
    );

    // Create TodoList instance and add it to todosList
    let elementsWithTodoClass = document.querySelectorAll(".todo-list");
    this.todosList.push(
      new TodoList(elementsWithTodoClass[elementsWithTodoClass.length - 2])
    );
  }
}
