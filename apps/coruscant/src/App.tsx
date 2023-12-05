import { Routes, Route } from 'react-router-dom';
import { NavMenu, PageNotFound } from '@musclemotion/components';
import { useRecoilState } from 'recoil';
import Dashboard from './pages/dashboard/Dashboard';
import { navAtom } from './recoil/Nav';
import { NavItem } from '@musclemotion/types';
import styled from 'styled-components';
import { MdDashboard, MdInventory } from 'react-icons/md';
import { FaUser, FaListUl, FaRegPlusSquare } from 'react-icons/fa';

import ProductListContainer from './pages/productList/ProductListContainer';
import ProductAddContainer from './pages/productAdd/ProductAddContainer';
import Inventory from './pages/Inventory/Inventory';

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
    {
      icon: <FaRegPlusSquare />,
      title: 'Product Add',
      route: '/product-add',
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
          <Route path="product-list" element={<ProductListContainer />} />
          <Route path="product-add" element={<ProductAddContainer />} />

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
    width: 100%;
  }
`;
