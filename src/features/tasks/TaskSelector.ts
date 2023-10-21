import { selector } from 'recoil'
import { tasksState, tasksFilterState } from './TaskAtoms'
import type { Task } from '../../types'
import { SelectorKeys } from '../../constants/recoilKeys'

export const uncompletedTasksSelector = selector<Task[]>({
  // key: 'uncompleted_tasks', // Raw String
  key: SelectorKeys.UNCOMPLETED_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder !== 4
    })
  },
})

export const notStartedTasksSelector = selector<Task[]>({
  // key: 'notstarted_tasks',
  key: SelectorKeys.NOT_STARTED_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 1
    })
  },
})

export const inProgressTasksSelector = selector<Task[]>({
  key: SelectorKeys.IN_PROGRESS_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 2
    })
  },
})

export const waitingTasksSelector = selector<Task[]>({
  key: SelectorKeys.WAITING_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 3
    })
  },
})

export const completedTasksSelector = selector<Task[]>({
  key: SelectorKeys.COMPLETED_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 4
    })
  },
})

export const filteredTasks = selector({
  key: 'filteredTasks',
  get: ({ get }) => {
    const filter = get(tasksFilterState)
    const tasks = get(tasksState)

    // Menghasilkan state yang diperbarui berdasarkan nilai filter
    if (filter === 'all') return tasks
    if (filter === 'uncompleted') return tasks.filter((task) => task.progressOrder !== 4)
    if (filter === 'completed') return tasks.filter((task) => task.progressOrder === 4)
    return tasks.filter((task) => task.progressOrder === 1 && 2 && 3 && 4)
  },
})
