import * as React from 'react';
import { Redirect } from 'react-router';

import { DemoService } from '../../service';
import { DemoModel, getLinkForNavigationItem, getNavigationItems, ResourceStatus } from '../../util';
import { Loader } from '../../components/Loader';

import './_Demos.scss';
import { DemoItem } from '../../components/DemoItem';
import { CSSTransition } from 'react-transition-group';

interface DemosState {
  isEntered: boolean;
  isRedirect: boolean;
  redirectUrl?: string;
  status: ResourceStatus;
  demos?: DemoModel[]
}

export class Demos extends React.Component<any, DemosState> {
  state: DemosState = {
    isEntered: false,
    isRedirect: false,
    status: ResourceStatus.LOADING,
  };

  componentDidMount(): void {
    DemoService.getDemosCached()
      .then(demos => this.setState({ demos, status: ResourceStatus.READY }));

    this.setState({ isEntered: true });
  }

  render() {

    if (this.state.isRedirect) {
      return <Redirect push to={this.state.redirectUrl}/>;
    }

    let demos;

    switch (this.state.status) {
      case ResourceStatus.CONNECTION_ERROR:
        demos = <div className="blog__placeholder-container"><span>No internet connection :(</span></div>;
        break;
      case ResourceStatus.ERROR:
        demos = <div className="blog__placeholder-container"><span>An error occurred :(</span></div>;
        break;
      case ResourceStatus.LOADING:
        demos = <div className="blog__placeholder-container"><Loader/></div>;
        break;
      case ResourceStatus.READY:
        demos = <div className="blog__articles">{this.state.demos.map(demo => <DemoItem key={demo.id} demo={demo}/>)}</div>;
        break;
    }

    const navItems = getNavigationItems()
      .filter(el => el.name !== 'Demos')
      .map(el => getLinkForNavigationItem(el, 'blog__navigation-item', this.onUrlClick));

    return (
      <CSSTransition timeout={850} in={this.state.isEntered} classNames={'blog-animation'}>
        <section className="blog">
          <header className="blog__header">
            <nav className="blog__navigation">
              {navItems}
            </nav>
          </header>
          <div className="blog__fade">
            <main className="blog__main">
              <h1 className="blog__heading">My demos</h1>
              <p className="blog__description">Here I've put all the short (and not very) snippets of my code, demo projects and finished projects. Please check out this section if you want to find interesting cases and cool projects made by me and my folks.</p>
              { demos }
            </main>
            <footer className="blog__footer">
              <div className="blog__footer-container">
                <h2 className="blog__footer-heading">Find me everywhere:</h2>
                <div className="blog__footer-links">
                  <a className="blog__footer-link _twitter" href="https://twitter.com/GeorgiiSharadze" target="_blank" aria-label="Twitter"/>
                  <a className="blog__footer-link _github" href="https://github.com/sharadbrat" target="_blank" aria-label="Github"/>
                  <a className="blog__footer-link _telegram" href="https://t.me/sharadbrat" target="_blank" aria-label="Telegram"/>
                  <a className="blog__footer-link _email" href="mailto:george.sharadze@gmail.com" aria-label="Email"/>
                </div>
              </div>
            </footer>
          </div>
        </section>

      </CSSTransition>
    );
  }

  onUrlClick = (url: string) => {
    if (this.state.isEntered) {
      this.setState({isEntered: false});
      setTimeout(() => this.setState({isRedirect: true, redirectUrl: url}), 850);
    }
  }

}
