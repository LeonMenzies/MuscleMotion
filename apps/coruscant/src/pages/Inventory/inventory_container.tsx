import styled from 'styled-components';
import { useFetchApi } from '@musclemotion/hooks';
import { ProductInventoryResponseT } from '@musclemotion/types';
import { useEffect } from 'react';
import InventoryTable from './inventory_table';

/* eslint-disable-next-line */
export interface InventoryContainerProps {}

export function InventoryContainer(props: InventoryContainerProps) {
  const [fetchProductInventoryResponse, , fetchProductInventory] = useFetchApi<
    ProductInventoryResponseT[]
  >('/product/inventory/overview');

  useEffect(() => {
    fetchProductInventory();
  }, [fetchProductInventory]);

  return (
    <StyledInventoryContainer>
      <InventoryTable productInventory={fetchProductInventoryResponse.data} />
    </StyledInventoryContainer>
  );
}

export default InventoryContainer;

const StyledInventoryContainer = styled.div`
  color: pink;
`;
