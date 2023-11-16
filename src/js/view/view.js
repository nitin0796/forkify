// import { is } from 'core-js/core/object';
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  renderData(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderingError();

    this._data = data;
    if (!render) return this._generateMarkup();

    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  update(data) {
    this._data = data;

    const newDOM = document
      .createRange()
      .createContextualFragment(this._generateMarkup());

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this._parentEle.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      //Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //Update changed Attribute
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentEle.innerHTML = '';
  }

  renderingSpinner() {
    const spinnerHTML = `
       <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
      `;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', spinnerHTML);
  }

  renderingError(message = this._errorMessage) {
    const errorHTML = ` 
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', errorHTML);
  }

  renderingSuccessMessage(message = this._successMsg) {
    const msgHTML = `
      <div class="recipe">
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', msgHTML);
  }
}
