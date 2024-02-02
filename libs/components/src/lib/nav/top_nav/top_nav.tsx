import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { TopNavItem } from '../top_nav_item/top_nav_item';
import {
  ProductCategoryResponseT,
  ProductSubCategoriesResponseT,
} from '@musclemotion/types';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface TopNavProps {
  logo: string;
  categories: ProductCategoryResponseT[];
}

export function TopNav(props: TopNavProps) {
  const { logo, categories } = props;
  const [hoveredCategory, setHoveredCategory] = useState<number | undefined>(
    undefined
  );

  return (
    <StyledNav isVisible={hoveredCategory !== undefined}>
      <div className={'header'}>
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
          {categories.map((category: ProductCategoryResponseT) => (
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
      <div
        className={'hover-nav'}
        onMouseLeave={() => setHoveredCategory(undefined)}
      >
        {hoveredCategory &&
          categories
            .find(
              (category: ProductCategoryResponseT) =>
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
      </div>
    </StyledNav>
  );
}

export default TopNav;

const StyledNav = styled.div<{ isVisible: boolean }>`
  height: ${({ isVisible }) => (isVisible ? '200px' : '50px')};
  transition: 0.4s;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 10px;
  }

  background-color: red;

  .navLogo {
    object-fit: cover;
  }

  .right-nav {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
  }

  .hover-nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;

    .hovered-component-container {
      padding: 10px;
    }
  }
`;
