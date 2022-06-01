const ObjectUtil = ((obj) => {
  return {
    noBlankValues() {
      const promise = new Promise((resolve, reject) => {
        let blanks = {};
        Object.entries(obj).forEach(([key, value]) => {
          if (!value || value === null || value === '' || value === 'required') {
            blanks = { ...blanks, [key]: `required` };
          }
        });
        if (Object.keys(blanks).length === 0) {
          resolve(true);
        } else {
          reject(blanks);
        }
      });
      return promise;
    },
  };
})();

export default ObjectUtil;
