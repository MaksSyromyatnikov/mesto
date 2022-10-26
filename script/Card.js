"use strict"

export {Card};
import {openImagePopup} from './utils.js';

class Card {
  constructor(data, imageSelector, templateSelector){
    this._title = data.name;
    this._image = data.link;
    this._handleOpenImage = openImagePopup;
    this._imageSelector = imageSelector;
    this._templateSelector = templateSelector;
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

    const image = this._element.querySelector(this._imageSelector);

    image.src = this._image;
    image.alt = this.title;

    this._element.querySelector('.elements__title').textContent = this._title;

    return this._element;
  }

  _buttonLikeCard () {
    this._element.querySelector('.elements__button-like')
    .classList.toggle('elements__button-like_state-active');
  }

  _buttonTrashCard () {
    this._element.remove();
  }

  _handleOpenImage() {
    openImagePopup (this._title, this._image);
  }

  _setEventListeners() {

    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._buttonTrashCard();
    });
    this._element.querySelector('.elements__button-like').addEventListener('click', () => {
      this._buttonLikeCard();
    });
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenImage(this._title, this._image);
    })
  }
}






