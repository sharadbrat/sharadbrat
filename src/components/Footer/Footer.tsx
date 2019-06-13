import * as React from 'react';

import './Footer.scss';

export class Footer extends React.PureComponent {

  render() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <h2 className="footer__heading">Find me everywhere:</h2>
          <div className="footer__links">
            <a className="footer__link _twitter" href="https://twitter.com/GeorgiiSharadze" target="_blank" aria-label="Twitter"/>
            <a className="footer__link _github" href="https://github.com/sharadbrat" target="_blank" aria-label="Github"/>
            <a className="footer__link _telegram" href="https://t.me/sharadbrat" target="_blank" aria-label="Telegram"/>
            <a className="footer__link _email" href="mailto:george.sharadze@gmail.com" aria-label="Email"/>
          </div>
        </div>
      </footer>
    );
  }

}
