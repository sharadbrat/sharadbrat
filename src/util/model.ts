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
  fileUrl?: string;
  file?: string;
}

export class DemoModel {
  id: string;
  title: string;
  description: string;
  url: string;
  timestamp: number;
}

export interface INavigationItem {
  url: string;
  component: typeof React.Component;
  name: string;
  exact: boolean;
}
