import ProductDetail from '../pages/ProductDetail';

export const productRouter = {
  path: '/products',
  children: [
    {
      path: ':name',
      element: <ProductDetail />,
    },
  ],
};
