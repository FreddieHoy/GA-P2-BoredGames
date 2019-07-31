import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import axios from 'axios'

class GamesIndex extends React.Component {
  constructor() {
    super()

    this.state = { games: [] }
  }

  componentDidMount() {
    axios.get('https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M')
      .then(res => this.setState({ games: res.data.games }))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.games.map(game =>
              <div
                key={game.id}
                className="column is-half-tablet is-one-quarter-desktop"
              >
                <Link to={`/games/${game.id}`}>
                  <Card name={game.name} image={game.image_url} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default GamesIndex
