import styles from './task.module.css';

export default function Task({ letterBgColor, created, ends, task }) {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.leftContainer}>
        <div style={{ backgroundColor: letterBgColor }} className={styles.previewLetterContainer}>
          <p className={styles.previewLetter}>{String(task[0]).toUpperCase()}</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.topRightContainer}>
          <div className={styles.dateTimeContainer}>
            <div className={styles.tableHeaders}>
              <p>Created: </p>
              <p>Ends: </p>
            </div>
            <div className={styles.tableValues}>
              <p className={styles.created}>{created}</p>
              <p className={styles.ends}>{ends}</p>
            </div>
          </div>
          <div className={styles.editingOptions}>
            <button className={styles.editBtn}>
              <PencilIcon />
            </button>
            <button className={styles.deleteBtn}>
              <BinIcon />
            </button>
          </div>
        </div>
        <div className={styles.taskTextContainer}>
          <p className={styles.taskText}>{task}</p>
        </div>
      </div>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg
      className={styles.pencilIcon}
      width='45'
      height='45'
      viewBox='0 0 45 45'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M40.7822 11.6556L37.8065 14.6313L30.3673 7.18286L33.343 4.20715C33.9491 3.60098 35.0053 3.60098 35.6115 4.20715L40.7822 9.3871C41.4067 10.0116 41.4067 11.0311 40.7822 11.6556ZM15.9206 36.5451L8.48144 29.0966L27.7131 9.83713L35.1523 17.2856L15.9206 36.5451ZM6.764 32.6877L12.3296 38.2626L4.57817 40.4484L6.764 32.6877ZM43.4364 6.73283L38.2657 1.55288C37.2554 0.542606 33.6093 -1.36773 30.6979 1.55288L4.49551 27.7741C4.26591 28.0037 4.10059 28.2792 4.01794 28.5915L0.0687441 42.6527C-0.114939 43.3048 0.0779283 44.0028 0.546321 44.4895C1.0239 44.9763 1.97905 45.059 2.38315 44.9671L16.4349 41.0087C16.7472 40.926 17.0227 40.7607 17.2523 40.5311L43.4364 14.3099C45.5212 12.225 45.5212 8.82685 43.4364 6.73283Z' />
    </svg>
  );
}

function BinIcon() {
  return (
    <svg
      className={styles.binIcon}
      width='34'
      height='45'
      viewBox='0 0 34 45'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M3.99042 42.8299C4.0419 44.0428 5.05369 45 6.28414 45H27.7161C28.9465 45 29.9583 44.0428 30.0098 42.8299L31.5403 10.9578H2.4599L3.99042 42.8299ZM21.8483 18.8742C21.8483 18.3664 22.2657 17.9545 22.7808 17.9545H24.2722C24.7869 17.9545 25.2047 18.3663 25.2047 18.8742V37.0835C25.2047 37.5915 24.7873 38.0033 24.2722 38.0033H22.7808C22.2659 38.0033 21.8483 37.5917 21.8483 37.0835V18.8742ZM15.322 18.8742C15.322 18.3664 15.7395 17.9545 16.2544 17.9545H17.7458C18.2605 17.9545 18.6782 18.3663 18.6782 18.8742V37.0835C18.6782 37.5915 18.2609 38.0033 17.7458 38.0033H16.2544C15.7396 38.0033 15.322 37.5917 15.322 37.0835V18.8742ZM8.79552 18.8742C8.79552 18.3664 9.21297 17.9545 9.72791 17.9545H11.2195C11.7343 17.9545 12.1518 18.3663 12.1518 18.8742V37.0835C12.1518 37.5915 11.7344 38.0033 11.2195 38.0033H9.72791C9.21308 38.0033 8.79552 37.5917 8.79552 37.0835V18.8742Z' />
      <path d='M32.5594 2.31817H22.6721V0.474255C22.6721 0.212396 22.4569 0 22.1913 0H11.8087C11.5432 0 11.328 0.212396 11.328 0.474255V2.31806H1.44063C0.644931 2.31806 0 2.95437 0 3.73929V8.20389H34V3.7394C34 2.95448 33.3551 2.31817 32.5594 2.31817Z' />
    </svg>
  );
}
