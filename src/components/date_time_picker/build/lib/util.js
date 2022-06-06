import elementsUtil from './elements_util';
import dataUtil from './data_util';
import objectUtil from './object_util';

const util = (() => {
  return {
    ...elementsUtil,
    ...dataUtil,
    ...objectUtil,
  };
})();

export default util;
