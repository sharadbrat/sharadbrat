import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { About, Article, Blog, Demos, Home } from './pages';

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
          <Route component={Demos} path="/demos"/>
          <Route component={Article} path="/article"/>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
