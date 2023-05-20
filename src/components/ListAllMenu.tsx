import { ReactNode } from 'react';
type Props = {
  numOfCols?: number;
  children: ReactNode;
};
export default function ListAllMenu(props: Props) {
  return (
    <div className="container overflow-x-auto">
      <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5`}>
        {props.children}
      </div>
    </div>
  );
}
