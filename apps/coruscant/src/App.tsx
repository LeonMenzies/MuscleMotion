import { Routes, Route, Navigate } from 'react-router-dom';
import { NavMenu, PageNotFound } from '@musclemotion/components';
import { useRecoilState } from 'recoil';
import Dashboard from './pages/dashboard/Dashboard';
import { navAtom } from './recoil/Nav';
import { NavItem, UserT } from '@musclemotion/types';
import styled from 'styled-components';
import { MdDashboard, MdInventory } from 'react-icons/md';
import { FaUser, FaListUl, FaRegPlusSquare } from 'react-icons/fa';

import ProductListContainer from './pages/productList/ProductListContainer';
import ProductAddContainer from './pages/productAdd/ProductAddContainer';
import Inventory from './pages/Inventory/Inventory';
import LoginContainer from './pages/login/LoginContainer';
import { defaultUser, userAtom } from './recoil/User';
import UserContainer from './pages/user/UserContainer';
import { useFetchApi } from '@musclemotion/hooks';
import { ElementType, useEffect, useState } from 'react';

function App() {
  const [nav, setNav] = useRecoilState(navAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [authLoading, setAuthLoading] = useState(true);
  const [userResponse, , fetchUser] = useFetchApi<UserT>('/auth');

  function renderElement(
    isAllowed: boolean,
    Component: ElementType,
    redirectPath: string
  ) {
    return isAllowed || authLoading ? (
      <Component />
    ) : (
      <Navigate to={redirectPath} replace />
    );
  }

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (userResponse.success && userResponse.data) {
      setUser({
        loggedIn: true,
        id: userResponse.data.id,
        firstName: userResponse.data.firstName,
        lastName: userResponse.data.lastName,
        email: userResponse.data.email,
        roles: userResponse.data.roles,
      });
    }
  }, [userResponse, setUser]);

  useEffect(() => {
    if (user.loggedIn) {
      setAuthLoading(false);
    }
  }, [user.loggedIn]);

  const navItems: NavItem[] = [
    {
      icon: <FaUser />,
      title: `${user.firstName} ${user.lastName}`,
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
        hide={!user.loggedIn && !authLoading}
        logOut={() => setUser(defaultUser)}
      />
      <div className={'container'}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

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
