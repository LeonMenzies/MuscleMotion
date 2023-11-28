import styled from 'styled-components';

/* eslint-disable-next-line */
export interface InventoryProps {}

export function Inventory(props: InventoryProps) {
  return <StyledInventory>{'text'}</StyledInventory>;
}

export default Inventory;

const StyledInventory = styled.div`
  color: pink;
`;
