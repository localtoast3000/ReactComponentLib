import DateTimePicker from './components/date_time_picker/date_time_picker';
import styles from './main.module.css';
import dark from './themes/dark_theme.module.css';
import light from './themes/light_theme.module.css';

export default function ComponentTestEnvironment({ darkMode = false }) {
  return (
    <div className={`${styles.mainContainer} ${darkMode ? dark.theme : light.theme}`}>
      <header></header>
      <section className={styles.content}>
        <div className={styles.componentContainer}>
          <DateTimePicker
            hr24={false}
            format={{
              date: 'dd/MM/yyyy',
              time: 'HH:mm',
            }}
            yearRange={[1922, 2122]}
            getValue={({ dateInstance, inputValue }) => {
              console.log(dateInstance);
            }}
            darkMode={darkMode}
          />
        </div>
      </section>
      <footer></footer>
    </div>
  );
}
