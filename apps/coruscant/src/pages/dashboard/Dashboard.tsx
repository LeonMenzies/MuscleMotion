import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  return <StyledDashboard>{'text'}</StyledDashboard>;
}

export default Dashboard;

const StyledDashboard = styled.div`
  color: pink;
`;
