class TodoList {
  static todoListTemplate = `
    <div class="todo-list">
      <input class="todo-list__title"placeholder="Todo Title"></input>
      <div class="add-card button button--big">
        <span class="inline-icon  material-icons">add</span>
        Add Card
      </div>
    </div>`;

  constructor(element) {
    this.element = element;
    this.todoCards = [];
    this.title = "";
    this.titleInput = element.querySelector(".todo-list__title");
    this.addCardButton = element.querySelector(".add-card");

    this.titleInput.focus();

    this.addCardButton.addEventListener("click", () => {
      this.addEmptyCard();
    });
  }

  addEmptyCard() {
    this.addCardButton.insertAdjacentHTML(
      "beforebegin",
      TodoCard.todoCardTemplate
    );

    // Create TodoList instance and add it to todosList
    let elementsWithCardClass = this.element.querySelectorAll(".c-todo-card");
    this.todoCards.push(
      new TodoCard(
        elementsWithCardClass[elementsWithCardClass.length - 1],
        this
      )
    );
  }

  removeCard(cardIndex) {
    this.todoCards[cardIndex].element.remove();
    this.todoCards.splice(cardIndex, 1);
  }

  saveCardChanges() {}
}
