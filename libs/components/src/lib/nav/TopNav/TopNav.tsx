import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { TopNavItem } from '../TopNavItem/TopNavItem';
import {
  ProductCategoriesResponseT,
  ProductSubCategoriesResponseT,
} from '@musclemotion/types';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface TopNavProps {
  logo: string;
  categories: ProductCategoriesResponseT[];
}

export function TopNav(props: TopNavProps) {
  const { logo, categories } = props;
  const [hoveredCategory, setHoveredCategory] = useState<number | undefined>(
    undefined
  );

  const hoverComponent = () => (
    <StyledHoverComponent
      key={hoveredCategory}
      isVisible={hoveredCategory !== undefined}
      onMouseLeave={() => setHoveredCategory(undefined)}
    >
      {hoveredCategory &&
        categories
          .find(
            (category: ProductCategoriesResponseT) =>
              category.id === hoveredCategory
          )
          ?.ProductSubCategories.map(
            (subCategory: ProductSubCategoriesResponseT, index: number) => (
              <div className={'hovered-component-container'} key={index}>
                <TopNavItem
                  key={subCategory.id}
                  to={`/products/${hoveredCategory}/${subCategory.id}`}
                  title={subCategory.displayName}
                />
              </div>
            )
          )}
    </StyledHoverComponent>
  );

  return (
    <StyledNav>
      <div className={'container'}>
        <NavLink to={'/'}>
          <img
            className={'navLogo'}
            src={logo}
            alt="MuscleMotionAltLogo"
            width="32"
            height="32"
          />
        </NavLink>

        <div className={'right-nav'}>
          {categories.map((category: ProductCategoriesResponseT) => (
            <div onMouseEnter={() => setHoveredCategory(category.id)}>
              <TopNavItem
                key={category.id}
                to={`/products/${category.id}/0`}
                title={category.displayName}
              />
            </div>
          ))}
        </div>
      </div>
      {hoverComponent()}
    </StyledNav>
  );
}
const StyledHoverComponent = styled.div<{ isVisible: boolean }>`
  background-color: aquamarine;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  height: ${({ isVisible }) => (isVisible ? 'auto' : '0')};
  transition: 0.4s;

  .hovered-component-container {
    padding: 10px;
  }
`;

const StyledNav = styled.div`
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: red;
  }

  .navLogo {
    object-fit: cover;
  }

  .right-nav {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
  }
`;
