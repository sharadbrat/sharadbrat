import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';

import { ArticleService } from '../../service';
import { BlogArticleModel, ResourceStatus } from '../../util';
import { Loader } from '../../components/Loader';

import './Article.scss';

interface ArticleProps {
  match: match
}

interface ArticleState {
  article?: BlogArticleModel;
  status: ResourceStatus;
}

export class Article extends React.Component<ArticleProps, ArticleState> {

  state: ArticleState = {
    status: ResourceStatus.LOADING,
  };

  componentDidMount(): void {
    ArticleService.getArticle(this.props.match.params['id'])
      .then(article => this.setState({article, status: ResourceStatus.READY}))
      .catch(error => {
        if (error && error.code) {
          this.setState({status: ResourceStatus.ERROR});
        } else {
          this.setState({status: ResourceStatus.CONNECTION_ERROR});
        }
      });
    location.hash = '#page-start';
  }

  render() {

    let article;

    switch (this.state.status) {
      case ResourceStatus.CONNECTION_ERROR:
        article = <div className="article__loader"><span>>No internet connection :(</span></div>;
        break;
      case ResourceStatus.ERROR:
        article = <div className="article__loader"><span>An error occurred</span></div>;
        break;
      case ResourceStatus.LOADING:
        article = <div className="article__loader"><Loader/></div>;
        break;
      case ResourceStatus.READY:
        const time = new Date(this.state.article.timestamp).toLocaleDateString();

        article = (
          <React.Fragment>
            <header className="article__header">
              <div className="article__header-container">
                <Link to="/blog" className="article__header-back" aria-label="Go back"/>
                <h1 className="article__heading">Sharadbrat</h1>
              </div>
            </header>
            <main className="article__main" dangerouslySetInnerHTML={{__html: this.state.article.text}}/>
            <footer className="article__footer">
              <span className="article__footer-title">Published on:</span>
              <span className="article__footer-date">{time}</span>
            </footer>
          </React.Fragment>
        );
        break;
    }

    return (
      <div className="article">
        { article }
      </div>
    );
  }

}
