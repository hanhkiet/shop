import { ReactNode } from 'react';
import MenuList from './MenuList';

type Props = {
  numOfCols: Number;
  children: ReactNode;
};
export default function ListAllMenu(props: Props) {
  return (
    <div className="container mx-auto">
      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-${props.numOfCols}`}
      >
        {props.children}
      </div>
    </div>
  );
}
