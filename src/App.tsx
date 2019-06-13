import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { About, Article, Blog, Home } from './pages';

class App extends Component {

  componentDidMount(): void {
    document.getElementById('loader-container').classList.add('loader-container_hidden');
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Route component={Home} exact path="/"/>
          <Route component={About} path="/about"/>
          <Route component={Blog} path="/blog"/>
          <Route component={Article} path="/article/:id"/>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
