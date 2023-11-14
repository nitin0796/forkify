import view from './view.js';
import ViewPreview from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ViewBookmark extends view {
  _parentEle = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a new recipe and bookmark it ;)';
  _successMsg = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => ViewPreview.renderData(bookmark, false))
      .join('');
  }
}

export default new ViewBookmark();
