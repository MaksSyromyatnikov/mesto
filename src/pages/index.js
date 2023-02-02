'use strict'
import Api from '../components/Api.js';
import './index.css';
import {Section} from "../components/Section.js";
import Card from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import Userinfo from "../components/UserInfo.js";
import {
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

let userId;
// 2 формы валидации из класса
const addCardValidation = new FormValidator(configValidation, popupAddCard);
const profileEditValidation = new FormValidator(configValidation, popupEditProfile);

addCardValidation.enableValidation();
profileEditValidation.enableValidation();


// конфиг с токеном
const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'ae8699d5-da9b-4ba8-9006-ccade90b95f9',
    'Content-Type': 'application/json'
  }
}

const api = new Api(configApi);

// инициализация начальных данных
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userId = userData._id;
    section.renderItems(cardData);
    userInfo.getUserInfo(userData);
  })
  .catch((err) => console.log(err));


// экземпляр Section в контейнер
const section = new Section(
  (item) =>  {
    const card = createCard(item);
    section.addItem(card);
  }, containerCards);

const createCard = (cardData) => {
  const cardElement = new Card (
    cardData,
    '#card-template',
    handleCardClick,
    handleLikeCard,
    handleDeleteCard,
    userId
    );
  return cardElement.generateCard();
}

// изначальный userInfo

const userInfo = new Userinfo({
  name: '.profile__name',
  description: '.profile__description',
  avatar: '.profile__avatar'
});

// Создаём попапы
const popupEdit = new PopupWithForm('.popup_type_edit', (inputValues) => {
  userInfo.setUserInfo(inputValues);
  popupEdit.close();
})
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add',
 (inputValues) => {
    popupAdd.showLoading(true);
    api.addCard(inputValues)
    .then((newCardData) => {
      const card = createCard(newCardData);
      section.addItem(card);
      addCardValidation.disableSubmitButton();
      popupAdd.close();
  }).catch(err => console.log(`карточка не добавилась. ${err}`))
});


popupAdd.setEventListeners();

// открытие картинок
const popupPicture = new PopupWithImage('.popup_type_image');
popupPicture.setEventListeners();

// попап с подтверждением удаления
const popupConfirm = new PopupWithConfirm(".popup_type_confirm");
popupConfirm.setEventListeners();

const handleCardClick = (img) => {
  popupPicture.open(img);
}

// обработка лайка
const handleLikeCard = (card, cardId) => {
  const liked = card.isLiked() ? api.removeLike(cardId) : api.addLike(cardId);
  liked
    .then((newCardData) => {
      card.updateLikes(newCardData.likes);
    })
    .catch((err) => console.log(err));
};

// обработка удаления

const handleDeleteCard = (card, cardId) => {
  popupConfirm.open();
  popupConfirm.setSubmitHandler(() => {
    popupConfirm.showLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        popupConfirm.close();
        card.deleteCard();
      })
      .catch((err) => console.log(err))
      .finally(() => popupConfirm.showLoading(false));
  });
};


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
