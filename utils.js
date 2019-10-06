(() => {
  const getElem = (selector) => document.querySelector(selector);

  module.exports = {
    ...module.exports,
    getElem,
  };
})()