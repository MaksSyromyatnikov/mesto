export default class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
  }

  open (modal) {
    modal.classList.add("popup_opened");
    document.addEventListener("keyup", closeByEscape);
    modal.addEventListener('click', closeByClickOverlay);
  }


  close (modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeByEscape);
    modal.removeEventListener('click', closeByClickOverlay);
  }

  _handleEscClose = (e) => {
    if (evt.key === "Escape") {
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
    }
  }

  setEventListeners () {

  }


  //   // close popup by escape
  // export const closeByEscape = (evt) => {
  //   if (evt.key === "Escape") {
  //     const activePopup = document.querySelector('.popup_opened');
  //     closePopup(activePopup);
  //   }
  // };

  // // закрытие по клику оверлея
  // export const closeByClickOverlay = (evt) => {
  //   if (evt.target === evt.currentTarget) {
  //     const activePopup = document.querySelector('.popup_opened');
  //     closePopup(activePopup);
  //   }
  // };


}
