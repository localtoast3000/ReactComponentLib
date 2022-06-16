import { useState, useEffect } from 'react';
import styles from './date_picker.module.css';
import Calendar from './calendar/calendar';
import YearPicker from './year_picker/year_picker.js';
import { useDate } from '../../../contexts/date_context';
import { format } from 'date-fns';

export default function DatePicker({ pickerType, setPickerType, yearRange }) {
  const [transitionStyle, setTransitionStyle] = useState(styles.triangleDown);
  const [state, dispatch] = useDate();

  useEffect(() => {
    if (pickerType === 'calendar') {
      setTransitionStyle(styles.triangleDown);
      return;
    }
    setTransitionStyle(styles.triangleUp);
  }, [pickerType]);

  return (
    <div className={styles.datePickerContainer}>
      <div className={styles.navbarContainer}>
        <div className={styles.currentMonthYearContainer}>
          <div className={styles.currentMonthYearWrapper}>
            <button
              type='button'
              className={`${styles.currentMonthYear}`}
              onClick={() => {
                if (pickerType !== 'calendar') {
                  setPickerType('calendar');
                  return;
                }
                setPickerType('year');
              }}>
              <p>{format(state.date, 'MMMM')}</p>
              <p>{format(state.date, 'yyyy')}</p>
            </button>
            <div className={styles.yearPickerToggleBtnContainer}>
              <button
                type='button'
                className={styles.yearPickerToggleBtn}
                onClick={() => {
                  if (pickerType !== 'calendar') {
                    setPickerType('calendar');
                    return;
                  }
                  setPickerType('year');
                }}>
                <TriangleIcon transitionStyle={transitionStyle} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.monthsSelectorsContainer}>
          <div className={styles.monthSelectors}>
            <div className={styles.monthSelectorContainer}>
              <button
                type='button'
                onClick={() => dispatch({ type: 'month--' })}
                className={`${styles.directionBtnLeft}}`}>
                <ArrowLeftIcon />
              </button>
            </div>
            <div className={styles.monthSelectorContainer}>
              <button type='button' onClick={() => dispatch({ type: 'month++' })} className={styles.directionBtnRight}>
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.currentPickerContainer} ${pickerType === 'calendar' ? styles.overFlowYHidden : ''} }`}>
        {pickerType === 'calendar' ? <Calendar /> : <YearPicker range={yearRange} />}
      </div>
    </div>
  );
}

function TriangleIcon({ transitionStyle }) {
  return (
    <svg
      className={`${styles.triangleIcon} ${transitionStyle}`}
      focusable='false'
      ariahidden='true'
      viewBox='0 0 24 24'>
      <path d='M7 10l5 5 5-5z'></path>
    </svg>
  );
}
function ArrowLeftIcon({ inactiveStyles = '' }) {
  return (
    <svg
      className={`${styles.arrowLeftIcon} ${inactiveStyles}`}
      focusable='false'
      ariahidden='true'
      viewBox='0 0 24 24'>
      <path d='M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'></path>
    </svg>
  );
}
function ArrowRightIcon({ inactiveStyles = '' }) {
  return (
    <svg
      className={`${styles.arrowRightIcon} ${inactiveStyles}`}
      focusable='false'
      ariahidden='true'
      viewBox='0 0 24 24'>
      <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'></path>
    </svg>
  );
}
