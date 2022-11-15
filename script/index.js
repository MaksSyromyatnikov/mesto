'use strict'
import {Section} from "./Section.js";
import Card from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import Userinfo from "./UserInfo.js";
import {
  initialCards,
  cardsContainer,
  popupAddCard,
  buttonAdd,
  popupEditProfile,
  buttonEdit
   } from "./constants.js";
import { FormValidator } from "./FormValidator.js";


// объект с селекторами и классами
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  disableButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

// 2 формы валидации из класса
const addCardValidation = new FormValidator(configValidation, popupAddCard);
const profileEditValidation = new FormValidator(configValidation, popupEditProfile);

addCardValidation.enableValidation();
profileEditValidation.enableValidation();

// экземпляр Section в контейнер
const section = new Section({
  items: initialCards.reverse(),
  renderer: (item) =>  {
    const card = createCard(item);
    section.addItem(card);
  }
}, cardsContainer);

const createCard = (cardData) => {
  const cardElement = new Card (cardData, '#card-template', (image) => {
    popupPicture.open(image);
  });
  return cardElement.generateCard();
}

// изначальный userInfo

const userInfo = new Userinfo({
  name: '.profile__name',
  description: '.profile__description'
});

// Создаём попапы
const popupEdit = new PopupWithForm('.popup_type_edit', (inputValues) => {
  userInfo.setUserInfo(inputValues);
  popupEdit.close();
})
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add', (inputValues) => {
  const card = createCard(inputValues);
  section.addItem(card);
  addCardValidation.disableSubmitButton();
  popupAdd.close();
});
popupAdd.setEventListeners();

const popupPicture = new PopupWithImage('.popup_type_image');
popupPicture.setEventListeners();


// добавление слушателей
buttonEdit.addEventListener("click", () => {
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
});

buttonAdd.addEventListener("click", () => {
  addCardValidation.resetAllInputs();
  popupAdd.open();
});


//начальный сет карточек
section.renderItems();
