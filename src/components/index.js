import '../pages/index.css';
// import { initialCards } from './cards.js';
import { enableValidation } from './validate.js';
import { ProfileInfoRequest, InitialCardsRequest, EditProfileRequest, AddNewCardRequest, DeleteCardRequest, AddLikeRequest, RemoveLikeRequest, UpdateAvatar } from './api.js';

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");
avatarPopup.classList.add("popup_is-animated");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");
const buttonCard = document.querySelector(".card__image");
const buttonAvatar = document.querySelector(".profile__image-place");

// Отображение карт
function createCard(name, link, alt, like_counter = 0, id = null) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = alt;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__like-counter").textContent = like_counter;

  // реализация кнопки "Лайк"
  const buttonLike = cardElement.querySelector(".card__like-button");

  if (id !== null) {
    buttonLike.addEventListener("click", () => {
      buttonLike.classList.toggle("card__like-button_is-active");
      if (buttonLike.classList.contains("card__like-button_is-active")) {
        const DataAddLike = AddLikeRequest(id);
        DataAddLike.then((res) => {
          cardElement.querySelector(".card__like-counter").textContent = res.likes.length;
        })
          .catch((err) => {
            console.log(`Ошибка: ${err}`)
          });
      } else {
        const DataRemoveLike = RemoveLikeRequest(id);
        DataRemoveLike.then((res) => {
          cardElement.querySelector(".card__like-counter").textContent = res.likes.length;
        })
          .catch((err) => {
            console.log(`Ошибка: ${err}`)
          });
      }
    });
  }


  // реализация кнопки "Удалить"
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  if (id !== null) {
    buttonDelete.addEventListener("click", function () {
      DeleteCardRequest(id);
      cardElement.remove();
    });
  }

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

// initialCards.forEach((card) => {
//   const addedCard = createCard(card.name, card.link, "photo");
//   cardList.append(addedCard);
// });

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
    renderLoading(true, profileFormElement.querySelector(".popup__button"));
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const personalDataToEdit = EditProfileRequest(nameValue, jobValue);
    personalDataToEdit.then((res) => {
      
      document.querySelector(".profile__title").textContent = res.name;
      document.querySelector(".profile__description").textContent = res.about;
    })
      .then(() => closeModal(profilePopup))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        renderLoading(false, profileFormElement.querySelector(".popup__button"))
        nameInput.value = '';
        jobInput.value = '';
      });

    
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
    renderLoading(true, cardFormElement.querySelector(".popup__button"));
    const nameValue = nameCardInput.value;
    const urlValue = ulrInput.value;
    const NewCardData = AddNewCardRequest(nameValue, urlValue);
    NewCardData.then((res) => {

      newCard = createCard(nameValue, urlValue, "photo");
      cardList.prepend(newCard);

      const deleteButton = newCard.querySelector('.card__delete-button');

      deleteButton.addEventListener('click', () => {
        DeleteCardRequest(res._id);
        newCard.remove();
      });

      const buttonLike = newCard.querySelector('.card__like-button');

      buttonLike.addEventListener("click", () => {
        buttonLike.classList.toggle("card__like-button_is-active");
        if (buttonLike.classList.contains("card__like-button_is-active")) {
          const DataAddLike = AddLikeRequest(res._id);
          DataAddLike.then((res) => {
            newCard.querySelector(".card__like-counter").textContent = res.likes.length;
          })
            .catch((err) => {
              console.log(`Ошибка: ${err}`)
            });
        } else {
          const DataRemoveLike = RemoveLikeRequest(res._id);
          DataRemoveLike.then((res) => {
            newCard.querySelector(".card__like-counter").textContent = res.likes.length;
          })
            .catch((err) => {
              console.log(`Ошибка: ${err}`)
            });
        }
      });
    })
      .then(() => closeModal(cardPopup))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        renderLoading(false, cardFormElement.querySelector(".popup__button"))
        nameCardInput.value = '';
        ulrInput.value = '';
      });
  }

  cardFormElement.addEventListener("submit", handleCardFormSubmit);
}

function hideDeleteButton(card) {
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.classList.add('card__delete-button_inactive');
}

function showDeleteButton(card) {
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.classList.remove('card__delete-button_inactive');
}

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

// загрузка во время отправки на сервер запроса

function renderLoading(isLoading, button) {
  console.log(isLoading, button.textContent);
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}


// смена аватара пользователя

function editAvatar() {
  openModal(avatarPopup);
  const buttonClose = avatarPopup.querySelector(".popup__close");
  buttonClose.addEventListener("click", () => closeModal(avatarPopup));
  closePopupOverlay(avatarPopup);

  const avatarFormElement = avatarPopup.querySelector(".popup__form")
  const urlInput = avatarFormElement.querySelector(".popup__input_type_url")
  function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, avatarFormElement.querySelector(".popup__button"));
    UpdateAvatar(urlInput.value).then((json) => {

      profilePhoto.setAttribute('src', json.avatar);
    })
      .then(() => {
        closeModal(avatarPopup);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(false, avatarFormElement.querySelector(".popup__button"))
        urlInput.value = ''; 
      });
  }

  avatarPopup.addEventListener("submit", handleAvatarFormSubmit);
}





const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profilePhoto = document.querySelector('.profile__image');
const personalData = ProfileInfoRequest();

buttonAvatar.addEventListener("click", editAvatar);

personalData.then((json) => {

  profileName.textContent = json.name;
  profileDescription.textContent = json.about;
  profilePhoto.setAttribute('src', json.avatar);

})
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  });


const initialCardsData = InitialCardsRequest();
initialCardsData.then((data) => {
  data.forEach((card) => {


    const addedCard = createCard(card.name, card.link, "photo", card.likes.length, card._id);
    cardList.append(addedCard);

    personalData.then((json) => {
      if (card.owner._id !== json._id) {
        hideDeleteButton(addedCard);
      }
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  });
})
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  });


