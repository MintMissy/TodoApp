class TodoCard {
  static todoCardTemplate = `
    <div class="c-todo-card todo-card-box">
      <div class="c-todo-card__labels"></div>
      <div class="c-todo-card__content">
        <span class="material-icons c-card-content__icon"></span>
        <h1 class="c-card-content__title">
          <input type="text" class="c-card-content__title-input">
        </h1>
      </div>
      <div class="c-todo-card__footer">
        <div class="c-card-info-icons"></div>
        <div class="c-card-members"></div>
      </div>
    </div>`;

  constructor(element, parentTodo) {
    this.parentTodo = parentTodo;
    this.element = element;
    this.titleInput = element.querySelector(".c-card-content__title-input");
    this.cardTitleElement = this.element.querySelector(
      ".c-card-content__title"
    );
    this.cardIconElement = this.element.querySelector(".c-card-content__icon");
    this.infoIconsElement = this.element.querySelector(".c-card-info-icons");

    this.data = {
      iconName: "",
      title: "",
      labels: [],
      scheduledDate: "",
      members: [],
      description: "",
      taskList: new TaskList(),
    };

    this.titleInput.focus();

    this.titleInput.addEventListener("focusout", () => {
      this.onTitleInputFocusout();
    });

    // If user press enter or esc focus out element
    this.titleInput.addEventListener("keyup", (event) => {
      event.preventDefault();

      if (event.keyCode === 13 || event.keyCode === 27) {
        this.titleInput.blur();
      }
    });
  }

  onTitleInputFocusout() {
    // If input is empty remove card
    if (this.titleInput.value === "" || this.titleInput.value == undefined) {
      let cardIndexInTodo = this.parentTodo.todoCards.indexOf(this);
      this.parentTodo.removeCard(cardIndexInTodo);
    }

    // Save title in data and set card title
    this.data.title = this.titleInput.value;
    this.cardTitleElement.innerText = this.titleInput.value;

    // Remove title input element
    this.titleInput.remove();

    this.element.addEventListener("click", () => {
      OpenedCard.openCard(this);
    });
  }

  reloadCard() {
    this.cardTitleElement.innerText = this.data.title;
    this.reloadCardIcon();
    this.reloadCardInfoIcons();
  }

  reloadCardIcon() {
    this.cardIconElement.innerText = this.data.iconName;
  }

  reloadCardInfoIcons() {
    this.infoIconsElement.innerHTML = "";

    if (this.data.description != "") {
      this.infoIconsElement.insertAdjacentHTML(
        "afterbegin",
        CardInfoIcons.description
      );
    }
  }

  changeCardIcon() {}

  addCardMember() {}

  removeCardMember() {}
}
