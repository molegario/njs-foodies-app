"use client";

import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';
import Link from 'next/link';

export default function NavLink ({href, children, isBranch}) {
  const path = usePathname();
  return <>
    <Link 
      href={href} 
      className={
        (typeof isBranch !== 'undefined' ? path.startsWith(href) : path === href) ? 
        `${classes['nav-link']} ${classes.active}` : 
        `${classes['nav-link']}`
      }
    >{children}</Link>
  </>
}