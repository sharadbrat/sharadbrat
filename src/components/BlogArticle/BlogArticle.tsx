import * as React from 'react';
import { Link } from 'react-router-dom';

import { BlogArticleModel } from '../../util';

import './_BlogArticle.scss';
import { CSSTransition } from 'react-transition-group';

export interface BlogArticleProps {
  article: BlogArticleModel;
}

export class BlogArticle extends React.PureComponent<BlogArticleProps> {

  state = {
    in: false,
  };

  componentDidMount(): void {
    this.setState({in: true});
  }

  render() {
    const time = new Date(this.props.article.timestamp).toLocaleDateString();

    return (
      <CSSTransition timeout={300} classNames="blog-article-animation" in={this.state.in}>
        <article className="blog-article">
          <h3 className="blog-article__heading">{this.props.article.title}</h3>
          <span className="blog-article__time">{time}</span>
          <p className="blog-article__description">{this.props.article.description}</p>
          <Link to={`/article/${this.props.article.id}`} className="blog-article__link">Read more</Link>
        </article>
      </CSSTransition>
    );
  }

}
