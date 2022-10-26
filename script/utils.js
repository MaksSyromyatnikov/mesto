"use strict"

//объявление модального окна с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageFull = popupImage.querySelector('.popup__image');
const popupImageSubtitle = popupImage.querySelector('.popup__subtitle');


export const openPopup = (modal) => {
  modal.classList.add("popup_opened");
  // document.addEventListener("keyup", closeByEscape);
  // modal.addEventListener('click', closeByClickOverlayPopup);
}

export const openImagePopup = (photoName, photoLink) => {
  openPopup(popupImage);
  popupImageSubtitle.textContent = photoName;
  popupImageFull.src = photoLink;
  popupImageFull.alt = photoName;
}

