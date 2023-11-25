import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '../../components/input/Text';
import Area from '../../components/input/Area';
import Dropdown from '../../components/input/DropDown';
import Image from '../../components/input/Image';

const StyledProductAddModel = styled.dialog`
  width: 40rem;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
interface TProductAddModel {
  open: boolean;
  onClose: Function;
}

const ProductAddModel = ({ open, onClose }: TProductAddModel) => {
  const [productCategories, serProductCategories] = useState<any>([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category_id: '',
  });
  const [images, setImages] = useState<FileList>();

  const getCategories = () => {
    // getProductCategories().then((val) => {
    //   const tmp: Array<any> = [];
    //   val.forEach((v) => tmp.push({ label: v.data().label, id: v.id }));
    //   serProductCategories(tmp);
    // });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <StyledProductAddModel open={open}>
      <div onClick={() => onClose()}>X</div>

      <form onSubmit={handleSubmit}>
        <div>
          <Text
            title={'Name'}
            type={'name'}
            placeholder={'Enter name'}
            value={product.name}
            id={'name'}
            required={true}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <Area
            title={'Description'}
            type={'description'}
            placeholder={'Enter description'}
            value={product.description}
            id={'description'}
            required={true}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>
        <Dropdown
          onChange={(e) =>
            setProduct({ ...product, category_id: e.target.value })
          }
          value={product.category_id}
          options={productCategories}
        />

        <Image onFilesSelected={setImages} />

        <button type="submit">Add product</button>
      </form>
    </StyledProductAddModel>
  );
};

export default ProductAddModel;
