(() => {
  const getElem = module.require('getElem');
  const createNewNotion = module.require('createNewNotion');

  const form = getElem('.form');
  const xMark = getElem('.x-mark');
  const firstColor = getElem('.color');

  const changeCheckedColor = (e) => {
    if (e.target.tagName !== 'SPAN' || e.target.hasAttribute('data-checked')) return;
    const checked = getElem('[data-checked]');
    checked.removeAttribute('data-checked');
    e.target.setAttribute('data-checked', true);
  };

  const createNewNotionWrap = (e) => {
    createNewNotion(e);
    cleanForm();
  };

  const toggleFormCreator = (isOpen) => {
    const panel = getElem('.color-panel');
    form.addEventListener('submit', createNewNotionWrap);
    panel.addEventListener('click', changeCheckedColor);
    isOpen
      ? form.style.display = 'flex'
      : (form.style.display = 'none', cleanForm());
  };

  const cleanForm = () => {
    const checked = getElem('[data-checked]');
    form[0].value = '';
    form[1].value = '';
    checked.removeAttribute('data-checked');
    firstColor.setAttribute('data-checked', true);
  };

  xMark.addEventListener('click', () => toggleFormCreator())

  module.exports = {
    ...module.exports,
    toggleFormCreator,
    cleanForm,
  };
})();