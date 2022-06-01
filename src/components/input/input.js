import { useState, useEffect, useRef } from 'react';
import styles from './input.module.css';
import font from './fonts/primary/primary_font.module.css';

export default function Input({ value }) {
  const [outline, setOutline] = useState('default');

  const inputRef = useRef();

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  });

  const handleClick = (e) => {
    let match = false;
    for (let elem of util.elementAndNestedChildren(inputRef.current)) {
      if (e.target === elem) {
        match = true;
        break;
      }
    }
    if (match) {
      return;
    }
    setOutline('default');
  };

  return (
    <div
      ref={inputRef}
      className={`${styles.inputContainer} ${styles[outline]} ${font.primaryReg}`}
      onClick={() => {
        setOutline('focused');
      }}
      onMouseDown={() => {
        setOutline('focused');
      }}
      onMouseOver={() => {
        return outline !== 'focused' ? setOutline('hover') : setOutline('focused');
      }}
      onMouseLeave={() => {
        return outline !== 'focused' ? setOutline('default') : setOutline('focused');
      }}>
      <input value={value} />
      <div className={styles.inputPaddingRight}></div>
    </div>
  );
}

const util = (() => {
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
