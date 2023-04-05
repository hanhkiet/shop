import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from './data/productsData';

function ProductDetail() {
  const { productName } = useParams();
  const thisProduct = productsData.find(
    prod => prod.name.replace(/\W+/gi, '-').toLowerCase() === productName,
  );

  return (
    <div>
      <h1>{thisProduct?.productId}</h1>
      <h1>{thisProduct?.name}</h1>
      <p>Price: ${thisProduct?.price}</p>
    </div>
  );
}

export default ProductDetail;
