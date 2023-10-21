import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import TaskList from '../features/tasks/components/TaskList/TaskList'
import { RecoilRoot } from 'recoil'
import '@testing-library/jest-dom'

describe('TaskList Component', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <TaskList />
      </RecoilRoot>
    )
  })

  test('Filter tasks menu can be opend and closed', async () => {
    await user.click(screen.getByTestId('filter-button'))
    await waitFor(() => {
      expect(screen.getByTestId('filter-menu')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('filter-button'))
    await waitFor(() => {
      expect(screen.queryByTestId('filter-menu')).not.toBeInTheDocument()
    })
  })
})
