import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { CSSProperties } from '../../../../types'
import TaskModal from '../shared/TaskModal' // Ditambahkan
import { TASK_MODAL_TYPE } from '../../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'

// import { useRecoilState } from 'recoil'
// import TaskColumn from '../TaskProgress/TaskColumn'
// import { tasksState } from '../../TaskAtoms'
// import TaskForm from './TaskForm'

interface TaskMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  taskX: number
  progressCat: number
}

const TaskMenu = ({ setIsMenuOpen, taskX, progressCat }: TaskMenuProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { deleteTask } = useTasksAction()
  const deleteTasks = (): void => {
    deleteTask(taskX)
  }

  return (
    <div style={styles.menu} data-testid="task-menu">
      <div
        style={styles.menuItem}
        onClick={(): void => {
          setIsModalOpen(true) // Ditambahkan
        }}
        data-testid="edit-button"
      >
        <span className="material-icons">edit</span>
        Edit
      </div>
      <div
        style={styles.menuItem}
        onClick={(): void => {
          deleteTasks()
        }}
        data-testid="delete-button"
      >
        <span className="material-icons">delete</span>Delete
      </div>
      <span
        className="material-icons"
        style={styles.closeIcon}
        onClick={(): void => {
          setIsMenuOpen(false)
        }}
      >
        close
      </span>
      {isModalOpen && (
        <TaskModal
          headingTitle="Edit your task"
          type={TASK_MODAL_TYPE.EDIT}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={progressCat}
          taskX={taskX}
        />
      )}
    </div>
  )
}

const styles: CSSProperties = {
  menu: {
    backgroundColor: '#fff',
    border: '1px solid gray',
    padding: '8px 16px',
    position: 'absolute',
    top: '-10px',
    right: '4%',
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
    right: '2px',
    cursor: 'pointer',
  },
}

export default TaskMenu
