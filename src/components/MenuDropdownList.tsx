import { useState } from 'react';

type Props = {
  menuTitle: String;
  children: React.ReactNode;
};

function MenuDropdownList(props: Props) {
  const [showChildMenu, setShowChildMenu] = useState(false);
  return (
    <li
      className="cursor-pointer"
      onClick={() => {
        setShowChildMenu(!showChildMenu);
      }}
    >
      <div className="flex h-16 justify-between">
        <div className="text-1xl grid content-center font-light">
          {props.menuTitle}
        </div>
      </div>
    </li>
  );
}

export default MenuDropdownList;
