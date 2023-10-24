class SearchView {
  _parentEle = document.querySelector('.search');

  _clearInput() {
    this._parentEle.querySelector('.search__field').value = '';
  }

  getQuery() {
    const searchBar = this._parentEle.querySelector('.search__field').value;
    this._clearInput();
    return searchBar;
  }

  eventSearchHandler(searchResult) {
    this._parentEle.addEventListener('submit', e => {
      e.preventDefault();
      searchResult();
    });
  }
}

export default new SearchView();
