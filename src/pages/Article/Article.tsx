import * as React from 'react';
import { match } from 'react-router';
import { ArticleService } from '../../service';

import './Article.scss';

interface ArticleProps {
  match: match
}

export class Article extends React.Component<ArticleProps, any> {

  componentDidMount(): void {
    ArticleService.getArticle(this.props.match.params['id'])
      .then(article => console.log(article));
  }

  render() {
    console.log((this.props as any).match);
    return (
      <div>Article</div>
    );
  }

}
