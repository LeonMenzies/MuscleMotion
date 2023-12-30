import { ReactNode } from 'react';

export type NavItem = {
  icon: ReactNode;
  title: string;
  route: string;
  show: boolean;
};

export type ProductStagesItem = {
  component: ReactNode;
  name: string;
  displayName: string;
};
