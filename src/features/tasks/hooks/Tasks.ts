import { useRecoilState } from 'recoil'
import { tasksState } from '../TaskAtoms'
import type { Task } from '../../../types'
import { TASK_PROGRESS_ID } from '../../../constants/app'

interface useTaskActionType {
  completeTask: (taskId: number) => void
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void
  // Ditambahkan
  addTask: (title: string, detail: string, dueDate: string, progressOrder: number) => void
  editTask: (
    id: number,
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number
  ) => void
  deleteTask: (id: number) => void
  readInitialValue: (taskX: number) => {
    initialTitle: string
    initialDetail: string
    initialDueDate: string
    initialProgressOrder: number
  }
}

// Dalam hal ini, kita mendefinisikan hook bernama useTasksAction dan ini akan menghasilkan nilai return berupa function yang akan memanipulasi state dari task-task (yaitu: complete, add, delete, edit ...).

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED } : task
    )
    setTasks(updatedTasks)
  }

  const moveTaskCard = (taskId: number, directionNumber: 1 | -1): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: task.progressOrder + directionNumber } : task
    )
    setTasks(updatedTasks)
  }

  const addTask = (title: string, detail: string, dueDate: string, progressOrder: number): void => {
    setTasks((prevTasks) => {
      const newTask: Task = {
        id: prevTasks.length + 1,
        title,
        detail,
        dueDate,
        progressOrder,
      }
      return [...prevTasks, newTask]
    })
  }

  const editTask = (
    id: number,
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number
  ): void => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === id ? { ...task, title, detail, dueDate, progressOrder } : task
      )
    })
  }

  const deleteTask = (id: number): void => {
    // Make sure to update the implementation according to your actual data structure
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  // const readInitialValue = (taskX: number): void => {
  //   const initialTitle = tasks[taskX].title
  //   const initialDetail = tasks[taskX].detail
  //   const initialDueDate = tasks[taskX].dueDate
  //   const initialProgressOrder = tasks[taskX].progressOrder

  //   const updatedTasks: Task[] = tasks.map((task) =>
  //     task.id === taskX
  //       ? {
  //           ...task,
  //           title: initialTitle,
  //           detail: initialDetail,
  //           dueDate: initialDueDate,
  //           progressOrder: initialProgressOrder,
  //         }
  //       : task
  //   )
  //   setTasks(updatedTasks)
  // }

  const readInitialValue = (
    taskX: number
  ): {
    initialTitle: string
    initialDetail: string
    initialDueDate: string
    initialProgressOrder: number
  } => {
    const task = tasks.find((task) => task.id === taskX)
    if (task) {
      const { title, detail, dueDate, progressOrder } = task
      return {
        initialTitle: title,
        initialDetail: detail,
        initialDueDate: dueDate,
        initialProgressOrder: progressOrder,
      }
    }
    return { initialTitle: '', initialDetail: '', initialDueDate: '', initialProgressOrder: 0 }
  }

  return {
    completeTask,
    moveTaskCard,
    addTask,
    editTask,
    deleteTask,
    readInitialValue,
  }
}
