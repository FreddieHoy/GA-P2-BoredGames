import React from 'react'
import axios from 'axios'
import Promise from 'bluebird'


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

    Promise.props({
      game: axios.get(`https://www.boardgameatlas.com/api/search?client_id=${process.env.BOARD_GAMES_ATLAS}&ids=${this.props.match.params.id}`).then(res => res.data.games[0]),
      categories: axios.get(`https://www.boardgameatlas.com/api/game/categories?client_id=${process.env.BOARD_GAMES_ATLAS}`).then(res => res.data.categories),
      mechanics: axios.get(`https://www.boardgameatlas.com/api/game/mechanics?client_id=${process.env.BOARD_GAMES_ATLAS}`).then(res => res.data.mechanics)
    })
      .then(res => {
        const { game, categories, mechanics } = res
        this.setState({
          game: game,
          categories: this.setCatigoriesDictionary(categories),
          mechanics: this.setMechanicsDictionary(mechanics)
        })
      })

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
    const categoriesList = gameCatigoriesArray.map((obj) => this.state.categories[obj.id])

    return (
      <ul>
        {categoriesList.map(function(name, index){
          return <li key={ index }>{name}</li>
        })}
      </ul>
    )
  }

  getGameMechanics(gameMechanicsArray){
    const mechanicsList = gameMechanicsArray.map((obj) => this.state.mechanics[obj.id])

    return (
      <ul>
        {mechanicsList.map(function(name, index){
          return <li key={ index }>{name}</li>
        })}
      </ul>
    )
  }

  render() {
    console.log()
    if(!this.state.game.categories) return 'Loading...'
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-2">{this.state.game.name}</h1>
          <hr />
          <div className="columns">
            <div className="column is-one-thirds">
              <figure className="image">
                <img className="showImage" src={this.state.game.image_url} alt={this.state.game.name} />
              </figure>
              <div className="section makeBorder filterside">
                <h1 className="subtitle makeTextBold is-6 has-text-black">Price: ${this.state.game.price} $<strike>{this.state.game.msrp}</strike></h1>
                <h1 className="subtitle makeTextBold is-6 has-text-black">Discount: {Math.round(this.state.game.discount * 100)}%</h1>
              </div>
            </div>

            <div className="column section is-one-thirds filterside">
              <h1 className="title is-3">Details:</h1>
              <h1>Average rating: {Math.round(this.state.game.average_user_rating * 100)/100}</h1>
              <h1>Number of ratings: {this.state.game.num_user_ratings}</h1>
              <br />
              <h1>No. Players: {this.state.game.min_players}-{this.state.game.max_players}</h1>
              <h1>Play Time: {this.state.game.min_playtime}-{this.state.game.max_playtime}</h1>
              <h1>Age: {this.state.game.min_age}-100</h1>
              <h1>Designer: {this.state.game.designers}</h1>
              <h1>Publishers: {this.state.game.primary_publisher}</h1>
              <h1>Year Published: {this.state.game.year_published}</h1>
              <h1>Weight: {this.state.game.weight_amount}lbs</h1>
              <h1>Size: {this.state.game.size_height}x{this.state.game.size_width}x{this.state.game.size_depth} Inches</h1>
              <br />

              <hr />
              <div className='container'>
                <div className="columns">
                  <section className="column is-third">
                    <h1 className='subtitle has-text-black is-5'> Mechanics:</h1>
                    {this.getGameMechanics(this.state.game.mechanics)}
                  </section>
                  <section className="column">
                    <h1 className='subtitle has-text-black is-5'> Categories: </h1>
                    {this.getGameCategories(this.state.game.categories)}
                  </section>
                </div>
              </div>
            </div>

            <div className="column is-one-thirds section filterside">
              <h1 className="title is-4">Description:</h1>
              <span>{this.state.game.description_preview}</span>
            </div>
          </div>
          <hr />
          <p className=" subtitle has-text-black is-2 level-item"> Made by Lana & Fred 😁</p>
        </div>
      </section>
    )
  }
}

export default GamesShow
