'use strict'

let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let closeButton = popupContainer.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__info_type-name');
let profileDescription = document.querySelector('.profile__info_type-description');

let buttonsLike = document.querySelectorAll('.elements__button-like');


buttonsLike.forEach(button => {
  button.addEventListener('click', function() {
    buttonsLike.forEach(el => el.classList.remove('elements__button-like_state-active'));
    this.classList.add('elements__button-like_state-active');
  })
})





function openPopup(){
  popup.classList.remove('popup_hidden');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup(){
  popup.classList.add('popup_hidden');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
  if (event.keyCode === 27){
    closePopup();
  } else if (event.keyCode === 13){
    formSubmitHandler();
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

