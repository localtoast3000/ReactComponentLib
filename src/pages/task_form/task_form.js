import styles from './task_form.module.css';
import DateTimePicker from '../../components/form_elements/date_time_picker/date_time_picker';
import Input from '../../components/form_elements/input/input';

export default function TaskForm() {
  return (
    <form className={styles.formContainer}>
      <Input />
      <DateTimePicker />
    </form>
  );
}
