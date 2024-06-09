export const saveArticleQuery = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("articleQuery", serializedState);
    } catch (err) {}
  }
  
export const deleteArticleQuery = () => {
    try {
      localStorage.removeItem("articleQuery");
    } catch (e) {}
};

export const getArticleQuery = () => {
    try {
      const serializedState = localStorage.getItem("articleQuery");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };