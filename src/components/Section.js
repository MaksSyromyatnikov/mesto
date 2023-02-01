export class Section {
  constructor(renderer, containerSelector){
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  appendItem(item) {
    this._container.append(item);
  }

  renderItems (items) {
    items.forEach(this._renderer);
  }

}
