"use strict"

import {Section} from "./Section.js";

export default class Card {
  constructor(cardData, imageSelector, templateSelector){
    this._cardData = cardData;
    this._imageSelector = imageSelector;
    this._templateSelector = templateSelector;
  }

  _getTemplate = () => {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    const image = this._element.querySelector(this._imageSelector);

    this.imageSelector = this._cardData.link;
    this.imageSelector = this._cardData.name;

    this._element.querySelector('.elements__title').textContent = this._cardData.name;

    return this._element;
  }

  _buttonLikeCard = () => {
    this._element.querySelector('.elements__button-like')
    .classList.toggle('elements__button-like_state-active');
  }

  _buttonTrashCard = () => {
    this._element.remove();
  }

  _handleOpenImage = () => {
    openImagePopup (this._cardData.name, this._cardData.link);
  }

  _setEventListeners = () => {

    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._buttonTrashCard();
    });
    this._element.querySelector('.elements__button-like').addEventListener('click', () => {
      this._buttonLikeCard();
    });
    // this._element.querySelector('.elements__image').addEventListener('click', () => {
    //   this._handleOpenImage(this._cardData.name, this._cardData.link);
    // })
  }
}






