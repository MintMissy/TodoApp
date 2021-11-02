class OpenedCard {
  static openedCardContainer = document.querySelector(".l-edited-card");
  static cardInput;
  static titleInput = document.getElementById("c-edited-card__input-title");
  static descriptionInput = document.getElementById(
    "c-edited-card__input-description"
  );
  static cardIconInput = document.getElementById("c-edited-card__input-icon");
  static iconsDropdown = document.getElementById("c-icons-dropdown");
  static pickableIconsContainer = document.getElementById("c-icons_to_pick");
  static taskList;
  static tasksInputs = [];

  static currentCardElement;
  static currentCardObject;
  static changedCardData;

  static navMenusEls = document.getElementById("edited-card__pickable-menus")
    .children;
  static currentNavMenu = OpenedCard.navMenusEls[0];
  static currentNavMenuIndex = 0;

  static currentCardLocations = {
    parentTodoInTodos: undefined,
    cardInTodo: undefined,
  };

  static openCard(card) {
    OpenedCard.currentCardElement = card;
    OpenedCard.localizeCardInApp();
    OpenedCard.setCardDataObjects();
    OpenedCard.loadCardData(this.currentCardObject.data);
    OpenedCard.openedCardContainer.style.display = "block";

    OpenedCard.currentNavMenuIndex = 0;
    OpenedCard.openNavMenu(OpenedCard.currentNavMenuIndex);
  }

  static closeCard() {
    OpenedCard.openedCardContainer.style.display = "none";
    OpenedCard.unloadCardData();

    OpenedCard.currentNavMenu.style.display = "none";
    OpenedCard.currentNavMenuIndex = 0;
    OpenedCard.currentNavMenu = OpenedCard.navMenusEls[0];
  }

  static setCardDataObjects() {
    OpenedCard.currentCardObject =
      Todos.todosList[
        OpenedCard.currentCardLocations.parentTodoInTodos
      ].todoCards[OpenedCard.currentCardLocations.cardInTodo];

    this.changedCardData = JSON.parse(
      JSON.stringify(this.currentCardObject.data)
    );
  }

  static localizeCardInApp() {
    OpenedCard.currentCardLocations.parentTodoInTodos = Todos.todosList.indexOf(
      OpenedCard.currentCardElement.parentTodo
    );
    OpenedCard.currentCardLocations.cardInTodo = Todos.todosList[
      this.currentCardLocations.parentTodoInTodos
    ].todoCards.indexOf(OpenedCard.currentCardElement);
  }

  static saveChanges() {
    OpenedCard.closeCard();

    // Save card data
    OpenedCard.currentCardObject.data = JSON.parse(
      JSON.stringify(OpenedCard.changedCardData)
    );
    OpenedCard.currentCardObject.reloadCard();
  }

  static removeCurrentCard() {
    // Remove card from todo list
    Todos.todosList[
      OpenedCard.currentCardLocations.parentTodoInTodos
    ].removeCard(OpenedCard.currentCardLocations.cardInTodo);

    OpenedCard.closeCard();
  }

  static loadCardData(cardData) {
    OpenedCard.loadCardTitle(cardData.title);
    OpenedCard.loadCardDescription(cardData.description);
    OpenedCard.loadCardIcon(cardData.iconName);
  }

  static unloadCardData() {
    OpenedCard.titleInput.value = "";
    OpenedCard.descriptionInput.value = "";
  }

  static loadCardIcon(icon) {
    if (icon === "") {
      OpenedCard.cardIconInput.innerText = "add";
    } else {
      OpenedCard.cardIconInput.innerText = icon;
    }
  }

  static loadCardTitle(title) {
    OpenedCard.titleInput.value = title;
  }

  static loadCardLabels() {}

  static loadCardMembers() {}

  static loadCardDescription(description) {
    OpenedCard.descriptionInput.value = description;
  }

  static loadCardTaskList() {}

  static toggleIconDropdown() {
    if (OpenedCard.iconsDropdown.style.display == "block") {
      OpenedCard.iconsDropdown.style.display = "none";
    } else {
      OpenedCard.iconsDropdown.style.display = "block";
    }
  }

  static registerListeners() {
    OpenedCard.titleInput.addEventListener("keyup", () => {
      OpenedCard.changedCardData.title = OpenedCard.titleInput.value;
    });

    OpenedCard.descriptionInput.addEventListener("keyup", () => {
      OpenedCard.changedCardData.description =
        OpenedCard.descriptionInput.value;
    });
  }

  static setNewCardIcon(newIconName) {
    OpenedCard.cardIconInput.innerText = newIconName;
    OpenedCard.changedCardData.iconName = newIconName;

    if (newIconName === "") {
      OpenedCard.cardIconInput.innerText = "add";
    }
  }

  static openNavMenu(menuIndex) {
    OpenedCard.navMenusEls[OpenedCard.currentNavMenuIndex].style.display =
      "none";
    OpenedCard.currentNavMenu = OpenedCard.navMenusEls[menuIndex];
    OpenedCard.currentNavMenu.style.display = "block";
    this.currentNavMenuIndex = menuIndex;
  }

  static registerNavMenuOnClicks() {
    const navMenusButtons = document.querySelectorAll(
      ".c-edited-card__navbar__item"
    );
    for (let i = 0; i < navMenusButtons.length; i++) {
      let navMenuBtn = navMenusButtons[i];
      navMenuBtn.addEventListener("click", () => {
        OpenedCard.openNavMenu(i);
      });
    }
  }

  static registerIconsOnClicks() {
    const availableIcons = document.getElementById("c-icons-to-pick");

    for (const icon of availableIcons.children) {
      // Register remove icon listener
      if (icon.innerText === "close") {
        availableIcons.children[0].addEventListener("click", () => {
          OpenedCard.setNewCardIcon("");
          OpenedCard.toggleIconDropdown();
        });
        continue;
      }

      // Register icons on click beside first
      icon.addEventListener("click", () => {
        OpenedCard.setNewCardIcon(icon.innerText);
        OpenedCard.toggleIconDropdown();
      });
    }
  }
}

