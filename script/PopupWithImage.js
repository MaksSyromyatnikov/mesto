"use strict"
import Popup from "./Popup.js";

import {
  popupImage,
  popupImageFull,
  popupImageSubtitle
} from "./constants.js";


export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup_type_image');
  }

  open (photoName, photoLink) {
    popupImageSubtitle.textContent = photoName;
    popupImageFull.src = photoLink;
    popupImageFull.alt = photoName;
    super.open();
  }
}
