import React, { useState } from 'react'
import type { Task, CSSProperties } from '../../../../types'
import { TASK_PROGRESS_STATUS, TASK_PROGRESS_ID } from '../../../../constants/app'
import { useTasksAction } from '../../hooks/Tasks'
import TaskMenu from '../shared/TaskMenu'

interface TaskListItemProps {
  task: Task
}

const getIconStyle = (progressOrder: number): React.CSSProperties => {
  const color: '#55C89F' | '#C5C5C5' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5'

  const cursor: 'default' | 'pointer' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer'

  return {
    color,
    cursor,
    fontSize: '28px',
    marginRight: '6px',
  }
}

const getProgressCategory = (progressOrder: number): string => {
  switch (progressOrder) {
    case TASK_PROGRESS_ID.NOT_STARTED:
      return TASK_PROGRESS_STATUS.NOT_STARTED
    case TASK_PROGRESS_ID.IN_PROGRESS:
      return TASK_PROGRESS_STATUS.IN_PROGRESS
    case TASK_PROGRESS_ID.WAITING:
      return TASK_PROGRESS_STATUS.WAITING
    case TASK_PROGRESS_ID.COMPLETED:
      return TASK_PROGRESS_STATUS.COMPLETED
    default:
      return TASK_PROGRESS_STATUS.NOT_STARTED
  }
}

const TaskListItem = ({ task }: TaskListItemProps): JSX.Element => {
  // // Ditambahkan
  // const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  // // Definisikan function ini
  // const completeTask = (taskId: number): void => {
  //   const updatedTasks: Task[] = tasks.map((task) =>
  //     task.id === taskId ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED } : task
  //   )
  //   setTasks(updatedTasks)
  // }

  const { completeTask } = useTasksAction() //Ditambahkan
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <div style={styles.tableBody} data-testid="task-list-item">
      <div style={styles.tableBodyTaskTitle}>
        <span
          className="material-icons"
          style={getIconStyle(task.progressOrder)}
          onClick={(): void => {
            completeTask(task.id)
          }}
        >
          check_circle
        </span>
        {task.title}
      </div>
      <div style={styles.tableBodyDetail}>{task.detail}</div>
      <div style={styles.tableBodyDueDate}>{task.dueDate}</div>
      <div style={styles.tableBodyprogress}>{getProgressCategory(task.progressOrder)}</div>
      <div>
        <span
          className="material-icons"
          style={styles.menuIcon}
          onClick={(): void => {
            setIsMenuOpen(true) // Ditambahkan
          }}
          data-testid="task-menu-button"
        >
          more_horiz
        </span>
      </div>
      {isMenuOpen && (
        <TaskMenu setIsMenuOpen={setIsMenuOpen} taskX={task.id} progressCat={task.progressOrder} />
      )}
    </div>
  )
}

const styles: CSSProperties = {
  tableBody: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #D8D8D8',
    fontSize: '20px',
    position: 'relative',
  },
  tableBodyTaskTitle: {
    width: '15%',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    overflowWrap: 'anywhere',
    borderRight: '1px solid #D8D8D8',
  },
  tableBodyDetail: {
    width: '30%',
    padding: '16px',
    overflowWrap: 'anywhere',
    borderRight: '1px solid #D8D8D8',
  },
  tableBodyDueDate: {
    width: '10%',
    padding: '16px',
    borderRight: '1px solid #D8D8D8',
  },
  tableBodyprogress: {
    width: '15%',
    padding: '16px',
  },
  menuIcon: {
    cursor: 'pointer',
  },
}

export default TaskListItem
