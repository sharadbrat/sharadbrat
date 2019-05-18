import * as React from 'react';

import './DemoItem.scss';
import { DemoModel } from '../../util';
import { CSSTransition } from 'react-transition-group';

interface DemoItemProps {
  demo: DemoModel;
}

export class DemoItem extends React.PureComponent<DemoItemProps> {

  state = {
    in: false,
  };

  componentDidMount(): void {
    this.setState({in: true});
  }

  render() {
    const time = new Date(this.props.demo.timestamp).toLocaleDateString();

    return (
      <CSSTransition timeout={300} classNames="blog-article-animation" in={this.state.in}>
        <article className="blog-article">
          <h3 className="blog-article__heading">{this.props.demo.title}</h3>
          <span className="blog-article__time">{time}</span>
          <p className="blog-article__description">{this.props.demo.description}</p>
          <a className="blog-article__link" href={this.props.demo.url} target="_blank">Check this out</a>
        </article>
      </CSSTransition>
    );
  }

}
