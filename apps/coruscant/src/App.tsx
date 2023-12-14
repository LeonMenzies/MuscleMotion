import { Routes, Route, Navigate } from 'react-router-dom';
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
import LoginContainer from './pages/login/LoginContainer';
import { defaultUser, userAtom } from './recoil/User';
import UserContainer from './pages/user/UserContainer';

function App() {
  const [nav, setNav] = useRecoilState(navAtom);
  const [user, setUser] = useRecoilState(userAtom);

  function renderElement(
    isAllowed: boolean,
    Component: React.ElementType,
    redirectPath: string
  ) {
    return isAllowed ? <Component /> : <Navigate to={redirectPath} replace />;
  }

  const navItems: NavItem[] = [
    {
      icon: <FaUser />,
      title: `${user.user.firstName} ${user.user.lastName}`,
      route: '/user',
      show: user.loggedIn,
    },
    {
      icon: <MdDashboard />,
      title: 'Dashboard',
      route: '/dashboard',
      show: true,
    },
    {
      icon: <MdInventory />,
      title: 'Inventory',
      route: '/inventory',
      show: true,
    },
    {
      icon: <FaListUl />,
      title: 'Product List',
      route: '/product-list',
      show: true,
    },
    {
      icon: <FaRegPlusSquare />,
      title: 'Product Add',
      route: '/product-add',
      show: true,
    },
  ];

  return (
    <StyledApp>
      <NavMenu
        nav={nav}
        setNav={setNav}
        navItems={navItems}
        hide={!user.loggedIn}
        logOut={() => setUser(defaultUser)}
      />
      <div className={'container'}>
        <Routes>
          <Route path="login" index element={<LoginContainer />} />

          <Route
            path="user"
            element={renderElement(user.loggedIn, UserContainer, '/login')}
          />
          <Route
            path="dashboard"
            element={renderElement(user.loggedIn, Dashboard, '/login')}
          />
          <Route
            path="inventory"
            element={renderElement(user.loggedIn, Inventory, '/login')}
          />
          <Route
            path="product-list"
            element={renderElement(
              user.loggedIn,
              ProductListContainer,
              '/login'
            )}
          />
          <Route
            path="product-add"
            element={renderElement(
              user.loggedIn,
              ProductAddContainer,
              '/login'
            )}
          />
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
