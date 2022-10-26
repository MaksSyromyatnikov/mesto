'use strict'
import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";

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

const closePopup = (modal) => {
  modal.classList.remove("popup_opened");
  document.removeEventListener('keyup', closeByEscape);
  modal.removeEventListener('click', closeByClickOverlayPopup);
}

const closeByClickOverlayPopup = (evt) => {
  if (evt.target === evt.currentTarget){
    closePopup(evt.target );
  }
}

const closeByEscape = (event) => {
  if (event.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// // обработка сохранения данных профиля
// const handleProfileFormSubmit = (evt) => {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = jobInput.value;
//   closePopup(popupEditProfile);
// }

// const setEventListeners = () => {
//   // Открытие окон

//   buttonEdit.addEventListener("click", () => {
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileDescription.textContent;
//     openPopup(popupEditProfile);
//   });

//   buttonAdd.addEventListener('click', () => {
//     openPopup(popupAddCard);
//   });

//   //Закрытие окон

//   popupEditProfile.querySelector('.popup__close-button').addEventListener('click', () => {
//     closePopup(popupEditProfile);
//   });

//   popupAddCard.querySelector('.popup__close-button').addEventListener('click', () => {
//     closePopup(popupAddCard);
//   });

//   popupImage.querySelector('.popup__close-button').addEventListener('click', () => {
//     closePopup(popupImage);
//   })
// }
// setEventListeners();


const renderCards = () => {
  initialCards.forEach((item) => {
    const card = new Card (item, '.elements__image', '#card-template');
    const cardElement = card.generateCard();

    cardsContainer.append(cardElement);
  })
}
renderCards();


// //сохранение данных профиля

// // popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit);
// // popupFormAddCard.addEventListener('submit', addCard);
