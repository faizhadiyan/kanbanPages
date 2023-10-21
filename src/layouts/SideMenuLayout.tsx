import { Outlet } from 'react-router-dom'
import SideMenu from '../components/SideMenu'

const SideMenuLayout = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideMenu />
      <Outlet />
    </div>
  )
}

export default SideMenuLayout
