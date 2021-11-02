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

// Create new todo list after clicking in add-todo button
const addTodoButton = document.getElementById("add-todo");

addTodoButton.addEventListener("click", () => {
  Todos.addEmptyTodoList(addTodoButton);
});
