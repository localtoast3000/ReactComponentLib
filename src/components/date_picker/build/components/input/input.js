import { useState, useEffect, useRef } from 'react';
import { useDate } from '../../contexts/date_context';
import styles from './input.module.css';
import util from '../../lib/util';
import { format } from 'date-fns';

export default function Input({ openPicker, setOpenPicker, getValue, dateFormat }) {
  const [outline, setOutline] = useState('default');
  const [state] = useDate();
  const inputRef = useRef();

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

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
    if (!openPicker) {
      setOutline('default');
    }
  };

  useEffect(() => {
    if (!openPicker) {
      getValue({ dateInstance: state.date, inputValue: inputRef.current.children[0].value });
    }
  }, [openPicker]);

  return (
    <div
      ref={inputRef}
      className={`${styles.inputContainer} ${styles[outline]} `}
      onClick={() => {
        setOpenPicker(true);
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
      <input disabled value={format(state.date, dateFormat)} />
      <div className={styles.inputPaddingRight}></div>
    </div>
  );
}
