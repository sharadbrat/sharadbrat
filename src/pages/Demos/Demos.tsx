import * as React from 'react';

import { DemoService } from '../../service';
import { getLinkForNavigationItem, getNavigationItems } from '../../util';

import './_Demos.scss';

interface DemosState {
  isEntered: boolean;
  isRedirect: boolean;
  redirectUrl: string;
}

export class Demos extends React.Component<any, DemosState> {
  private demoService: DemoService;

  componentDidMount(): void {

  }

  render() {

    const navItems = getNavigationItems()
      .filter(el => el.name !== 'Demos')
      .map(el => getLinkForNavigationItem(el, 'demos__navigation-item', this.onUrlClick));

    return (
      <section className="demos">
        <main className="demos__main">
          <header className="demos__header">
            <nav className="demos__navigation">
              { navItems }
            </nav>
          </header>
          <div className="demos__top">
            <h1 className="demos__heading">My demos</h1>
            <p className="demos__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque debitis eaque esse in magni modi nobis omnis possimus, velit vero. Dolor dolorum ea similique vel voluptates! Aspernatur eos excepturi nesciunt.</p>
          </div>
          <div className="demos__demos">

          </div>
        </main>
      </section>
    );
  }

  onUrlClick = (url: string) => {
    if (this.state.isEntered) {
      this.setState({ isEntered: false });
      setTimeout(() => this.setState({ isRedirect: true, redirectUrl: url }), 850);
    }
  }

}
