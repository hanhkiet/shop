import CategoryPage from '../pages/CategoryPage';

export const categoryRouter = {
  path: '/collections',
  children: [
    {
      path: ':name',
      element: <CategoryPage />,
    },
  ],
};
