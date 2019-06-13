import * as React from 'react';
import { Redirect } from 'react-router';
import { CSSTransition } from 'react-transition-group';

import { Footer } from '../../components';
import { getLinkForNavigationItem, getNavigationItems } from '../../util';

import './About.scss';

export class AboutState {
  isEntered: boolean;
  isRedirect: boolean;
  redirectUrl?: string;
}

export class About extends React.Component<any, AboutState> {

  state: AboutState = {
    isEntered: false,
    isRedirect: false,
  };

  componentDidMount(): void {
    this.setState({ isEntered: true });
  }

  onUrlClick = (url: string) => {
    if (this.state.isEntered) {
      this.setState({ isEntered: false });
      setTimeout(() => this.setState({ isRedirect: true, redirectUrl: url }), 1000);
    }
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={this.state.redirectUrl}/>;
    }

    const navItems = getNavigationItems()
      .filter(el => el.name !== 'About')
      .map(el => getLinkForNavigationItem(el, 'about__navigation-item', this.onUrlClick));

    return (
      <CSSTransition timeout={1000} classNames="about-animation" in={this.state.isEntered}>
        <div className="about">
          <div className="about__container">
            <header className="about__header">
              <nav className="about__navigation">{navItems}</nav>
            </header>
            <main className="about__main">
              <h1>My name is Georgii&nbsp;Sharadze</h1>
              <p className="_margin-bottom">I am constantly developing stuff and applications, creating interfaces and make my users happy.</p>
              <p>My main and most lovely programming language is JavaScript. Let's say, I'm a JavaScript evangelist to some people. I love:</p>
              <ul>
                <li>JavaScript & HTML & CSS stack</li>
                <li>Angular</li>
                <li>React</li>
                <li>SCSS / SASS and LESS</li>
                <li>Phaser (Javascript game development engine)</li>
                <li>Typescript</li>
                <li>Node.js & express & sequelize stack</li>
              </ul>
              <p>My area of interests is broad. Currently I am studying in Bauhaus Universität, Weimar at Human-Computer Interaction masters program. I also sometimes do:</p>
              <ul>
                <li>Sketch prototyping</li>
                <li>User researches & User testing</li>
                <li>Python</li>
                <li>GraphQL</li>
              </ul>
              <h2>What is this webpage for?</h2>
              <p>I just wanted to create a blog for myself.</p>
              <h2>Found a bug?</h2>
              <p>Please, contact me in on of the links below, if you found a bug. I would really appreciate that. Thank you in advance.</p>
            </main>
            <Footer/>
          </div>
        </div>
      </CSSTransition>
    );
  }

}
