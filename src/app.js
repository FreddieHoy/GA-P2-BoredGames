import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch} from 'react-router-dom'

import GamesIndex from './components/games/Index'
import GamesShow from './components/games/Show'
import Home from './components/pages/Home'
import Navbar from './components/common/Navbar'

import 'bulma'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/games/:id" component={GamesShow} />
          <Route path="/games" component={GamesIndex} />
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
