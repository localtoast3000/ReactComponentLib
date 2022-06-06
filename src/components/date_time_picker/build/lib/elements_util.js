const elementsUtil = (() => {
  let nestedChildren = [];
  return {
    elementAndNestedChildren(element) {
      nestedChildren = [...nestedChildren, element];
      for (let child of element.children) {
        this.elementAndNestedChildren(child);
      }
      return nestedChildren;
    },
  };
})();

export default elementsUtil;
