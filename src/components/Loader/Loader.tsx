import * as React from 'react';

import './_Loader.scss';

export class Loader extends React.Component {
  render() {
    return (
      <div className="loader">
        <div className="loader__icon">
          <div className="loader__icon-element loader__icon-element-1"/>
          <div className="loader__icon-element loader__icon-element-2"/>
          <div className="loader__icon-element loader__icon-element-3"/>
          <div className="loader__icon-element loader__icon-element-4"/>
          <div className="loader__icon-element loader__icon-element-5"/>
          <div className="loader__icon-element loader__icon-element-6"/>
          <div className="loader__icon-element loader__icon-element-7"/>
          <div className="loader__icon-element loader__icon-element-8"/>
          <div className="loader__icon-element loader__icon-element-9"/>
        </div>
        <span className="loader__caption">Loading content for you</span>
      </div>
    );
  }
}
