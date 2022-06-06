import { useState } from 'react';
import { DateTimeContextProvider } from './contexts/date_time_context';
import Input from './components/input/input';
import Picker from './components/picker/picker';
import styles from './date_time_picker.module.css';
import theme from '../css_variubles/theme.module.css';
import typography from '../css_variubles/typography.module.css';

export default function DateTimePicker({ getValue, format, yearRange, hr24, darkMode }) {
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <DateTimeContextProvider>
      <div className={`${styles.DTPickerContainer} ${typography.typography} ${darkMode ? theme.dark : theme.light}`}>
        <Input openPicker={openPicker} setOpenPicker={setOpenPicker} getValue={getValue} formats={format} hr24={hr24} />
        <Picker openPicker={openPicker} setOpenPicker={setOpenPicker} yearRange={yearRange} hr24={hr24} />
      </div>
    </DateTimeContextProvider>
  );
}
