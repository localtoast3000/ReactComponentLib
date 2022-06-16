import styles from './year_picker.module.css';
import { useDate } from '../../../../contexts/date_context';
import { format } from 'date-fns';

export default function YearPicker({ range }) {
  const [state, dispatch] = useDate();
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
              className={`${styles.yearBtn} ${Number(format(state.date, 'yyyy')) === year ? styles.selectedYear : ''}`}
              onClick={(e) => dispatch({ type: 'set-date', value: { year: Number(e.target.textContent) } })}>
              <p className={styles.year}>{year}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
