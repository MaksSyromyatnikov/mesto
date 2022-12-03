'use strict'
import './index.css';
import {Section} from "../components/Section.js";
import Card from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Userinfo from "../components/UserInfo.js";
import {
  initialCards,
  containerCards,
  popupAddCard,
  buttonAdd,
  popupEditProfile,
  buttonEdit,
  inputDescription,
  inputName,
  configValidation
   } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";

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
}, containerCards);

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
  popupAdd.close();
});
popupAdd.setEventListeners();

const popupPicture = new PopupWithImage('.popup_type_image');
popupPicture.setEventListeners();


// добавление слушателей
buttonEdit.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  inputName.value = currentUser.name;
  inputDescription.value = currentUser.description;
  profileEditValidation.resetValidation();
  popupEdit.open();
});

buttonAdd.addEventListener("click", () => {
  addCardValidation.resetValidation();
  popupAdd.open();
});


//начальный сет карточек
section.renderItems();
