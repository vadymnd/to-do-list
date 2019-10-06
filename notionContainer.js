(() => {
  const getElem = module.require('getElem');
  const getLsData = module.require('getLsData');
  const removeNotion = module.require('removeNotion');
  const updateNotionById = module.require('updateNotionById');

  const container = getElem(".notion-container");
  const notions = getLsData('notionsStore');
  const notion = getElem('.notion');
  
  
  
  const renderChildrenComponents = () => {
    const values = Object.values(notions);
    const fragment = document.createDocumentFragment();

    values.forEach(notionData => {
      const copy = notion.cloneNode(true);
      const notionItemInput = copy.querySelector('.notion-item-input');

      copy.style.display = 'block';

      copy.setAttribute('data-id', notionData.id);

      const h2 = copy.querySelector('.notion header h2');

      copy.style.backgroundColor = notionData.color;
      h2.innerText = notionData.title;
      notionItemInput.innerText = notionData.text;

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

      fragment.append(copy);
    });

    container.append(fragment);
  }

  window.addEventListener('load', renderChildrenComponents);
})();