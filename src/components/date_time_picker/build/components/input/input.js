import { useState, useEffect, useRef } from 'react';
import { useDateTime } from '../../contexts/date_time_context';
import styles from './input.module.css';
import util from '../../lib/util';
import { format } from 'date-fns';

export default function Input({ openPicker, setOpenPicker, getValue, formats }) {
  const [outline, setOutline] = useState('default');
  const [state] = useDateTime();
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
      getValue({ dateInstance: state.dateTime, inputValue: inputRef.current.children[0].value });
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
      <input disabled value={format(state.dateTime, `${formats.date} ${formats.time}`)} />
      <div className={styles.inputPaddingRight}></div>
    </div>
  );
}
