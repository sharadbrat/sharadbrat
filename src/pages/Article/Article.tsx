import * as React from 'react';
import { match } from 'react-router';

import { ArticleService } from '../../service';


import './Article.scss';
import { Link } from 'react-router-dom';
import { BlogArticleModel } from '../../util';
import { Loader } from '../../components/Loader';

interface ArticleProps {
  match: match
}

interface ArticleState {
  article?: BlogArticleModel;
}

export class Article extends React.Component<ArticleProps, ArticleState> {

  state: ArticleState = {};

  componentDidMount(): void {
    ArticleService.getArticle(this.props.match.params['id']).then(article => this.setState({article}));
  }

  render() {
    let article = <div className="article__loader"><Loader/></div>;

    if (this.state.article) {
      article = (
        <React.Fragment>
          <header className="article__header">
            <div className="article__header-container">
              <Link to="/blog" className="article__header-back" aria-label="Go back"/>
            </div>
          </header>
          <h1 className="article__heading">{this.state.article.title}</h1>
          <main className="article__main" dangerouslySetInnerHTML={{__html: this.state.article.text}}/>
        </React.Fragment>
      );
    }

    return (
      <div className="article">
        { article }
      </div>
    );
  }

}
