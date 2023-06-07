import CategoryPage from '../pages/CategoryPage';
import NoPage from '../pages/NoPage';

export const categoryRouter = {
  path: '/collections',
  children: [
    {
      path: ':name',
      element: <CategoryPage />,
    },
    {
      path: '',
      element: <NoPage />,
    },
  ],
};
