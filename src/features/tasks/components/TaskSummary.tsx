// import React from 'react'
import { useRecoilValue } from 'recoil'
// import { tasksState } from '../TaskAtoms'
import { completedTasksSelector, uncompletedTasksSelector } from '../TaskSelector'
import type { Task, CSSProperties } from '../../../types/index'

const TaskSummary = (): JSX.Element => {
  // const tasks: Task[] = useRecoilValue(tasksState)

  const completedTasks = useRecoilValue<Task[]>(completedTasksSelector)
  const uncompletedTasks = useRecoilValue<Task[]>(uncompletedTasksSelector)

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Summary of Your Tasks</h1>
      <div style={styles.list}>
        <span className="material-icons">check_circle</span>
        <h2>
          You have completed {completedTasks.length} {completedTasks.length <= 1 ? 'task' : 'tasks'}
        </h2>
      </div>
      <div style={styles.list}>
        <span className="material-icons">list</span>
        <h2>
          You still have {uncompletedTasks.length} {uncompletedTasks.length <= 1 ? 'task' : 'tasks'}{' '}
          left
        </h2>
      </div>
    </div>
  )
}

const styles: CSSProperties = {
  container: {
    padding: '40px',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
  },
  list: {
    color: '#fff',
    backgroundColor: '#55C89F',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
    width: '60%',
  },
}

export default TaskSummary
