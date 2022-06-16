import { useState, useEffect, useRef } from 'react';
import styles from './picker.module.css';
import DatePicker from './dp/dp';
import { useDate } from '../../contexts/date_context';
import { format } from 'date-fns';

export default function Picker({ openPicker, setOpenPicker, yearRange, hr24 }) {
  const [state, dispatch] = useDate();
  const [initialState, setInitialState] = useState(state.date);
  const [pickerStyle, setPickerStyle] = useState('closedState');
  const [pickerType, setPickerType] = useState('calendar');
  const [inactive, setInactive] = useState({
    year: true,
    calendar: false,
  });

  const pickerBackground = useRef();

  useEffect(() => {
    if (openPicker) {
      window.addEventListener('click', handleClick);
      return () => {
        window.removeEventListener('click', handleClick);
      };
    }
  });

  useEffect(() => {
    if (openPicker) {
      const interval = setInterval(() => {
        setPickerStyle('openState');
      }, 0);
      return () => clearInterval(interval);
    }
  }, [openPicker]);

  useEffect(() => {
    if (pickerType === 'year') {
      setInactive({ ...resetValuesToTrue(), calendar: false, year: false });
    }
    if (pickerType === 'calendar') {
      setInactive({ ...resetValuesToTrue(), calendar: false, date: false });
    }
  }, [pickerType]);

  const resetValuesToTrue = (obj = inactive) => {
    const editedObj = {};
    for (let key of Object.keys(obj)) {
      editedObj[key] = true;
    }
    return editedObj;
  };

  const handleClick = (e) => {
    if (e.target === pickerBackground.current) {
      dispatch({ type: 'new-date', value: initialState });
      setOpenPicker(false);
      setPickerStyle('closedState');
    }
  };

  return (
    <>
      {openPicker ? (
        <div ref={pickerBackground} className={`${styles[pickerStyle]}`}>
          <div className={styles.pickerContainer}>
            <div className={styles.dPickerContainer}>
              <DatePicker pickerType={pickerType} setPickerType={setPickerType} yearRange={yearRange} />
            </div>
            <div className={styles.bottomOptionsContainer}>
              <button
                type='button'
                className={`${styles.cancelOption}`}
                onClick={() => {
                  dispatch({ type: 'new-date', value: initialState });
                  setOpenPicker(false);
                }}>
                CANCEL
              </button>
              <button
                type='button'
                className={`${styles.okOption}`}
                onClick={() => {
                  setInitialState(state.date);
                  setOpenPicker(false);
                }}>
                OK
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

function CalendarIcon() {
  return (
    <svg className={styles.calendarIcon} focusable='false' ariahidden='true' viewBox='0 0 24 24'>
      <path d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z'></path>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className={styles.clockIcon} focusable='false' ariahidden='true' viewBox='0 0 24 24'>
      <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path>
      <path d='M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z'></path>
    </svg>
  );
}
