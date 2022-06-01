import { useEffect, useState } from 'react';
import { DateTimeContextProvider, useDateTime } from './contexts/date_time_context';
import Input from './input/input';
import Picker from './picker/picker';
import styles from './date_picker.module.css';
import font from './fonts/primary/primary_font.module.css';
import format from 'date-fns/format';

export default function DateTimePicker() {
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <DateTimeContextProvider>
      <div className={`${styles.DTPickerContainer} ${font.primaryReg}`}>
        <Input openPicker={openPicker} setOpenPicker={setOpenPicker} />
        <Picker openPicker={openPicker} setOpenPicker={setOpenPicker} />
      </div>
    </DateTimeContextProvider>
  );
}
