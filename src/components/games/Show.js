import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


class GamesShow extends React.Component {
  constructor() {
    super()

    this.state = {
      game: {},
      categories: {},
      mechanics: {}
    }
    this.setCatigoriesDictionary = this.setCatigoriesDictionary.bind(this)
    this.getGameCategories = this.getGameCategories.bind(this)
  }

  componentDidMount() {

    axios.get(`https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M&ids=${this.props.match.params.id}`)
      .then(res => this.setState({ game: res.data.games[0] }))
    axios.get('https://www.boardgameatlas.com/api/game/categories?client_id=SB1VGnDv7M')
      .then(res => this.setState({ categories: this.setCatigoriesDictionary(res.data.categories) }))
    axios.get('https://www.boardgameatlas.com/api/game/mechanics?client_id=SB1VGnDv7M')
      .then(res => this.setState({ mechanics: this.setMechanicsDictionary(res.data.mechanics) }))

  }

  setCatigoriesDictionary(categoriesArray) {
    const dictionary = {}
    categoriesArray.forEach(obj => dictionary[obj.id] = obj.name)
    return dictionary
  }
  setMechanicsDictionary(mechanicsArray) {
    const dictionary = {}
    mechanicsArray.forEach(obj => dictionary[obj.id] = obj.name)
    return dictionary
  }

  getGameCategories(gameCatigoriesArray){
    const categoriesList = []
    gameCatigoriesArray.forEach((obj) => {
      categoriesList.push(this.state.categories[obj.id])
    })
    return (
      <ul>
        {categoriesList.map(function(name, index){
          return <li key={ index }>{name}</li>
        })}
      </ul>
    )
  }
  getGameMechanics(gameMechanicsArray){
    const mechanicsList = []
    gameMechanicsArray.forEach((obj) => {
      mechanicsList.push(this.state.mechanics[obj.id])
    })
    return (
      <ul>
        {mechanicsList.map(function(name, index){
          return <li key={ index }>{name}</li>
        })}
      </ul>
    )
  }

  render() {
    if(!this.state.game.categories) return 'Loading...'
    console.log(this.getGameCategories(this.state.game.categories))
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
              <hr />
              <div className='container'>
                <div className="columns">
                  <section className="column">
                    <h1 className='subtitle is-5'> Mechanics:</h1>
                    {this.getGameMechanics(this.state.game.mechanics)}
                  </section>
                  <section className="column">
                    <h1 className='subtitle is-5'> Categories: </h1>
                    {this.getGameCategories(this.state.game.categories)}
                  </section>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h1 className="title is-4">Description:</h1>
          <span>{this.state.game.description_preview}</span>

        </div>
      </section>
    )
  }
}

export default GamesShow
