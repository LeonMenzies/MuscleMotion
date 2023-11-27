import { Routes, Route } from 'react-router-dom';
// import { ProtectedRoute } from '@musclemotion/components';
import { NavMenu, PageNotFound } from '@musclemotion/components';
import { useRecoilState } from 'recoil';
// import { userAtom } from './recoil/User';

import { MdDashboard, MdInventory } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

import Dashboard from './pages/dashboard/Dashboard';

// import MuscleMotionAltLogo from './assets/images/muscle-motion.jpg';
import { navAtom } from './recoil/Nav';
import { NavItem } from '@musclemotion/types';
import styled from 'styled-components';

function App() {
  // const [user, setUser] = useRecoilState(userAtom);
  const [nav, setNav] = useRecoilState(navAtom);

  const navItems: NavItem[] = [
    {
      icon: <FaUser />,
      title: 'Leon Menzies',
      route: '/profile',
    },
    {
      icon: <MdDashboard />,
      title: 'Dashboard',
      route: '/dashboard',
    },
    {
      icon: <MdInventory />,
      title: 'Inventory',
      route: '/inventory',
    },
  ];

  return (
    <StyledApp>
      <NavMenu nav={nav} setNav={setNav} navItems={navItems} />
      <div className={'container'}>
        <Routes>
          {/* <Route
          element={
            <ProtectedRoute isAllowed={user.loggedIn} redirectPath={'/'} />
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAllowed={!user.loggedIn} redirectPath={'/'} />
          }
        >
          <Route path="login" element={<Auth />} />
        </Route> */}

          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Dashboard />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  display: flex;

  .container {
    margin-left: 50px;
  }
`;
