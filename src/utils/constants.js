// объявление массива карточек
const tokyo = new URL("../images/elements/elements__tokyo.jpg", import.meta.url);
const tbilisi = new URL('../images/elements/elements__tbilisi.jpg', import.meta.url);
const london = new URL('../images/elements/elements__london.jpg', import.meta.url);
const erevan = new URL('../images/elements/elements__erevan.jpg', import.meta.url);
const newYork = new URL('../images/elements/elements__newYork.jpg', import.meta.url);
const bordo = new URL('../images/elements/elements__bordo.jpg', import.meta.url);

// объект с селекторами и классами
export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  disableButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

export const initialCards = [
  {
    name: 'Токио',
    link: tokyo,
  },
  {
    name: 'Тбилиси',
    link: tbilisi,
  },
  {
    name: 'Лондон',
    link: london,
  },
  {
    name: 'Ереван',
    link: erevan,
  },
  {
    name: 'Нью-Йорк',
    link: newYork,
  },
  {
    name: 'Бордо',
    link: bordo,
  },
];

//контейнер
export const containerCards = document.querySelector('.elements');

//Объявление add popup
export const popupAddCard = document.querySelector('.popup_type_add');

export const buttonAdd = document.querySelector('.profile__add-button');

//Объявление Edit popup
export const popupEditProfile = document.querySelector(".popup_type_edit");

export const buttonEdit = document.querySelector(".profile__edit-button");

// инпуты edit popup
export const inputName = document.querySelector('.popup__input_type_name');
export const inputDescription = document.querySelector('.popup__input_type_job');

