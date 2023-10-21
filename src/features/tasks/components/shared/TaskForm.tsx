import { useState, useEffect } from 'react'
// import { useRecoilValue } from 'recoil'
import {
  TASK_PROGRESS_ID,
  TASK_PROGRESS_STATUS,
  TASK_MODAL_TYPE, // Ditambahkan
} from '../../../../constants/app'
import type { CSSProperties } from '../../../../types'
import { useTasksAction } from '../../hooks/Tasks'
import type { Dispatch, SetStateAction } from 'react'
// import { tasksState } from '../../TaskAtoms'

interface TaskFormProps {
  type: string // Ditambahkan
  defaultProgressOrder: number
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  taskX: number
}

const TaskForm = ({
  type,
  defaultProgressOrder,
  setIsModalOpen,
  taskX,
}: TaskFormProps): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [progressOrder, setProgressOrder] = useState<number>(defaultProgressOrder)

  const { addTask, editTask, readInitialValue } = useTasksAction()

  // if (type === TASK_MODAL_TYPE.EDIT) {
  //   console.log(readInitialValue(taskX))
  // }

  const { initialTitle, initialDetail, initialDueDate, initialProgressOrder } =
    readInitialValue(taskX)

  useEffect(() => {
    if (type === TASK_MODAL_TYPE.EDIT) {
      setTitle(initialTitle)
      setDetail(initialDetail)
      setDueDate(initialDueDate)
      setProgressOrder(initialProgressOrder)
    }
  }, [type, taskX, initialTitle, initialDetail, initialDueDate, initialProgressOrder])

  // const handleSubmit = (): void => {
  //   if (type === TASK_MODAL_TYPE.ADD) {
  //     addTask(title, detail, dueDate, progressOrder)
  //     setIsModalOpen(false) // Ditambahkan
  //   }
  //   if (type === TASK_MODAL_TYPE.EDIT) {
  //     addTask(title, detail, dueDate, progressOrder)
  //     setIsModalOpen(false) // Ditambahkan
  //   }
  // }

  const handleSubmit = (): void => {
    if (type === TASK_MODAL_TYPE.ADD) {
      addTask(title, detail, dueDate, progressOrder)
      setIsModalOpen(false)
    } else if (type === TASK_MODAL_TYPE.EDIT) {
      editTask(taskX, title, detail, dueDate, progressOrder)
      setIsModalOpen(false)
    }
  }

  return (
    <form style={styles.form}>
      <div style={styles.formItem}>
        <label>Title：</label>
        <input
          type="text"
          value={title}
          onChange={(e): void => {
            if (
              type === TASK_MODAL_TYPE.ADD ||
              (type === TASK_MODAL_TYPE.EDIT && e.target.value !== initialTitle)
            ) {
              setTitle(e.target.value)
            }
          }}
          style={styles.formInput}
          data-testid="title-input"
        />
      </div>
      <div style={styles.formItem}>
        <label>Detail：</label>
        <textarea
          value={detail}
          onChange={(e): void => {
            if (
              type === TASK_MODAL_TYPE.ADD ||
              (type === TASK_MODAL_TYPE.EDIT && e.target.value !== initialDetail)
            ) {
              setDetail(e.target.value)
            }
          }}
          style={styles.formTextArea}
          data-testid="detail-input"
        />
      </div>
      <div style={styles.formItem}>
        <label>Due Date：</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e): void => {
            if (
              type === TASK_MODAL_TYPE.ADD ||
              (type === TASK_MODAL_TYPE.EDIT && e.target.value !== initialDueDate)
            ) {
              setDueDate(e.target.value)
            }
          }}
          style={styles.formInput}
          data-testid="due-date-input"
        />
      </div>
      <div style={styles.formItem}>
        <label>Progress：</label>
        <select
          style={styles.formInput}
          defaultValue={progressOrder}
          onChange={(e): void => {
            if (
              type === TASK_MODAL_TYPE.ADD ||
              (type === TASK_MODAL_TYPE.EDIT && Number(e.target.value) !== initialProgressOrder)
            ) {
              setProgressOrder(Number(e.target.value))
            }
          }}
          data-testid="progress-select"
        >
          <option
            value={TASK_PROGRESS_ID.NOT_STARTED}
            selected={progressOrder === TASK_PROGRESS_ID.NOT_STARTED}
          >
            {TASK_PROGRESS_STATUS.NOT_STARTED}
          </option>
          <option
            value={TASK_PROGRESS_ID.IN_PROGRESS}
            selected={progressOrder === TASK_PROGRESS_ID.IN_PROGRESS}
          >
            {TASK_PROGRESS_STATUS.IN_PROGRESS}
          </option>
          <option
            value={TASK_PROGRESS_ID.WAITING}
            selected={progressOrder === TASK_PROGRESS_ID.IN_PROGRESS}
          >
            {TASK_PROGRESS_STATUS.WAITING}
          </option>
          <option
            value={TASK_PROGRESS_ID.COMPLETED}
            selected={progressOrder === TASK_PROGRESS_ID.COMPLETED}
          >
            {TASK_PROGRESS_STATUS.COMPLETED}
          </option>
        </select>
      </div>
      <button
        type="button"
        style={styles.button}
        onClick={(): void => {
          handleSubmit() // Ditambahkan
        }}
        data-testid="task-modal-submit-button"
      >
        Submit
      </button>
    </form>
  )
}

const styles: CSSProperties = {
  form: {
    fontSize: '24px',
  },
  formItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  formInput: {
    height: '40px',
    fontSize: '20px',
  },
  formTextArea: {
    height: '80px',
    fontSize: '20px',
  },
  button: {
    backgroundColor: '#55C89F',
    color: '#fff',
    fontSize: '20px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
  },
}

export default TaskForm
