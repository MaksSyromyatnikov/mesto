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
  buttonEditAvatar,
  popupAvatar,
  inputDescription,
  inputName,
  configValidation
   } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";

let userId;
// 2 формы валидации из класса
const addCardValidation = new FormValidator(configValidation, popupAddCard);
const profileEditValidation = new FormValidator(configValidation, popupEditProfile);
const profileAvatarValidation = new FormValidator(configValidation, popupAvatar);



addCardValidation.enableValidation();
profileEditValidation.enableValidation();
profileAvatarValidation.enableValidation();


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
  profileSelector: '.profile__name',
  profileDescription: '.profile__description',
  profileAvatar: '.profile__avatar'
});

// Создаём попапы
const popupEdit = new PopupWithForm('.popup_type_edit',
  (data) => {
    popupEdit.showLoading(true);
    api
    .editUserInfo(data['profile-name'], data['profile-job'])
    .then((newUserData) => {
      userInfo.setUserInfo(newUserData);
      popupEdit.close();
    })
    .catch ((err) => console.log(err))
    .finally(() => popupEdit.showLoading(false));
  }
)
popupEdit.setEventListeners();

// попап на смену аватара
const popupEditAvatar = new PopupWithForm('.popup_type_avatar',
  (data) => {
    popupEditAvatar.showLoading(true);
    api.editAvatar(data['profile-avatar'])
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch ((err) => console.log(err))
    .finally(() => popupEditAvatar.showLoading(false));
})
popupEditAvatar.setEventListeners();


// попап на добавление карточки
const popupAdd = new PopupWithForm('.popup_type_add',
 (data) => {
    popupAdd.showLoading(true);
    api.addCard(data['element-place'],data['element-src'])
    .then((newCardData) => {
      section.addItem(createCard(newCardData));
      addCardValidation.disableSubmitButton();
      popupAdd.close();
  })
  .catch(err => console.log(`карточка не добавилась. ${err}`))
  .finally(() => popupAdd.showLoading(false));

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


// добавление слушателей. Открытие изменения профиля
buttonEdit.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputDescription.value = data.description;
  profileEditValidation.resetValidation();
  popupEdit.open();
});

// Открытие попапа изменения аватарки
buttonEditAvatar.addEventListener('click', () => {
  profileAvatarValidation.checkPopupBeforeOpen();
  profileAvatarValidation.resetValidation();
  popupEditAvatar.open();
})

// открытие попапа добавление карточки
buttonAdd.addEventListener("click", () => {
  addCardValidation.resetValidation();
  popupAdd.open();
});


