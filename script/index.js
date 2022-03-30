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

//создание каточек
const createCards = (cardName, cardSrc) => {
  const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);

  cardItem.querySelector('.elements__image').src = cardSrc;
  cardItem.querySelector('.elements__image').alt = cardName;
  cardItem.querySelector('.elements__title').textContent = cardName;

  return cardItem;
}

const allCards = initialCards.map(item => {
  return createCards(item.name, item.link);
})


const renderCard = () => {
  cardsContainer.prepend(...allCards);
}

renderCard();







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
const openPopup = (modal) => {
  modal.classList.add("popup_opened");
  document.addEventListener("keyup", onDocumentKeyUp);
}

// запись значений в инпут изменения профиля
const editProfileValue = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

const closePopup = (modal) => {
    modal.classList.remove("popup_opened");
    document.removeEventListener('keyup', onDocumentKeyUp);
}

const onDocumentKeyUp = (event) => {
  if (event.key === "Escape") {
    closePopup();
  }
}

// обработка сохранения данных профиля
const handleProfileFormSubmit = (evt) => {
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
