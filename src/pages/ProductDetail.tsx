import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productName } = useParams();

  return (
    <div>
      <h1>{'id'}</h1>
      <h1>{'name'}</h1>
      <p>Price: ${'price'}</p>
    </div>
  );
}

export default ProductDetail;
