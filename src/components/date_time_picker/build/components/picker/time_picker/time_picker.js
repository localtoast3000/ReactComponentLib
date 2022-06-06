import { useState, useEffect } from 'react';
import styles from './time_picker.module.css';
import { useDateTime } from '../../../contexts/date_time_context';
import { format } from 'date-fns';

export default function TimePicker({ pickerType, hr24 }) {
  const [state, dispatch] = useDateTime();
  const [timeOfDay, setTimeOfDay] = useState(
    format(state.dateTime, 'HH') > 12 ? (hr24 ? 'N' : 'PM') : hr24 ? 'M' : 'AM'
  );
  const [mouseDown, setMouseDown] = useState(false);

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
    if ((timeOfDay === 'AM' || timeOfDay === 'M') && currentHour > 12) {
      dispatch({ type: 'set-date-time', value: { hours: currentHour - 12 } });
      return;
    }
    if ((timeOfDay === 'PM' || timeOfDay === 'N') && Number(format(state.dateTime, 'HH')) < 12) {
      dispatch({ type: 'set-date-time', value: { hours: currentHour + 12 } });
      return;
    }
  }, [timeOfDay]);

  const mousedownHandler = (e) => {
    setMouseDown(true);
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
                className={`${styles.AMbtn} ${
                  timeOfDay === 'AM' || timeOfDay === 'M' ? styles.timeOfDayBtnSelected : ''
                }`}
                onClick={() => {
                  hr24 ? setTimeOfDay('M') : setTimeOfDay('AM');
                }}>
                {hr24 ? 'M' : 'AM'}
              </button>
              <button
                type='button'
                className={`${styles.PMbtn} ${
                  timeOfDay === 'PM' || timeOfDay === 'N' ? styles.timeOfDayBtnSelected : ''
                }`}
                onClick={() => {
                  hr24 ? setTimeOfDay('N') : setTimeOfDay('PM');
                }}>
                {hr24 ? 'N' : 'PM'}
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
  const hours = timeOfDay === 'AM' || timeOfDay === 'M' ? AM : PM;
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
              className={`${styles.hourBtn} ${selectedHour === value ? styles.selected : ''} `}
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
                    transform: `rotate(${currentDeg}deg) scale(0.9)`,
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
              `}
              value={value}
              onClick={(e) => {
                if (e.target.textContent === '-') {
                  const onesPlace = Number(String(e.target.value).split('').slice(-1));
                  if (onesPlace <= 2) {
                    dispatch({ type: 'set-date-time', value: { minutes: Math.floor(e.target.value / 5) * 5 } });
                    return;
                  }
                  if (onesPlace >= 3 && onesPlace < 5) {
                    dispatch({ type: 'set-date-time', value: { minutes: Math.round(e.target.value / 5) * 5 } });
                    return;
                  }
                  if (onesPlace <= 7 && onesPlace > 5) {
                    dispatch({ type: 'set-date-time', value: { minutes: Math.floor(e.target.value / 5) * 5 } });
                    return;
                  }
                  if (onesPlace >= 8 && onesPlace < 10) {
                    dispatch({ type: 'set-date-time', value: { minutes: Math.round(e.target.value / 5) * 5 } });
                    return;
                  }
                }
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
