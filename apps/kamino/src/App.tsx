import { Routes, Route, Navigate } from 'react-router-dom';
import { PageNotFound } from '@musclemotion/components';
import { useRecoilState } from 'recoil';
import { userAtom } from './recoil/user';
import { TopNav } from '@musclemotion/components';

import Home from './pages/home/home';

import Auth from './pages/auth/auth';
import Profile from './pages/profile/profile';

import MuscleMotionAltLogo from './assets/images/muscle-motion.jpg';
import styled from 'styled-components';
import { useFetchApi } from '@musclemotion/hooks';
import { ProductCategoriesResponseT } from '@musclemotion/types';
import { ElementType, useEffect, useState } from 'react';
import ProductsListContainer from './pages/products_list/products_list_container';

function App() {
  const [user, setUser] = useRecoilState(userAtom);

  const [categoriesResponse, , fetchCategories] = useFetchApi<
    ProductCategoriesResponseT[]
  >('/product/categories');

  const [categories, setCategories] = useState<ProductCategoriesResponseT[]>([
    {
      id: 0,
      name: '',
      displayName: 'Select a category',
      ProductSubCategories: [],
    },
  ]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categoriesResponse.success && categoriesResponse.data) {
      setCategories(categoriesResponse.data);
    }
  }, [categoriesResponse]);

  function renderElement(
    isAllowed: boolean,
    Component: ElementType,
    redirectPath: string
  ) {
    return isAllowed ? <Component /> : <Navigate to={redirectPath} replace />;
  }

  return (
    <StyledApp>
      <TopNav logo={MuscleMotionAltLogo} categories={categories} />
      <div className={'container'}>
        <Routes>
          <Route
            path="user"
            element={renderElement(user.loggedIn, Profile, '/profile')}
          />
          <Route path="login" index element={<Auth />} />

          <Route index element={<Home />} />
          <Route
            path="products/:categoryId/:subCategoryId"
            element={<ProductsListContainer />}
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
  flex-direction: column;

  .container {
    padding: 10px;
    width: 100%;
  }
`;
