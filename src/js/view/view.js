// import { is } from 'core-js/core/object';
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  renderData(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderingError();

    this._data = data;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', this._generateMarkup());
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
