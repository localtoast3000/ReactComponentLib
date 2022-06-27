import { useState, useEffect } from 'react';
import styles from './calendar.module.css';
import { useDateTime } from '../../../../contexts/date_time_context';
import { getDaysInMonth, getDay, set, format } from 'date-fns';

export default function Calendar() {
  const [state, dispatch] = useDateTime();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.weekdaysContainer}>
        <WeekdayCells />
      </div>
      <div className={styles.daysOfMonthContainer}>
        <DaysOfMonthCells dateTime={state.dateTime} dispatch={dispatch} />
      </div>
    </div>
  );
}

function WeekdayCells() {
  const weekdayFirstLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  let keyCount = 0;

  return (
    <div className={styles.weekdays}>
      {weekdayFirstLetters.map((weekDay) => {
        const currentKey = keyCount;
        keyCount += 1;
        return (
          <div key={currentKey} className={styles.weekdayCell}>
            <p>{weekDay}</p>
          </div>
        );
      })}
    </div>
  );
}

function DaysOfMonthCells({ dateTime, dispatch }) {
  const weekdayPadding = [...Array(getDay(set(dateTime, { date: 1 })))];
  const daysOfTheMonth = Array.from({ length: getDaysInMonth(dateTime) }, (_, i) => i + 1);
  let keyCount = 0;

  return (
    <div className={styles.daysOfMonth}>
      {weekdayPadding.map((weekdayPadding) => {
        if (weekdayPadding === 0) {
          return;
        }
        const currentKey = keyCount;
        keyCount += 1;
        return <div key={currentKey} className={styles.weekdayPaddingCell}></div>;
      })}
      {daysOfTheMonth.map((dayOfMonth) => {
        const currentKey = keyCount;
        keyCount += 1;
        return (
          <button
            key={currentKey}
            className={`${styles.daysOfMonthCell} ${
              Number(format(dateTime, 'dd')) === dayOfMonth ? styles.selectedDay : ''
            }`}
            onClick={(e) => dispatch({ type: 'set-date-time', value: { date: Number(e.target.textContent) } })}>
            <p className={styles.day}>{dayOfMonth}</p>
          </button>
        );
      })}
    </div>
  );
}
