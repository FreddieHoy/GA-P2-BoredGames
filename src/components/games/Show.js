import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


class GamesShow extends React.Component {
  constructor() {
    super()

    this.state = {
      game: {}
    }

  }

  componentDidMount() {

    axios.get(`https://www.boardgameatlas.com/api/search?ids=${this.props.match.params.id}&client_id=SB1VGnDv7M`)
      .then(res => this.setState({ game: res.data.games[0] }))
  }

  render() {
    console.log(this.state.game)
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-2">{this.state.game.name}</h1>
          <hr />
          <div className="columns">
            <div className="column">
              <figure className="image">
                <img src={this.state.game.image_url} alt={this.state.game.name} />
              </figure>
            </div>
            <div className="column">
              <h1 className="title is-3">Details:</h1>
              <h1>No. Players: {this.state.game.min_players}-{this.state.game.max_players}</h1>
              <h1>Play Time: {this.state.game.min_playtime}-{this.state.game.max_playtime}</h1>
              <h1>Age: {this.state.game.min_age}-100</h1>
              <h1>Price: ${this.state.game.price} $<strike>{this.state.game.msrp}</strike></h1>
              <h1>Discount: {this.state.game.discount * 100}%</h1>
              <h1>Designer: {this.state.game.designers}</h1>
              <h1>Publishers: {this.state.game.primary_publisher}</h1>
              <h1>Year Published: {this.state.game.year_published}</h1>
              <h1>Weight: {this.state.game.weight_amount}lbs</h1>
              <h1>Size: {this.state.game.size_height}x{this.state.game.size_width}x{this.state.game.size_depth} Inches</h1>
              <div className="columns">
                <section className="column">
                  <h1> Mechanics:</h1>


                </section>
                <section className="column">
                  <h1> Categories: </h1>
                </section>
              </div>






            </div>

          </div>
          <h1 className="title is-4">Description:</h1>
          <span>{this.state.game.description_preview}</span>

        </div>
      </section>
    )
  }
}

export default GamesShow
