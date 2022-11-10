"use strict"
import Popup from "./Popup.js";

import {
  popupImage,
  popupImageFull,
  popupImageSubtitle
} from "./constants.js";


export class PopupWithImage extends Popup {
  constructor(){
    super(popupSelector);
  }

  open (modal, photoName, photoLink) {
    modal.classList.add("popup_opened");
    popupImageSubtitle.textContent = photoName;
    popupImageFull.src = photoLink;
    popupImageFull.alt = photoName;
  }
}
