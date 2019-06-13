import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { ArticleService } from '../../service';
import { BlogArticle, Footer, Loader } from '../../components';
import { BlogArticleModel, getLinkForNavigationItem, getNavigationItems, ResourceStatus } from '../../util';

import './Blog.scss';

export interface BlogState {
  isEntered: boolean;
  pages: number;
  articles?: BlogArticleModel[];
  isRedirect: boolean;
  redirectUrl: string;
  status: ResourceStatus;
}

export class Blog extends React.Component<any, BlogState> {

  constructor(props: any) {
    super(props);

    this.state = {
      isEntered: false,
      articles: [],
      pages: 0,
      isRedirect: false,
      redirectUrl: '',
      status: ResourceStatus.LOADING,
    }
  }

  componentDidMount(): void {
    ArticleService.getArticles()
      .then(articles => {
        this.setState({ articles, status: ResourceStatus.READY });
      })
      .catch(error => {
        this.setState({ status: ResourceStatus.CONNECTION_ERROR });
      });

    this.setState({ isEntered: true });
  }

  render() {

    if (this.state.isRedirect) {
      return <Redirect push to={this.state.redirectUrl}/>;
    }

    const navItems = getNavigationItems()
      .filter(el => el.name !== 'Blog')
      .map(el => getLinkForNavigationItem(el, 'blog__navigation-item', this.onUrlClick));

    let articles;

    switch (this.state.status) {
      case ResourceStatus.CONNECTION_ERROR:
        articles = <div className="blog__placeholder-container"><span>No internet connection :(</span></div>;
        break;
      case ResourceStatus.ERROR:
        articles = <div className="blog__placeholder-container"><span>An error occurred</span></div>;
        break;
      case ResourceStatus.LOADING:
        articles = <div className="blog__placeholder-container"><Loader/></div>;
        break;
      case ResourceStatus.READY:
        articles = <div className="blog__articles">{this.state.articles.map(article => <BlogArticle key={article.id} article={article} onNavigate={this.onUrlClick}/>)}</div>;
        break;
    }

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
              <h1 className="blog__heading">My personal blog</h1>
              <p className="blog__description">Here you can find all my articles that are related to the frontend stuff and IT world in general. All the articles are published in medium, so if you have some preferences to the particular article platform, find medium link for the article in the very beginning of the article itself.</p>
              { articles }
            </main>
            <Footer/>
          </div>
        </section>
      </CSSTransition>
    );
  }


  private onUrlClick = (url: string) => {
    if (this.state.isEntered) {
      this.setState({ isEntered: false });
      setTimeout(() => this.setState({ isRedirect: true, redirectUrl: url }), 850);
    }
  }

}
