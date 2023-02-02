"use strict"

export default class Card {
  constructor(
    {name, link, _id, owner, likes},
    templateSelector,
    handleCardClick,
    handleLikeCard,
    handleDeleteCard,
    userId) {
      this._name = name;
      this._link = link;
      this._id = _id;
      this._ownerId = owner._id;
      this._likes = likes;
      this._userId = userId;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleLikeCard = handleLikeCard;
      this._handleDeleteCard = handleDeleteCard;
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

    this._cardImage = this._element.querySelector('.elements__image');
    this._subtitle = this._element.querySelector('.elements__title');
    this._buttonCardLike = this._element.querySelector(".elements__button-like");
    this._buttonCardDelete = this._element.querySelector(".elements__trash");
    this._likeCardCounter = this._element.querySelector(".elements__like-counter");

    this._cardImage.src = this._link;
    this._cardImage.name = this._name;
    this._cardImage.alt = this._name;

    this._subtitle.textContent = this._name;

    this._setEventListeners();

      if (!this._isOwner()) {
        this._buttonCardDelete.remove();
        this._buttonCardDelete = null;
      }
    this.updateLikes(this._likes)

    return this._element;
  }

  toggleLikeCard () {
    //this._buttonCardLike.classList.toggle('elements__button-like_state-active');

    this.isLiked()
    ? this._buttonCardLike.classList.add("elements__button-like_state-active")
    : this._buttonCardLike.classList.remove("elements__button-like_state-active");
  }

  deleteCard () {
    this._element.remove();
    this._element = null;
  }

  updateLikes(likes) {
    this._likes = likes;
    this._likeCardCounter.textContent = likes.length;
    this.toggleLikeCard();
  }

  isLiked() {
    return this._likes.some((userlike) => userlike._id === this._userId);
  }

  _setEventListeners () {

    if (this._isOwner()) {
      this._buttonCardDelete.addEventListener('click', () => {
        this._handleDeleteCard(this, this._id);
      })
    }

    this._buttonCardLike.addEventListener('click', () => {
      this._handleLikeCard(this, this._id);
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        link: this._link,
        name: this._name,
      })
    })
  }

  _isOwner() {
    return this._ownerId === this._userId;
  }
}






