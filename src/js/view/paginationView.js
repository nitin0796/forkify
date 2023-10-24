import { newState } from '../model.js';
import view from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends view {
  _parentEle = document.querySelector('.pagination');

  eventPaginationHandler(handler) {
    this._parentEle.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _renderPaginationButton(num) {
    const currPage = this._data.page;

    return `
    <button data-goto="${
      num < 1 ? currPage - 1 : currPage + 1
    }" class=" btn--inline  pagination__btn--${num < 1 ? 'prev' : 'next'}">
    <span>Page ${currPage + num}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${num < 1 ? 'left' : 'right'}"></use>
    </svg>
  </button>
    `;
  }

  _generateMarkup() {
    const currPage = this._data.page;

    const totalPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    //Page1 and there are other pages
    if (currPage === 1 && totalPages > 1) {
      return this._renderPaginationButton(1);
    }

    //Last page
    if (currPage === totalPages && totalPages > 1) {
      return this._renderPaginationButton(-1);
    }

    //Other page
    if (currPage < totalPages) {
      return `${
        this._renderPaginationButton(1) + this._renderPaginationButton(-1)
      }`;
    }

    //Page1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
