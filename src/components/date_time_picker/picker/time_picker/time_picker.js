import { useState, useEffect, useRef } from 'react';
import styles from './time_picker.module.css';
import font from '../../fonts/primary/primary_font.module.css';
import { useDateTime } from '../../contexts/date_time_context';
import { format } from 'date-fns';

export default function TimePicker({ pickerType }) {
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [state, dispatch] = useDateTime();

  useEffect(() => {
    document.addEventListener('mousedown', mousedownHandler);
    return () => {
      document.removeEventListener('mousedown', mousedownHandler);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
    return () => {
      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseup', mousedownHandler);
    };
  }, [mouseDown]);

  useEffect(() => {
    const currentHour = Number(format(state.dateTime, 'HH'));
    console.log(currentHour);
    if (timeOfDay === 'AM' && currentHour > 12) {
      dispatch({ type: 'set-date-time', value: { hours: currentHour - 12 } });
      return;
    }
    if (timeOfDay === 'PM' && Number(format(state.dateTime, 'HH')) < 12) {
      dispatch({ type: 'set-date-time', value: { hours: currentHour + 12 } });
      return;
    }
    // if (timeOfDay === 'AM' && Number(format(state.dateTime, 'HH')) === 0) {
    //   console.log(state);
    //   dispatch({ type: 'start-of-day' });
    //   return;
    // }
    // if (timeOfDay === 'PM' && Number(format(state.dateTime, 'HH')) === 12) {
    //   console.log(state);
    //   dispatch({ type: 'end-of-day' });
    //   return;
    // }
  }, [timeOfDay]);

  const mousedownHandler = (e) => {
    for (let c of e.target.classList) {
      if (c === styles.selected) {
        setMouseDown(true);
      }
    }
  };
  const mousemoveHandler = (e) => {
    if (mouseDown && e.target.classList) {
      for (let c of e.target.classList) {
        if (c === styles.hourBtn) {
          dispatch({ type: 'set-date-time', value: { hours: e.target.value } });
          return;
        }
        if (c === styles.clockArm) {
          dispatch({
            type: 'set-date-time',
            value:
              pickerType === 'hours'
                ? { hours: e.target.childNodes[0].value }
                : { minutes: e.target.childNodes[0].value },
          });
          return;
        }
        if (c === styles.division || c === styles.wholeNumber) {
          dispatch({ type: 'set-date-time', value: { minutes: e.target.value } });
        }
      }
    }
  };
  const mouseupHandler = (e) => {
    setMouseDown(false);
  };

  return (
    <div className={styles.timePickerContainer}>
      <div className={styles.currentFaceContainer}>
        {pickerType === 'hours' ? (
          <>
            <HoursFace timeOfDay={timeOfDay} selectedHour={Number(format(state.dateTime, 'HH'))} dispatch={dispatch} />
            <div className={styles.timeOfDaySelectors}>
              <button
                type='button'
                className={`${styles.AMbtn} ${timeOfDay === 'AM' ? styles.timeOfDayBtnSelected : ''}`}
                onClick={() => {
                  setTimeOfDay('AM');
                }}>
                AM
              </button>
              <button
                type='button'
                className={`${styles.PMbtn} ${timeOfDay === 'PM' ? styles.timeOfDayBtnSelected : ''}`}
                onClick={() => {
                  setTimeOfDay('PM');
                }}>
                PM
              </button>
            </div>
          </>
        ) : (
          <MinsFace selectedMins={Number(format(state.dateTime, 'mm'))} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
}

function HoursFace({ timeOfDay, selectedHour, dispatch }) {
  const AM = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (h = { render: h, value: Number(h) }));
  const PM = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0].map((h) => (h = { render: h, value: Number(h) }));
  const hours = timeOfDay === 'AM' ? AM : PM;
  const fraction = 360 / 12;
  let degCount = fraction;

  return (
    <div className={styles.hoursFace}>
      {hours.map(({ render, value }) => {
        const currentDeg = degCount;

        degCount += fraction;
        return (
          <div
            key={currentDeg}
            style={{
              transformOrigin: 'bottom',
              transform: `rotate(${currentDeg}deg) scale(0.9)`,
            }}
            onClick={(e) => {
              dispatch({ type: 'set-date-time', value: { hours: e.target.childNodes[0].value } });
            }}
            className={`${styles.clockArm} ${selectedHour === value ? styles.selected : ''}`}>
            <button
              style={{
                transform: `rotate(${-currentDeg}deg)`,
              }}
              value={value}
              className={`${styles.hourBtn} ${selectedHour === value ? styles.selected : ''} ${font.primaryReg}`}
              onClick={(e) => {
                dispatch({ type: 'set-date-time', value: { hours: e.target.value } });
              }}>
              {render === 0 ? '00' : render}
            </button>
          </div>
        );
      })}
      <div className={styles.center}></div>
    </div>
  );
}

function MinsFace({ selectedMins, dispatch }) {
  const mins = [...Array(60).keys()].map((m) => (m = { render: m === 0 || m % 5 === 0 ? m : '-', value: m }));
  const fraction = 360 / 60;
  let degCount = fraction;

  return (
    <div className={styles.minsFace}>
      {mins.map(({ render, value }) => {
        const currentDeg = degCount;

        degCount += fraction;
        return (
          <div
            key={currentDeg}
            style={
              render === '-'
                ? {
                    transformOrigin: 'bottom',
                    transform: `rotate(${currentDeg}deg) scale(0.9)`,
                  }
                : {
                    transformOrigin: 'bottom',
                    transform: `rotate(${currentDeg}deg) scale(0.95)`,
                  }
            }
            className={`${styles.clockArm} ${selectedMins === value ? styles.selected : ''}`}
            onClick={(e) => {
              dispatch({ type: 'set-date-time', value: { minutes: e.target.childNodes[0].value } });
            }}>
            <button
              style={
                render === '-'
                  ? {
                      transform: `rotate(90deg)`,
                    }
                  : {
                      transform: `rotate(${-currentDeg + 6}deg)`,
                    }
              }
              className={`${render === '-' ? styles.division : styles.wholeNumber} ${
                selectedMins === value ? styles.selected : ''
              } 
              ${font.primaryReg}`}
              value={value}
              onClick={(e) => {
                dispatch({ type: 'set-date-time', value: { minutes: e.target.value } });
              }}>
              {render === 0 ? '00' : render}
            </button>
          </div>
        );
      })}
      <div className={styles.center}></div>
    </div>
  );
}
