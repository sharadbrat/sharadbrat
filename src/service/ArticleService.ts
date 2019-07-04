import { BlogArticleModel } from '../util';
import showdown from 'showdown';

export abstract class ArticleService {

  public static getArticles(): Promise<BlogArticleModel[]> {
    return Promise.resolve(ArticleService.articles);
  }

  public static getArticle(id: string): Promise<BlogArticleModel> {
    const article = ArticleService.articles.find(el => el.id === id);
    if (article) {
      const promise = new Promise<BlogArticleModel>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/articles/${id}/content.md`, true);
        xhr.onreadystatechange = () => {

          if (xhr.readyState != 4) {
            return;
          }

          if (xhr.status != 200) {
            reject(new Error('Could not download content'));
          } else {
            try {
              const md = xhr.responseText;
              const converter = new showdown.Converter();
              article.text = converter.makeHtml(md);
              resolve(article);
            } catch (e) {
              reject(new Error('Could not parse markdown'));
            }
          }
        };
        xhr.send();
      });
      return promise;
    } else {
      return Promise.reject(new Error('Article not found'));
    }
  }

  private static articles: BlogArticleModel[] = [
    {
      id: '2',
      title: 'WordPress experience',
      description: 'Recently I’ve tried Wordpress for one project. In this article I will share my experience related to implementation of the project, both positive and negative.',
      timestamp: new Date(2019, 5, 27).getTime(),
    },
    {
      id: '1',
      title: 'My first article',
      description: 'Now I have a blog and this is basically my first article in it. With it I would share my experience on building it up, my pains and the ways to overcome them.',
      timestamp: new Date(2019, 5, 14).getTime(),
    },
  ];

}