OpenedCard.registerListeners();
OpenedCard.registerIconsOnClicks();
OpenedCard.registerNavMenuOnClicks();

const darkenBackground = document.querySelector(".darken-background");
darkenBackground.addEventListener("click", OpenedCard.closeCard);

const closeOpenedCardButton = document.getElementById(
  "c-edited-card__close-card"
);
closeOpenedCardButton.addEventListener("click", OpenedCard.closeCard);

const saveCardChangesButton = document.getElementById("save-card-changes");
saveCardChangesButton.addEventListener("click", OpenedCard.saveChanges);

const cancelCardEditingButton = document.getElementById("cancel-card-editing");
cancelCardEditingButton.addEventListener("click", OpenedCard.closeCard);

const removeCardButton = document.getElementById("c-edited-card__remove-card");
removeCardButton.addEventListener("click", OpenedCard.removeCurrentCard);

const openedCardIcon = document.getElementById("c-edited-card__input-icon");
openedCardIcon.addEventListener("click", OpenedCard.toggleIconDropdown);

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

// Create new todo list after clicking in add-todo button
const addTodoButton = document.getElementById("add-todo");

addTodoButton.addEventListener("click", () => {
  Todos.addEmptyTodoList(addTodoButton);
});

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

class LabelsList {
  static labelTemplate = "";

  constructor(labels = []) {
    this.labels = labels;
  }

  addLabel = (label) => this.labels.append(label);

  removeLabel = (labelIndex) => this.labels.splice(labelIndex, labelIndex);
}

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

class CardInfoIcons {
  static description = `<span class="c-card-info-icons__icon material-icons">subject</span>`;
  static todo = `<span class="c-card-info-icons__icon material-icons">done</span>`;
  static schedule = `<span class="c-card-info-icons__icon material-icons">schedule</span>`;
}
