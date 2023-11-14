import view from './view.js';
import ViewPreview from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ViewResult extends view {
  _parentEle = document.querySelector('.results');
  _errorMessage = 'Recipe Not Found for your query! Please try again ;)';
  _successMsg = '';

  _generateMarkup() {
    return this._data
      .map(result => ViewPreview.renderData(result, false))
      .join('');
  }
}

export default new ViewResult();
