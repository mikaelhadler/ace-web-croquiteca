import React from 'react';
import Image from 'next/image';


const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Image src="/logoAceFF.gif" width={110} height={78} alt="Logo" />

        <h1 className="text-lg font-bold">Croquiteca</h1>
 
      </div>
    </header>
  );
};

export default Header;
