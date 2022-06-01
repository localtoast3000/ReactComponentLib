const dataUtil = (() => {
  return {
    removeCommas(str) {
      console.log(str);
      if (typeof str !== 'string') {
        throw new TypeError('Argument must be of type string');
      }
      if (!str.includes(',')) {
        return str;
      }

      return this.removeCommas(str.replace(',', ''));
    },
    formatTime(time) {
      if (typeof time !== 'string') {
        throw new TypeError('Argument must be of type string');
      }
      if (/\d\d:\d\d/.test(time)) {
        return time + ':00';
      }
      return time;
    },
  };
})();

export default dataUtil;
