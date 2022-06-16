import { useState, useEffect } from 'react';
import styles from './calendar.module.css';
import { useDate } from '../../../../contexts/date_context';
import { getDaysInMonth, getDay, set, format } from 'date-fns';

export default function Calendar() {
  const [state, dispatch] = useDate();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.weekdaysContainer}>
        <WeekdayCells />
      </div>
      <div className={styles.daysOfMonthContainer}>
        <DaysOfMonthCells date={state.date} dispatch={dispatch} />
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

function DaysOfMonthCells({ date, dispatch }) {
  const weekdayPadding = [...Array(getDay(set(date, { date: 1 })))];
  const daysOfTheMonth = Array.from({ length: getDaysInMonth(date) }, (_, i) => i + 1);
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
              Number(format(date, 'dd')) === dayOfMonth ? styles.selectedDay : ''
            }`}
            onClick={(e) => dispatch({ type: 'set-date', value: { date: Number(e.target.textContent) } })}>
            <p className={styles.day}>{dayOfMonth}</p>
          </button>
        );
      })}
    </div>
  );
}
