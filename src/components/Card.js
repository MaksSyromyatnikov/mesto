"use strict"

export default class Card {
  constructor(cardData, templateSelector, handleCardClick){
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._element.querySelector('.elements__image');
    this._subtitle = this._element.querySelector('.elements__title');

    this._cardImage.src = this._cardData.link;
    this._cardImage.name = this._cardData.name;
    this._cardImage.alt = this._cardData.name;

    this._subtitle.textContent = this._cardData.name;

    return this._element;
  }

  _handleButtonLikeCard () {
    this._buttonCardLike.classList.toggle('elements__button-like_state-active');
  }

  _handleButtonTrashCard () {
    this._element.remove();
    this._element = null;
  }

  _openImagePopup () {
    this._handleCardClick({
      link: this._cardData.link,
      name: this._cardData.name
    })
  }

  _setEventListeners () {
    this._buttonDelete = this._element.querySelector('.elements__trash');
    this._buttonCardLike = this._element.querySelector('.elements__button-like');

    this._buttonDelete.addEventListener('click', () => {
      this._handleButtonTrashCard();
    });
    this._buttonCardLike.addEventListener('click', () => {
      this._handleButtonLikeCard();
    });
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openImagePopup();
    })
  }
}






