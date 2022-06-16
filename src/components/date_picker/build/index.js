import { useState } from 'react';
import { DateContextProvider } from './contexts/date_context';
import Input from './components/input/input';
import Picker from './components/picker/picker';
import styles from './date_picker.module.css';
import theme from '../css_variubles/theme.module.css';
import typography from '../css_variubles/typography.module.css';

export default function DatePicker({ getValue, dateFormat, yearRange, darkMode }) {
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <DateContextProvider>
      <div className={`${styles.DPickerContainer} ${typography.typography} ${darkMode ? theme.dark : theme.light}`}>
        <Input openPicker={openPicker} setOpenPicker={setOpenPicker} getValue={getValue} dateFormat={dateFormat} />
        <Picker openPicker={openPicker} setOpenPicker={setOpenPicker} yearRange={yearRange} />
      </div>
    </DateContextProvider>
  );
}
