import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePageLayout from './components/homepage/HomePageLayout'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePageLayout} />
          <Route component={HomePageLayout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
