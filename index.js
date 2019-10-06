(() => {
  const createLs = module.require('createLs');
  const getElem = module.require('getElem');
  const toggleFormCreator = module.require('toggleFormCreator');

  createLs('notionsStore');

  const plus = getElem('.add-notion');
  const createNoteText = getElem('.add-title');

  plus.addEventListener('click', () => toggleFormCreator(true));
  createNoteText.addEventListener('click', () => toggleFormCreator(true));

  const container = getElem(".notion-container");

  module.exports = {
    ...module.exports,
    container,
  };
})()