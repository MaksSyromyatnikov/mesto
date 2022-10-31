"use strict"

//объявление модального окна с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageFull = popupImage.querySelector('.popup__image');
const popupImageSubtitle = popupImage.querySelector('.popup__subtitle');


export const openPopup = (modal) => {
  modal.classList.add("popup_opened");
  document.addEventListener("keyup", closeByEscape);
  modal.addEventListener('click', closeByClickOverlay);
}

export const closePopup = (modal) => {
  modal.classList.remove('popup_opened');

  document.removeEventListener('keyup', closeByEscape);
  modal.removeEventListener('click', closeByClickOverlay);
};

  // close popup by escape
export const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

// закрытие по клику оверлея
export const closeByClickOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

export const openImagePopup = (photoName, photoLink) => {
  openPopup(popupImage);
  popupImageSubtitle.textContent = photoName;
  popupImageFull.src = photoLink;
  popupImageFull.alt = photoName;
}

