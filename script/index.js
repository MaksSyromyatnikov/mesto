'use strict'
import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

//контейнер
const cardsContainer = document.querySelector('.elements');
//Объявление add popup
const popupAddCard = document.querySelector('.popup_type_add');
const popupFormAddCard = popupAddCard.querySelector('.popup__form');
const placeNameInput = popupAddCard.querySelector('.popup__input_type_place');
const srcImageInput = popupAddCard.querySelector('.popup__input_type_src');
const buttonAdd = document.querySelector('.profile__add-button');

//Объявление Edit popup
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form');
const buttonEdit = document.querySelector(".profile__edit-button");

//Объявление Данных из профиля
const profile = document.querySelector('.profile');
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

const popups = Array.from(document.querySelectorAll('.popup'));


// объект с селекторами и классами
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  disableButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

const renderCards = () => {
  initialCards.forEach((item) => {
    const card = new Card (item, '.elements__image', '#card-template');
    const cardElement = card.generateCard();

    cardsContainer.append(cardElement);
  })
}
renderCards();

const addCardValidation = new FormValidator(configValidation, popupAddCard);
const profileEditValidation = new FormValidator(configValidation, popupEditProfile);

addCardValidation.enableValidation();
profileEditValidation.enableValidation();

// Добавление новой карточки
const addNewCard = (evt) => {
  evt.preventDefault();

  const title = placeNameInput.value;
  const image = srcImageInput.value;
  renderCards();

  popupAddCard.reset();
  closePopup(popupAddCard);
  addCardValidation.disableButtonClass();
};

// Изменение профиля

const editProfile = (evt) => {
  evt.preventDefault();

  const profileName = nameInput.value;
  const profileDescription = jobInput.value;

  closePopup(popupEditProfile);
}

const fillProfileInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

// edit button listener
buttonEdit.addEventListener('click', () => fillProfileInputs(popupEditProfile));
// add button listener
buttonAdd.addEventListener('click', () => openPopup(popupAddCard));
// close popup button listener
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
});

// сабмиты
buttonEdit.addEventListener('submit', editProfile);
buttonAdd.addEventListener('submit', addNewCard);

