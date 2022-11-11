"use strict"

import {Section} from "./Section.js";
import Popup from "./Popup.js";

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

    const image = this._element.querySelector('.elements__image');

    image.src = this._cardData.link;
    image.name = this._cardData.name;

    this._element.querySelector('.elements__title').textContent = this._cardData.name;

    return this._element;
  }

  _buttonLikeCard () {
    this._element.querySelector('.elements__button-like')
    .classList.toggle('elements__button-like_state-active');
  }

  _buttonTrashCard () {
    this._element.remove();
  }

  _openImagePopup () {
    this._handleCardClick({
      link: this._cardData.link,
      name: this._cardData.name
    })
  }

  _setEventListeners () {

    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._buttonTrashCard();
    });
    this._element.querySelector('.elements__button-like').addEventListener('click', () => {
      this._buttonLikeCard();
    });
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openImagePopup();
    })
  }
}






