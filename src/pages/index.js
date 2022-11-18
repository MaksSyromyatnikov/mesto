'use strict'
import './index.css';
import {Section} from "../components/Section.js";
import Card from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Userinfo from "../components/UserInfo.js";
import {
  initialCards,
  cardsContainer,
  popupAddCard,
  buttonAdd,
  popupEditProfile,
  buttonEdit
   } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";

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
  const cardData = {
    name: inputValues['element-place'],
    link: inputValues['element-src']
  }
  const card = createCard(cardData);
  section.addItem(card);
  addCardValidation.disableSubmitButton();
  popupAdd.resetForm();
  popupAdd.close();
});
popupAdd.setEventListeners();

const popupPicture = new PopupWithImage('.popup_type_image');
popupPicture.setEventListeners();


// добавление слушателей
buttonEdit.addEventListener("click", () => {
  popupEdit.open();
  userInfo.getUserInfo();
});

buttonAdd.addEventListener("click", () => {
  popupAdd.resetForm();
  addCardValidation.disableSubmitButton();
  addCardValidation.resetAllInputs();
  popupAdd.open();
});


//начальный сет карточек
section.renderItems();
