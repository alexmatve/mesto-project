import '../pages/index.css';
import { initialCards } from './cards';'./cards.js'; 

console.log('JS работает');

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");
const buttonCard = document.querySelector(".card__image");

// Отображение карт
function createCard(name, link, alt) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = alt;
  cardElement.querySelector(".card__title").textContent = name;

  // реализация кнопки "Лайк"
  const buttonLike = cardElement.querySelector(".card__like-button");
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_is-active");
    });

  // реализация кнопки "Удалить"
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", function () {
    cardElement.remove();
  });

  //Открытие модального окна
  function showImagePopup() {
    openModal(imagePopup);
    const buttonClose = imagePopup.querySelector(".popup__close");
    buttonClose.addEventListener("click", () => closeModal(imagePopup));
    closePopupOverlay(imagePopup);

    imagePopup.querySelector(".popup__image").src = link;
    imagePopup.querySelector(".popup__image").alt = alt;
    imagePopup.querySelector(".popup__caption").textContent = name;
  }

  const buttonImage = cardElement.querySelector(".card__image");
  buttonImage.addEventListener("click", showImagePopup);

  return cardElement;
}

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

initialCards.forEach((card) => {
  const addedCard = createCard(card.name, card.link, "photo");
  cardList.append(addedCard);
});

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', closeByEsc);
};

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closeByEsc);
};

// Редактирование профиля
function editProfile() {
  openModal(profilePopup);
  const buttonClose = profilePopup.querySelector(".popup__close");
  buttonClose.addEventListener("click", () => closeModal(profilePopup));
  closePopupOverlay(profilePopup);

  const profileFormElement = profilePopup.querySelector(".popup__form");
  const nameInput = profilePopup.querySelector(".popup__input_type_name");
  const jobInput = profilePopup.querySelector(".popup__input_type_description");

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
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
  const buttonClose = cardPopup.querySelector(".popup__close");
  buttonClose.addEventListener("click", () => closeModal(cardPopup));
  closePopupOverlay(cardPopup);

  const cardFormElement = cardPopup.querySelector(".popup__form");
  const nameCardInput = cardPopup.querySelector(".popup__input_type_card-name");
  const ulrInput = cardPopup.querySelector(".popup__input_type_url");

  function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameCardInput.value;
    const urlValue = ulrInput.value;

    newCard = createCard(nameValue, urlValue, "photo");
    cardList.prepend(newCard);

    closeModal(cardPopup);
  }

  cardFormElement.addEventListener("submit", handleCardFormSubmit);
}

const showInputError = (form, inputElement, errorMessage) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (form, inputElement) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
};

const checkInputValidity = (form, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.classList.remove('popup__button_inactive');
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(form, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(form)
  })
};

const closePopupOverlay = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    };
  });
};

function closeByEsc(evt) { 
  if (evt.key === 'Escape') { 
    const openedPopup = document.querySelector('.popup_is-opened'); 
    closeModal(openedPopup); 
  }; 
};


buttonNewCard.addEventListener("click", newCard);
enableValidation();
