import * as React from 'react';
import { Link } from 'react-router-dom';

import { About, Blog, Demos, Home } from '../pages';
import { INavigationItem } from './model';

export function getNavigationItems(): INavigationItem[] {
  return [
    {
      name: 'Home',
      url: '/',
      exact: true,
      component: Home,
    },
    {
      name: 'Blog',
      url: '/blog',
      exact: true,
      component: Blog,
    },
    {
      name: 'Demos',
      url: '/demos',
      exact: true,
      component: Demos,
    },
    {
      name: 'About',
      url: '/about',
      exact: true,
      component: About,
    },
  ];
}

export function getLinkForNavigationItem(el: INavigationItem, classNamePrefix: string, callback: (url: string) => void): JSX.Element {
  const {name, url} = el;
  const className = `${classNamePrefix} _${el.name}`;

  const modifiedCallback = (event: React.MouseEvent) => {
    event.preventDefault();
    callback(url);
  };

  return <Link key={name} to={url} id={name} className={className} onClick={modifiedCallback}>{name}</Link>;
}