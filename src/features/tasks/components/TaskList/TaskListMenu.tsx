import { useSetRecoilState } from 'recoil'
import { tasksFilterState } from '../../TaskAtoms'
import type { CSSProperties } from '../../../../types'

const TaskListMenu = (): JSX.Element => {
  const setTaskFilter = useSetRecoilState(tasksFilterState)

  return (
    <div style={styles.menu} data-testid="filter-menu">
      <div style={styles.menuItem} onClick={() => setTaskFilter('completed')}>
        <span className="material-icons">check</span>
        Completed Tasks
      </div>
      <div style={styles.menuItem} onClick={() => setTaskFilter('uncompleted')}>
        <span className="material-icons">check</span>
        Uncompleted Tasks
      </div>
      <div style={styles.menuItem} onClick={() => setTaskFilter('all')}>
        <span className="material-icons">check</span>
        All Tasks
      </div>
    </div>
  )
}

const styles: CSSProperties = {
  menu: {
    backgroundColor: '#fff',
    border: '1px solid gray',
    padding: '8px 16px',
    position: 'absolute',
    top: '140px',
    right: '71.3%',
    zIndex: 10,
  },
  menuItem: {
    display: 'flex',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  closeIcon: {
    position: 'absolute',
    top: '0px',
    right: '4px',
    cursor: 'pointer',
  },
}

export default TaskListMenu
