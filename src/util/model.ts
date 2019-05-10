import * as React from 'react';

export enum ResourceStatus {
  READY,
  LOADING,
  ERROR,
  CONNECTION_ERROR,
}

export interface BlogArticleModel {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  contentId?: string;
  file?: File;
}

export class DemoModel {
  title: string;
  description: string;
  img: any;
}

export interface INavigationItem {
  url: string;
  component: typeof React.Component;
  name: string;
  exact: boolean;
}
