"use strict";

// объявление массива карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Темплейт карточек и контейнер
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.elements');

const createCards = (name, url) => {
  `<article class="elements__item">
  <button type="button" class="elements__trash button" value="trash"></button>
  <img src="${url}" alt="Новая картинка" class="elements__image"/>
  <div class="elements__attributes">
    <h2 class="elements__title">${name}</h2>
    <button type="button" class="elements__button-like" value="like"></button>
  </div>
  </article>`
  const elementItem = document.createElement('div');
  return elementItem.firstElementChild;
}

const cards = initialCards.map(el => {
  return createCards(el.name, el.link);
})
cardsContainer.prepend();







// popup

const popup = document.querySelector('.popup');

//Объявление add popup
const popupAddCard = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');

// данные из добавления карточки
const addFormElement = popupAddCard.querySelector(".popup__form");
const placeNameInput = addFormElement.querySelector(".popup__input_type_place");
const srcImageInput = addFormElement.querySelector(".popup__input_type_src");

//Объявление Edit popup
const popupEditProfile = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");


//Объявление Данных из профиля
const profile = document.querySelector('.profile');
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");







// Функции: Открытия попапа общее, вставка значений, закрытие окон
function openPopup(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keyup", onDocumentKeyUp);
}

// запись значений в инпут изменения профиля
function editProfileValue (){
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

function closePopup(modal) {
    modal.classList.remove("popup_opened");
    document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

// обработка сохранения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}


// Открытие окон
editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  editProfileValue();
});

addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

//Закрытие окон
popupEditProfile.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupAddCard.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popupAddCard);
});

//сохранение данных профиля

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
