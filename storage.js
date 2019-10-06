(() => {
  const ls = localStorage;

  const createLs = (key) => {
    if (ls[key]) return;
    ls[key] = JSON.stringify({});
  }

  const getLsData = (key) => {
    return { ...JSON.parse(ls[key]) };
  };

  const setToLsByKey = (key, updatedData) => ls[key] = JSON.stringify(updatedData)

  const addToLs = (data, id, key) => {
    const updatedLsData = getLsData(key);
    updatedLsData[id] = data;

    setToLsByKey(key, updatedLsData);
  }

  const getNotionById = (key, id) => {
    const updatedLsData = getLsData(key);
    
    setToLsByKey(key, updatedLsData);
    
    return updatedLsData[id];
  }

  const removeNotionById = (key, id) => {
    const updatedLsData = getLsData(key);

    delete updatedLsData[id];

    setToLsByKey(key, updatedLsData);
  }

  const updateNotionById = (key, id, text) => {
    const notion = getNotionById(key, id);
    notion.text = text;    

    const updatedData = getLsData(key);

    updatedData[id] = { ...notion };

    setToLsByKey(key, updatedData);
  }

  module.exports = {
    ...module.export,
    getLsData,
    createLs,
    addToLs,
    updateNotionById,
    removeNotionById,
  }
})()