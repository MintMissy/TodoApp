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
