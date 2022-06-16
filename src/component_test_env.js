import { useState } from 'react';
import ConsoleLogger from './components/console_logger/console_logger';
import DarkModeSwitch from './components/dark_mode_switch/dark_mode_switch';
import DatePicker from './components/date_picker/date_picker';
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
          <DatePicker
            hr24={false}
            dateFormat={'dd/MM/yyyy'}
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
