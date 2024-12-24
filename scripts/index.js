profilePopup = document.querySelector(".popup_type_edit");
cardPopup = document.querySelector(".popup_type_new-card");
imagePopup = document.querySelector(".popup_type_image");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

buttonProfileEdit = document.querySelector(".profile__edit-button");
buttonNewCard = document.querySelector(".profile__add-button");
buttonCard = document.querySelector(".card__image");

// Отображение карт
function createCard(name, link, alt) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = alt;
  cardElement.querySelector(".card__title").textContent = name;

  // реализация кнопки "Лайк"
  buttonLike = cardElement.querySelector(".card__like-button");
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_is-active");
    });

  // реализация кнопки "Удалить"
  buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", function () {
    cardElement.remove();
  });

  //Открытие модального окна
  function showImagePopup() {
    openModal(imagePopup);
    buttonClose = imagePopup.querySelector(".popup__close");
    buttonClose.addEventListener("click", () => closeModal(imagePopup));

    imagePopup.querySelector(".popup__image").src = link;
    imagePopup.querySelector(".popup__image").alt = alt;
    imagePopup.querySelector(".popup__caption").textContent = name;
  }

  buttonImage = cardElement.querySelector(".card__image");
  buttonImage.addEventListener("click", showImagePopup);

  return cardElement;
}

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

initialCards.forEach((card) => {
  addedCard = createCard(card.name, card.link, "photo");
  cardList.append(addedCard);
});

function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

// Редактирование профиля
function editProfile() {
  openModal(profilePopup);
  buttonClose = profilePopup.querySelector(".popup__close");
  buttonClose.addEventListener("click", () => closeModal(profilePopup));

  const profileFormElement = profilePopup.querySelector(".popup__form");
  nameInput = profilePopup.querySelector(".popup__input_type_name");
  jobInput = profilePopup.querySelector(".popup__input_type_description");

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameValue = nameInput.value;
    jobValue = jobInput.value;
    document.querySelector(".profile__title").textContent = nameValue;
    document.querySelector(".profile__description").textContent = jobValue;

    closeModal(profilePopup);
  }

  profileFormElement.addEventListener("submit", handleProfileFormSubmit);
}

buttonProfileEdit.addEventListener("click", editProfile);

// Добавление новых карт
function newCard() {
  openModal(cardPopup);
  buttonClose = cardPopup.querySelector(".popup__close");
  buttonClose.addEventListener("click", () => closeModal(cardPopup));

  const cardFormElement = cardPopup.querySelector(".popup__form");
  nameCardInput = cardPopup.querySelector(".popup__input_type_card-name");
  ulrInput = cardPopup.querySelector(".popup__input_type_url");

  function handleCardFormSubmit(evt) {
    evt.preventDefault();
    nameValue = nameCardInput.value;
    urlValue = ulrInput.value;

    newCard = createCard(nameValue, urlValue, "photo");
    console.log(newCard);
    cardList.prepend(newCard);

    closeModal(profilePopup);
  }

  cardFormElement.addEventListener("submit", handleCardFormSubmit);
}

buttonNewCard.addEventListener("click", newCard);
