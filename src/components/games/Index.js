import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import axios from 'axios'
import _ from 'lodash'

class GamesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      games: [],
      searchTerm: '',
      sortTerm: 'name|asc'
    }
    this.filterGames = this.filterGames.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M')
      .then(res => this.setState({ games: res.data.games }))
  }


  handleKeyUp(e) {
    this.setState({ searchTerm: e.target.value })
    console.log('keyup')
  }

  handleChange(e) {
    this.setState({ sortTerm: e.target.value })
  }

  filterGames() {
    const re = new RegExp(this.state.searchTerm, 'i')
    const [field, order] = this.state.sortTerm.split('|')

    const filterGames = _.filter(this.state.games, game => {
      return re.test(game.name)
    })
    const sortedGames = _.orderBy(filterGames, [field], [order])

    console.log('here')
    console.log(sortedGames)
    return sortedGames
  }


  render() {
    console.log()
    return (
      <section className="section">
        <hr />
        <div className="container">
          <div className="columns">

            <div className="column is-one-quarter">
              <h2 className="subtitle is-2">Filter by</h2>
              <hr />
              <div>
                <h2 className="subtitle is-4">Price</h2>
                <ul>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> $20 Max</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> $20 - $40</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> $40 - $60</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> $60 - $80</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> $80 - $100</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> $100+</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div>
                <h2 className="subtitle is-4">Discount</h2>
                <ul>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 20% & up</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 30% & up</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 40% & up</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 50% & up</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 60% & up</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div>
                <h2 className="subtitle is-4">Rating</h2>
                <ul>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> ★✩✩✩✩ & up</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> ★★✩✩✩ & up</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> ★★★✩✩ & up</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> ★★★★✩ & up</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div>
                <h2 className="subtitle is-4">Minimum Players</h2>
                <ul>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 1</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 2</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 3</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 4</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 5</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 6+</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div>
                <h2 className="subtitle is-4">Play Time (Minutes)</h2>
                <ul>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 15 Max</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 30 Max</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 45 Max</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 60 Max</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 90 Max</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 120 Max</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> Over 120</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div>
                <h2 className="subtitle is-4">Year Published</h2>
                <ul>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> Before 1995</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 1995-1999</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 2000-2004</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 2005-2009</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 2010-2014</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 2015-2019</label>
                  </li>
                  <li>
                    <input type="checkbox" id="scales" name="scales"  />
                    <label> 2019</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div>
                <h2 className="subtitle is-4">Mechanics</h2>
                <ul>
                </ul>
              </div>
              <hr />
              <div>
                <h2 className="subtitle is-4">Categories</h2>
                <ul>
                </ul>
              </div>
            </div>

            <div className="container is-three-quarters">
              <div className="column">
                <div className="field">
                  <input placeholder="search" className="input" onKeyUp={this.handleKeyUp}/>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <div className="select is-fullwidth">
                    <select onChange={this.handleChange}>
                      <option value="name|asc">Name A-Z</option>
                      <option value="name|desc">Name Z-A</option>
                      <option value="price|asc">Price Lo-Hi</option>
                      <option value="price|desc">Price Hi-Lo</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="columns is-multiline">
                {this.filterGames().map(game =>
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
          </div>
        </div>
      </section>
    )
  }
}

export default GamesIndex
