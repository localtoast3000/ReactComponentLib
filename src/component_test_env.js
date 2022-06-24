import { useState } from 'react';
import ConsoleLogger from './components/console_logger/console_logger';
import DarkModeSwitch from './components/dark_mode_switch/dark_mode_switch';
import DateTimePicker from './components/date_time_picker/date_time_picker';
import styles from './main.module.css';
import theme from './theme.module.css';

export default function ComponentTestEnvironment({}) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${styles.mainContainer} ${darkMode ? theme.dark : theme.light}`}>
      {/* <ConsoleLogger /> */}
      <nav className={styles.controlPanel}>
        <div className={styles.leftContainer}></div>
        <DarkModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      </nav>
      <header className={styles.headerContainer}></header>
      <section className={styles.content}>
        <div className={styles.componentContainer}>
          <DateTimePicker
            hr24={false}
            darkMode={darkMode}
            dateFormat={'dd/MM/yyyy'}
            yearRange={[1955, 2232]}
            getValue={({ dateInstance, inputValue }) => {
              console.log(dateInstance);
            }}
          />
        </div>
      </section>
      <footer></footer>
    </div>
  );
}
