import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'

import { getNavigationItems, INavigationItem } from '../../util';

import './Home.scss';

export class Home extends React.Component {

  state = {
    isEntered: false,
    isRedirect: false,
    redirectUrl: '',
  };

  componentDidMount() {
    this.setState({ isEntered: true });
  }

  onUrlClick(event: React.MouseEvent, url: string) {
    event.preventDefault();
    if (this.state.isEntered) {
      this.setState({ isEntered: false });
      setTimeout(() => this.setState({ isRedirect: true, redirectUrl: url }), 1000);
    }
  }

  render() {
    const navItems = getNavigationItems()
      .filter((el: INavigationItem) => el.name !== 'Home')
      .map((el: INavigationItem) => {
        return <Link key={el.name} to={el.url} className="home__navigation-item"
                     onClick={(event) => this.onUrlClick(event, el.url)}>{el.name}</Link>
      });

    if (this.state.isRedirect) {
      return <Redirect push to={this.state.redirectUrl} />;
    }

    return (
      <CSSTransition timeout={4000} in={this.state.isEntered} classNames={'home-animation'}>
        <section className="home">
          <p className="home__description">Emojinarium of Georgii Sharadze</p>

          <div className="home__animation">
            <div className="home__background"/>

            <blockquote className="home__word" id="word-1">
              <span className="home__phrase">
                E<span className="_invisible">le</span>g<span className="_invisible">an</span>c<span className="_invisible">e</span>
              </span>
              <span className="home__phrase">
                <span className="_invisible">i</span>s <span className="_invisible">an</span>
              </span>
              <span className="home__phrase">
                A<span className="_invisible">pp</span>r<span className="_invisible">oa</span>c<span className="_invisible">h</span>
              </span>
            </blockquote>

            <blockquote className="home__word" id="word-2">
              <span className="home__phrase">
                <span className="_invisible">E</span>l<span className="_invisible">eg</span>a<span className="_invisible">nc</span>e
              </span>
              <span className="home__phrase">
                <span className="_invisible">is </span>an
              </span>
              <span className="home__phrase">
                <span className="_invisible">A</span>p<span className="_invisible">pr</span>o<span className="_invisible">ac</span>h
              </span>
            </blockquote>

            <blockquote className="home__word" id="word-3">
              <span className="home__phrase" id="phrase-1">
                <span className="_invisible">El</span>e<span className="_invisible">ga</span>n<span className="_invisible">ce</span>
              </span>
              <span className="home__phrase" id="phrase-2">
                i<span className="_invisible">s an</span>
              </span>
              <span className="home__phrase" id="phrase-3">
                <span className="_invisible">Ap</span>p<span className="_invisible">ro</span>a<span className="_invisible">ch</span>
              </span>
            </blockquote>
          </div>

          <header className="home__header">
            <nav className="home__navigation">
              {navItems}
            </nav>
          </header>
        </section>
      </CSSTransition>
    );
  }

}
