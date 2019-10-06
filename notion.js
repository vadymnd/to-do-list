(() => {
  const getElem = module.require('getElem');
  const addToLs = module.require('addToLs');
  const updateNotionById = module.require('updateNotionById');
  const removeNotionById = module.require('removeNotionById');

  const notion = getElem('.notion');
  const form = getElem('.form');
  const container = getElem(".notion-container");

  const removeNotion = (e) => {    
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'path') return;
    const li = e.target.closest('.notion');

    li.remove();

    removeNotionById('notionsStore', li.getAttribute('data-id'));
  }

  const createNewNotion = (e) => {
    e.preventDefault();

    const checked = getElem('[data-checked]');

    const formValues = {
      title: e.target[0].value,
      text: e.target[1].value,
      color: checked.getAttribute('data-color'),
    }

    form.style.display = 'none';

    const copy = notion.cloneNode(true);

    const notionItemInput = copy.querySelector('.notion-item-input');

    copy.style.display = 'block';

    copy.setAttribute('data-id', Date.now());

    const h2 = copy.querySelector('.notion header h2');

    copy.style.backgroundColor = formValues.color;
    h2.innerText = formValues.title;
    notionItemInput.innerText = formValues.text;

    if (container.children.length === 1) {
      container.addEventListener('click', removeNotion);
    }

    const submitTyping = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.target.blur();
      }
    };

    const onInput = (e) => {
      const li = e.target.closest('.notion');
      const id = li.getAttribute('data-id');
      const text = e.target.value

      updateNotionById('notionsStore', id, text);
    }

    notionItemInput.addEventListener('keypress', submitTyping);
    notionItemInput.addEventListener('input', onInput);

    addToLs(
      { id:copy.getAttribute('data-id'), title: h2.innerText, text: notionItemInput.innerText, color: formValues.color },
      copy.getAttribute('data-id'),
      'notionsStore'
    )

    container.append(copy);

  }


  module.exports = {
    ...module.exports,
    createNewNotion,
    removeNotion,
  };
})();