import * as React from 'react';
import { Link } from 'react-router-dom';

import { BlogArticleModel } from '../../util';

import './_BlogArticle.scss';

export interface BlogArticleProps {
  article: BlogArticleModel;
}

export class BlogArticle extends React.PureComponent<BlogArticleProps> {

  render() {
    debugger
    const time = new Date(this.props.article.timestamp).toLocaleDateString();

    return (
      <article className="blog-article">
        <h3 className="blog-article__heading">{this.props.article.title}</h3>
        <time className="blog-article__time" dateTime={time}>{time}</time>
        <p className="blog-article__description">{this.props.article.description}</p>
        <Link to={`/article/${this.props.article.id}`} className="blog-article__link">Read more</Link>
      </article>
    );
  }

}
