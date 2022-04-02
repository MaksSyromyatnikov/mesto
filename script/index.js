"use strict";

// объявление массива карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Балаклава',
    link: 'https://images.unsplash.com/photo-1614707788967-e9422012cff1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
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
const cardsContainer = document.querySelector('.elements');

// popup

const popup = document.querySelector('.popup');

//Объявление add popup
const popupAddCard = document.querySelector('.popup_type_add');
const formElementAddImage = popupAddCard.querySelector('.popup__form');
const placeNameInput = popupAddCard.querySelector('.popup__input_type_place');
const srcImageInput = popupAddCard.querySelector('.popup__input_type_src');
const addButton = document.querySelector('.profile__add-button');
const saveNewCardButton = document.querySelector('.popup__save-button_add-card');


//Объявление Edit popup
const popupEditProfile = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");


//Объявление Данных из профиля
const profile = document.querySelector('.profile');
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

//создание каточек, лайк и удаление
const createCards = (cardName, cardSrc) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);

  const likeButton = cardItem.querySelector('.elements__button-like');
  const trashButton = cardItem.querySelector('.elements__trash');


  cardItem.querySelector('.elements__image').src = cardSrc;
  cardItem.querySelector('.elements__image').alt = cardName;
  cardItem.querySelector('.elements__title').textContent = cardName;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__button-like_state-active');
  })

  trashButton.addEventListener('click', () => {
    cardItem.remove();
  })

  return cardItem;
}



const renderCard = (newCard) => {
  cardsContainer.append(newCard);
}

initialCards.forEach(item => {
  const newCard = createCards(item.name, item.link)
  renderCard(newCard);
})
// добавление новой картчоки
const addCard = (evt) => {
  evt.preventDefault();
  const newCard = createCards(placeNameInput.value, srcImageInput.value);
  cardsContainer.prepend(newCard);
  srcImageInput.value = '';
  placeNameInput.value = '';
  closePopup(popupAddCard);
}


// Функции: Открытия попапа общее, вставка значений, закрытие окон
const openPopup = (modal) => {
  if (modal.classList.contains('popup_type_edit')){
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    modal.classList.add("popup_opened");
    document.addEventListener("keyup", onDocumentKeyUp);
  } else {
    modal.classList.add("popup_opened");
    document.addEventListener("keyup", onDocumentKeyUp);
  }
}

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
popupAddCard.addEventListener('submit', addCard);
