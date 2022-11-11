export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._page = document.querySelector('.root');
  }

  open () {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }


  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  }


  setEventListeners () {
    this._popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup') ||
          e.target.classList.contains('popup__close-button')
        ) {
          this.close();
        }
    });
  }


}
