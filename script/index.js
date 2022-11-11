'use strict'
import {Section} from "./Section.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import Userinfo from "./UserInfo.js";
import {
  initialCards,
  cardsContainer } from "./constants.js";
import { FormValidator } from "./FormValidator.js";


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

// 2 формы валидации из класса
const addCardValidation = new FormValidator(configValidation, popupAddCard);
const profileEditValidation = new FormValidator(configValidation, popupEditProfile);

addCardValidation.enableValidation();
profileEditValidation.enableValidation();

// экземпляр Section в контейнер
const section = new Section({
  items: initialCards,
  renderer: (item) =>  {
    const card = createCard(item);
    section.addItem(card);
  }
}, cardsContainer);

const createCard = (cardData) => {
  const cardElement = new Card (cardData, '.elements__image', '#card-template');
  return cardElement.generateCard();
}

// изначальный userInfo

const userInfo = new Userinfo({
  profileName: profileName,
  profileDescription: profileDescription
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
});
popupAdd.setEventListeners();

const popupPicture = new PopupWithImage('.popup_type_image');
popupPicture.setEventListeners();


// добавление слушателей
buttonEdit.addEventListener("click", () => {
  userInfo.setUserInfo(userInfo.getUserInfo());
  popupEdit.open();
  profileEditValidation.resetAllInputs();
});

buttonAdd.addEventListener("click", () => {
  addCardValidation.resetAllInputs();
  popupAdd.open();
});

////////////////////////////////////////////////////



// //Добавление карточки
// const handleFormAddSubmit = (evt) => {
//   evt.preventDefault();
//   const cardData = {
//       name: placeNameInput.value,
//       link: srcImageInput.value
//   }

//   const card = new Card(cardData, '.elements__image', '#card-template');
//   renderCard(card.generateCard(), cardsContainer);
//   placeNameInput.value = '';
//   srcImageInput.value = '';
//   addCardValidation.disableSubmitButton();
//   closePopup(popupAddCard);
// }



/////////////////////////////////////////////////////



// // Изменение профиля
// const handleFormEditProfile = (evt) => {
//   evt.preventDefault();

//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = jobInput.value;
//   closePopup(popupEditProfile);
// }


// //переносим в попап данные профиля
// const fillProfileInputs = () => {
//   popupFormEditProfile.reset();
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileDescription.textContent;
//   openPopup(popupEditProfile);
// }

// buttonEdit.addEventListener('click', () => {
//   profileEditValidation.enableSubmitButton();
//   fillProfileInputs(popupEditProfile);
// });
// buttonAdd.addEventListener('click', () => {
//   addCardValidation._resetAllInputs(popupAddCard);
//   openPopup(popupAddCard);
// });



// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     }
//   })
// });

// // сабмиты
// popupFormEditProfile.addEventListener('submit', handleFormEditProfile);
// popupFormAddCard.addEventListener('submit', handleFormAddSubmit);

//начальный сет карточек
section.renderItems();
