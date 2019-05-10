import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { ArticleService } from '../../service';
import { BlogArticle, Loader } from '../../components';
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
    ArticleService.getArticlePreviewsCached()
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
        articles = <div className="blog__articles">{this.state.articles.map(article => <BlogArticle key={article.id} article={article}/>)}</div>;
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
              <p className="blog__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus consequuntur cumque cupiditate doloremque, est ex, fugit ipsam itaque iure laborum magnam natus non odio provident quae quia ratione reprehenderit?</p>
              { articles }
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


  private onUrlClick = (url: string) => {
    if (this.state.isEntered) {
      this.setState({ isEntered: false });
      setTimeout(() => this.setState({ isRedirect: true, redirectUrl: url }), 850);
    }
  }

}
