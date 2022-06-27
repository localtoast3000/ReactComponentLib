import styles from './year_picker.module.css';
import { useDateTime } from '../../../../contexts/date_time_context';
import { format } from 'date-fns';

export default function YearPicker({ range }) {
  const [state, dispatch] = useDateTime();
  const years = Array.from({ length: range[1] + 1 - range[0] }, (_, i) => range[0] + i);
  let keyCount = 0;

  return (
    <div className={styles.yearPickerContainer}>
      <div className={styles.yearsGrid}>
        {years.map((year) => {
          const currentKey = keyCount;
          keyCount += 1;
          return (
            <button
              key={currentKey}
              className={`${styles.yearBtn} ${
                Number(format(state.dateTime, 'yyyy')) === year ? styles.selectedYear : ''
              }`}
              onClick={(e) => dispatch({ type: 'set-date-time', value: { year: Number(e.target.textContent) } })}>
              <p className={styles.year}>{year}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
