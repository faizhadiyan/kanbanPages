// import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { CSSProperties } from '../../../../types'
import TaskForm from './TaskForm'
// import { useTasksAction } from '../../hooks/Tasks'

interface TaskModalProps {
  headingTitle: string
  type: string // Ditambahkan
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  defaultProgressOrder: number
  taskX: number
}

const TaskModal = ({
  headingTitle,
  type, // Ditambahkan
  setIsModalOpen,
  defaultProgressOrder,
  taskX,
}: TaskModalProps): JSX.Element => {
  return (
    <div style={styles.container} data-testid="task-modal">
      <div style={styles.modalTop}>
        <h1>{headingTitle}</h1>
        <span
          className="material-icons"
          style={styles.icon}
          onClick={(): void => {
            setIsModalOpen(false)
          }}
          data-testid="close-modal-button"
        >
          close
        </span>
      </div>
      <TaskForm
        type={type}
        defaultProgressOrder={defaultProgressOrder}
        setIsModalOpen={setIsModalOpen}
        taskX={taskX} // Ditambahkan
      />
    </div>
  )
}

const styles: CSSProperties = {
  container: {
    border: '1px solid gray',
    position: 'fixed',
    top: '20%',
    left: '40%',
    width: '25%',
    backgroundColor: '#fff',
    padding: '28px',
    zIndex: 10,
  },
  modalTop: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    cursor: 'pointer',
  },
}

export default TaskModal
