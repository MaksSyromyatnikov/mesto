"use strict";

// Темплейт карточек и контейнер
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.elements');

//Объявление add popup
const popupAddCard = document.querySelector('.popup_type_add');
const placeNameInput = popupAddCard.querySelector('.popup__input_type_place');
const srcImageInput = popupAddCard.querySelector('.popup__input_type_src');
const buttonAdd = document.querySelector('.profile__add-button');

//Объявление Edit popup
const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");

//объявление модального окна с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageFull = popupImage.querySelector('.popup__image');
const popupImageSubtitle = popupImage.querySelector('.popup__subtitle');

//Объявление Данных из профиля
const profile = document.querySelector('.profile');
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

//создание каточек, лайк и удаление
const createCards = (cardName, cardSrc) => {
  const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const cardItemImage =  cardItem.querySelector('.elements__image');

  const likeButton = cardItem.querySelector('.elements__button-like');
  const trashButton = cardItem.querySelector('.elements__trash');

  cardItemImage.setAttribute('src', cardSrc);
  cardItemImage.setAttribute('alt', cardName);
  cardItem.querySelector('.elements__title').textContent = cardName;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__button-like_state-active');
  })

  trashButton.addEventListener('click', () => {
    cardItem.remove();
  })

  cardItemImage.addEventListener('click', () => {
    popupImageFull.src = cardSrc;
    popupImageFull.alt = cardName;
    popupImageSubtitle.textContent = cardName;
    openPopup(popupImage);
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
  modal.classList.add("popup_opened");
  document.addEventListener("keyup", onDocumentKeyUp);
}

const closePopup = (modal) => {
    modal.classList.remove("popup_opened");
    document.removeEventListener('keyup', onDocumentKeyUp);
}

const onDocumentKeyUp = (event) => {
  if (event.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
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
buttonEdit.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAddCard);
});


//Закрытие окон
popupEditProfile.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupAddCard.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popupAddCard);
});

popupImage.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popupImage);
})

//сохранение данных профиля

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupAddCard.addEventListener('submit', addCard);
