import styled from 'styled-components';
import { ProductInventoryResponseT } from '@musclemotion/types';
import { AWS_PRODUCT_IMAGES_BASE } from '@musclemotion/constants';

/* eslint-disable-next-line */
export interface InventoryTableProps {
  productInventory: ProductInventoryResponseT[] | undefined;
}

export function InventoryTable(props: InventoryTableProps) {
  const { productInventory } = props;

  const getColor = (count: number): string => {
    const ratio = count / 100;
    const hue = ratio * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };

  if (!productInventory) {
    return <div>Loading...</div>;
  }
  return (
    <StyledInventoryTable>
      {productInventory.map((item) => (
        <StyledInventoryRow key={item.product.id}>
          <StyledProductImage
            src={
              AWS_PRODUCT_IMAGES_BASE + item.product.ProductImages[0].imageUrl
            }
            alt={item.product.name}
          />
          <div style={{ flex: 1 }}>
            <h2>{item.product.name}</h2>
            <StyledInventoryInnerTable>
              <thead>
                <StyledTableRow>
                  {Object.keys(
                    item.inventory[Object.keys(item.inventory)[0]]
                  ).map((color) => (
                    <StyledTableHeader key={color}>{color}</StyledTableHeader>
                  ))}
                </StyledTableRow>
              </thead>
              <tbody>
                {Object.entries(item.inventory).map(([size, colors]) => (
                  <StyledTableRow key={size}>
                    <StyledTableCell style={{ fontWeight: 'bold' }}>
                      {size}
                    </StyledTableCell>
                    {Object.entries(colors).map(([color, count]) => (
                      <StyledTableCell
                        key={color}
                        style={{ backgroundColor: getColor(count) }}
                      >
                        {count}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </tbody>
            </StyledInventoryInnerTable>
          </div>
        </StyledInventoryRow>
      ))}
    </StyledInventoryTable>
  );
}

export default InventoryTable;

const StyledInventoryTable = styled.div`
  color: black;
`;

const StyledInventoryRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
`;

const StyledInventoryInnerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8em; // make the table smaller
`;

const StyledTableHeader = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const StyledTableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const StyledTableCell = styled.td`
  padding: 2px;
`;
