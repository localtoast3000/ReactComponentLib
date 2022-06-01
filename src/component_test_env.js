import DateTimePicker from './components/date_time_picker/date_time_picker';
import Input from './components/input/input';
import styles from './main.module.css';

export default function ComponentTestEnvironment() {
  return (
    <div className={styles.mainContainer}>
      <header></header>
      <section className={styles.content}>
        <div className={styles.componentContainer}>
          <DateTimePicker />
        </div>
      </section>
      <footer></footer>
    </div>
  );
}
