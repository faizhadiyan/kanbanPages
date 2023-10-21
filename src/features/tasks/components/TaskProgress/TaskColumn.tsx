import { useState } from 'react' // useState ditambahkan
import TaskCard from './TaskCard'
import type { Task, CSSProperties } from '../../../../types'
import TaskModal from '../shared/TaskModal'
import { TASK_MODAL_TYPE } from '../../../../constants/app'

interface TaskColumnProps {
  columnTitle: string
  tasks: Task[]
  progressID: number
}

const TaskColumn = ({ columnTitle, tasks, progressID }: TaskColumnProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div style={styles.categoryColumn}>
      <div style={styles.columnTitleWrapper}>
        <h2 style={styles.categoryTitle}>{columnTitle}</h2>
        <div
          className="material-icons"
          style={styles.plusIcon}
          onClick={(): void => {
            setIsModalOpen(true) // Ditambahkan
          }}
        >
          add
        </div>
      </div>
      <div>
        {tasks.map((task: Task) => {
          return <TaskCard key={task.id} task={task} />
        })}
        {isModalOpen && (
          <TaskModal
            headingTitle="Add your task"
            type={TASK_MODAL_TYPE.ADD} // Ditambahkan
            setIsModalOpen={setIsModalOpen}
            defaultProgressOrder={progressID}
            taskX={1}
          />
        )}
      </div>
    </div>
  )
}

const styles: CSSProperties = {
  plusIcon: {
    cursor: 'pointer',
  },
  categoryColumn: {
    width: '22%',
  },
  columnTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px',
  },
}

export default TaskColumn
