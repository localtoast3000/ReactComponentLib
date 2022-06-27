import styles from './dashboard.module.css';
import AddTaskBtn from './components/add_task_btn/add_task_btn';
import Task from './components/task/task';
import { useEffect, useState } from 'react';
import { generateLightColorHex, generateDarkColorHex } from '../../lib/colorGenerators';
import testTasks from './test_tasks.json';

export default function Dashboard ({ darkMode }) {
  const [letterBgColor, setLetterBgColor] = useState(darkMode ? generateLightColorHex() : generateDarkColorHex());;

  return (
    <div className={ styles.dashboardContainer }>
      <div className={ styles.tasksContainer }>
        { testTasks.map((task) => {
          return <Task letterBgColor={ letterBgColor } created={ task.created } ends={ task.ends } task={ task.task } />;
        }) }
      </div>
      <AddTaskBtn />
    </div>
  );
}
