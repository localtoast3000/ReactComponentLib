import { Link } from 'react-router-dom';
import styles from './add_task_btn.module.css';

export default function AddTaskBtn() {
  return (
    <Link to='/newtask'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={styles.btnSvgContainer}
        width='163'
        height='163'
        viewBox='0 0 163 163'>
        <circle className={styles.bgCircle} cx='81.5' cy='81.5' r='81.5' />
        <rect className={styles.plusIcon} x='79' y='36' width='5' height='90' rx='2.5' />
        <rect className={styles.plusIcon} x='36' y='84' width='5' height='92' rx='2.5' transform='rotate(-90 36 84)' />
      </svg>
    </Link>
  );
}
