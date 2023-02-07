

// объект с селекторами и классами
export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  disableButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}


//контейнер
export const containerCards = document.querySelector('.elements');

//Объявление add popup
export const popupAddCard = document.querySelector('.popup_type_add');

export const buttonAdd = document.querySelector('.profile__add-button');

//Объявление Edit popup
export const popupEditProfile = document.querySelector(".popup_type_edit");

export const buttonEdit = document.querySelector(".profile__edit-button");

export const popupAvatar = document.querySelector('.popup_type_avatar');
export const buttonEditAvatar = document.querySelector('.profile__avatar-button');

// инпуты edit popup
export const inputName = document.querySelector('.popup__input_type_name');
export const inputDescription = document.querySelector('.popup__input_type_job');

