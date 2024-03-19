import React from 'react';
import Link from 'next/link';

const NavLink = ({href, title}) => {
  return (
    <Link className='block py-2 pl-3 pr-4 text-white sm:text-xl rounded md:p-0 hover:text-neutral-200' href={href}>{title}</Link>
  )
}

export default NavLink