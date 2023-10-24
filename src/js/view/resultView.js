import view from './view.js';
import icons from 'url:../../img/icons.svg';

class ViewResult extends view {
  _parentEle = document.querySelector('.results');
  _errorMessage = 'Recipe Not Found for your query! Please try again ;)';
  _successMsg = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPrev).join('');
  }

  _generateMarkupPrev(result) {
    return `
    <li class="preview">
    <a class="preview__link " href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
  </li>
  `;
  }
}

export default new ViewResult();
