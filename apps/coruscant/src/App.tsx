import { Routes, Route } from 'react-router-dom';
import { NavMenu, PageNotFound } from '@musclemotion/components';
import { useRecoilState } from 'recoil';
import Dashboard from './pages/dashboard/Dashboard';
import { navAtom } from './recoil/Nav';
import { NavItem } from '@musclemotion/types';
import styled from 'styled-components';
import Inventory from './pages/Inventory/Inventory';
import ProductList from './pages/productList/ProductList';

import { MdDashboard, MdInventory } from 'react-icons/md';
import { FaUser, FaListUl } from 'react-icons/fa';

function App() {
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
      route: '/',
    },
    {
      icon: <MdInventory />,
      title: 'Inventory',
      route: '/inventory',
    },
    {
      icon: <FaListUl />,
      title: 'Product List',
      route: '/product-list',
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
          <Route path="inventory" element={<Inventory />} />
          <Route path="product-list" element={<ProductList />} />

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
