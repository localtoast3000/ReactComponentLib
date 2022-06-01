import { useState, useEffect, useRef } from 'react';
import { useDateTime } from '../contexts/date_time_context';
import styles from './input.module.css';
import util from '../lib/util';
import font from '../fonts/primary/primary_font.module.css';
import { format } from 'date-fns';

export default function Input({ openPicker, setOpenPicker }) {
  const [outline, setOutline] = useState('default');
  const [state, dispatch] = useDateTime();
  const [output, setOutput] = useState(state.dateTime);
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

  return (
    <div
      ref={inputRef}
      className={`${styles.inputContainer} ${styles[outline]} ${font.primaryReg}`}
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
      <input disabled value={format(output, 'dd/MM/yyyy HH:mm')} />
      <div className={styles.inputPaddingRight}></div>
    </div>
  );
}
