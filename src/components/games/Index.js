import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import axios from 'axios'
import _ from 'lodash'
import Promise from 'bluebird'


class GamesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      games: [],
      categories: {},
      mechanics: {},
      searchTerm: '',
      sortTerm: 'name|asc',
      active: false,
      searchPrice: '',
      searchDiscount: '',
      searchAges: '',
      searchRating: '',
      sortPrice: '',
      mechanicsOpen: false,
      categoriesOpen: false


    }
    this.filterGames = this.filterGames.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setCatigoriesDictionary = this.setCatigoriesDictionary.bind(this)
    this.handleChangePrice = this.handleChangePrice.bind(this)
    this.handleChangeDiscount = this.handleChangeDiscount.bind(this)
    this.handleChangeRating = this.handleChangeRating.bind(this)
    this.handleChangeMinPlayers = this.handleChangeMinPlayers.bind(this)
    this.handleChangeMaxTime = this.handleChangeMaxTime.bind(this)
    this.handleChangeYearMade = this.handleChangeYearMade.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleChangeMechanics = this.handleChangeMechanics.bind(this)
    this.toggleCategories = this.toggleCategories.bind(this)
    this.toggleMechanics = this.toggleMechanics.bind(this)

  }

  toggleMechanics() {
    this.setState({ mechanicsOpen: !this.state.mechanicsOpen})
  }
  toggleCategories() {
    this.setState({ categoriesOpen: !this.state.categoriesOpen})
  }

  componentDidMount() {

    Promise.props({
      games: axios.get('https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M').then(res => res.data.games),
      categories: axios.get('https://www.boardgameatlas.com/api/game/categories?client_id=SB1VGnDv7M').then(res => res.data.categories),
      mechanics: axios.get('https://www.boardgameatlas.com/api/game/mechanics?client_id=SB1VGnDv7M').then(res => res.data.mechanics)
    })
      .then(res => {
        const { games, categories, mechanics } = res
        this.setState({
          games: games,
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

  handleKeyUp(e) {
    this.setState({ searchTerm: e.target.value })

  }

  handleChange(e) {
    this.setState({ sortTerm: e.target.value })
  }

  handleChangePrice(e) {
    this.setState({
      sortPrice: e.target.value,
      boxCheckedPrice: e.target.checked
    })

  }

  handleChangeDiscount(e) {
    this.setState({
      sortDiscount: e.target.value,
      boxCheckedDiscount: e.target.checked
    })

  }
  handleChangeRating(e) {
    this.setState({
      sortRating: e.target.value,
      boxCheckedRating: e.target.checked
    })

  }
  handleChangeMinPlayers(e) {
    this.setState({
      sortMinPlayers: e.target.value,
      boxCheckedMinPlayers: e.target.checked
    })

  }
  handleChangeMaxTime(e) {
    this.setState({
      sortMaxTime: e.target.value,
      boxCheckedMaxTime: e.target.checked
    })

  }
  handleChangeYearMade(e) {
    this.setState({
      sortYearMade: e.target.value,
      boxCheckedYearMade: e.target.checked
    })

  }

  handleChangeMechanics(e) {
    this.setState({
      sortMechanics: e.target.value,
      boxCheckedMechanics: e.target.checked
    })
  }

  handleChangeCategory(e) {
    this.setState({
      sortCategorie: e.target.value,
      boxCheckedCategorie: e.target.checked
    })
    console.log('its trying')
  }

  filterGames() {

    // Takes this.state.games. Looks at check boxes. Returns filterGamesByPrice.
    let filterGamesByPrice
    if(this.state.sortPrice === '0')  {
      filterGamesByPrice = this.state.games
    } else if (this.state.boxCheckedPrice){
      filterGamesByPrice = this.state.games.filter(game => Number(game.price) <= Number(this.state.sortPrice) && Number(game.price) > Number(this.state.sortPrice) - 20)
    } else if(this.state.sortPrice === '80.1') {
      filterGamesByPrice = this.state.games.filter(game => Number(game.price) > Number(this.state.sortPrice))
    } else filterGamesByPrice = this.state.games


    // Takes filterGamesByPrice. Looks at check boxes. Returns filterGamesByPriceDicount.
    let filterGamesByDiscount
    if(Number(this.state.sortDiscount) <= 0)  {
      filterGamesByDiscount = filterGamesByPrice
    } else if (this.state.boxCheckedDiscount){
      filterGamesByDiscount = filterGamesByPrice.filter(game => Number(game.discount)*100 >= Number(this.state.sortDiscount) )
    } else if(this.state.sortDiscount === '60') {
      filterGamesByDiscount = filterGamesByPrice.filter(game => Number(game.discount)*100 > Number(this.state.sortDiscount))
    } else filterGamesByDiscount = filterGamesByPrice

    //
    let filterGamesByRating
    if(Number(this.state.sortRating) <= 0)  {
      filterGamesByRating = filterGamesByDiscount
    } else if (this.state.boxCheckedRating){
      filterGamesByRating = filterGamesByDiscount.filter(game => game.average_user_rating > Number(this.state.sortRating))
    } else filterGamesByRating = filterGamesByDiscount

    //
    let filterGamesByMinPlayers
    if(Number(this.state.sortMinPlayers) <= 0)  {
      filterGamesByMinPlayers = filterGamesByRating
    } else if (this.state.boxCheckedMinPlayers){
      filterGamesByMinPlayers = filterGamesByRating.filter(game => game.min_players >= Number(this.state.sortMinPlayers))
    } else filterGamesByMinPlayers = filterGamesByRating

    //
    let filterGamesByMaxTime
    if(Number(this.state.sortMaxTime) <= 0)  {
      filterGamesByMaxTime = filterGamesByMinPlayers
    } else if (this.state.boxCheckedMaxTime){
      filterGamesByMaxTime = filterGamesByMinPlayers.filter(game => game.max_playtime <= Number(this.state.sortMaxTime))
    } else filterGamesByMaxTime = filterGamesByMinPlayers

    //
    let filterGamesByYearMade
    if(Number(this.state.sortYearMade) <= 0)  {
      filterGamesByYearMade = filterGamesByMaxTime
    } else if (Number(this.sortYearMade) <= 1999){
      filterGamesByYearMade = filterGamesByMaxTime.filter(game => game.year_published <= Number(this.state.sortYearMade))
    } else if (this.state.boxCheckedYearMade){
      filterGamesByYearMade = filterGamesByMaxTime.filter(game => game.year_published >= Number(this.state.sortYearMade) && game.year_published < Number(this.state.sortYearMade) + 4)
    } else filterGamesByYearMade = filterGamesByMaxTime

    let filterGamesByCategories
    if (this.state.boxCheckedCategorie) {
      const idOfCategoryValue = Object.entries(this.state.categories).find(entry => entry[1] === this.state.sortCategorie)[0]
      filterGamesByCategories = filterGamesByYearMade.filter(game => game.categories.some(category => category.id === idOfCategoryValue))
    }else filterGamesByCategories = filterGamesByYearMade

    let filterGamesByMechanics
    if (this.state.boxCheckedMechanics) {
      const idOfMechanicsValue = Object.entries(this.state.mechanics).find(entry => entry[1] === this.state.sortMechanics)[0]
      filterGamesByMechanics = filterGamesByCategories.filter(game => game.mechanics.some(category => category.id === idOfMechanicsValue))
    }else filterGamesByMechanics = filterGamesByCategories

    // Takes tfilterGamesByPrice. Looks at serch and filterbar. Returns sortedGames.
    const re = new RegExp(this.state.searchTerm, 'i')
    const [field, order] = this.state.sortTerm.split('|')

    const filterGames = _.filter(filterGamesByMechanics, game => {
      return re.test(game.name)
    })
    const sortedGames = _.orderBy(filterGames, [field], [order])
    return sortedGames  // this is displayed in render.
  }

  getFilterItemsMechanics(dictionary){
    return (
      <ul className="showMechanics">
        {Object.values(dictionary).map((name, index) => {
          return (
            <li  className='is-checkradio'  key={ index }>
              <input onClick={this.handleChangeMechanics} value={name} type="checkbox" id="mech" name="mech"  />
              <label className="title is-6"> {name}</label>
            </li>
          )
        })}
      </ul>
    )
  }

  getFilterItemsCategories(dictionary){
    return (
      <ul className="showCategories">
        {Object.values(dictionary).map((name, index) => {
          return (
            <li  className='is-checkradio'  key={ index }>
              <input onClick={this.handleChangeCategory} value={name} type="checkbox" id="cat" name="cat"  />
              <label className="title is-6"> {name}</label>
            </li>
          )
        })}

      </ul>
    )
  }

  toggleClass() {
    const currentState = this.state.active
    this.setState({ active: !currentState })
  }

  render() {
    if(!this.state.categories) return 'Loading...'
    console.log()
    return (
      <section className="section">
        <div className="container ">
          <h2 className="subtitle is-2">All Bored Games</h2>
          <div className="columns">

            <div className="column filterside">
              <h2 className="subtitle is-3">Filters</h2>
              <h1 className="subtitle is-4">Games found: {this.filterGames().length}</h1>
              <hr />
              <div className="section searchResults">
                <h2 className="subtitle is-4">Price</h2>
                <ul>
                  <li>
                    <input onClick={this.handleChangePrice} value="0" type="radio" id="scales" name="price" checked/>
                    <label className="title is-6"> All</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangePrice} value="20.1" type="radio" id="scales" name="price"  />
                    <label  className="title is-6" > $20 Max</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangePrice} value="40.1" type="radio" id="price" name="price"  />
                    <label className="title is-6"> $20 - $40</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangePrice} value="60.1" type="radio" id="price" name="price"  />
                    <label className="title is-6"> $40 - $60</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangePrice} value="80.1" type="radio" id="price" name="price"  />
                    <label className="title is-6"> $60 - $80</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangePrice} value="100.1" type="radio" id="price" name="price"  />
                    <label className="title is-6"> $80 +</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="section searchResults">
                <h2 className="subtitle is-4">Discount</h2>
                <ul>
                  <li>
                    <input onClick={this.handleChangeDiscount} value="0" type="radio" id="discount" name="discount" checked />
                    <label className="title is-6"> All</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeDiscount} value="20.1" type="radio" id="discount" name="discount"  />
                    <label className="title is-6"> 20% & up</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeDiscount} value="30.1" type="radio" id="discount" name="discount"  />
                    <label className="title is-6"> 30% & up</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeDiscount} value="40.1" type="radio" id="discount" name="discount"  />
                    <label className="title is-6"> 40% & up</label>
                  </li>
                  <li>
                    <input  onClick={this.handleChangeDiscount} value="50.1" type="radio" id="discount" name="discount"  />
                    <label className="title is-6"> 50% & up</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeDiscount} value="60" type="radio" id="discount" name="discount"  />
                    <label className="title is-6"> 60% & up</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="section searchResults">
                <h2 className="subtitle is-4">Rating</h2>
                <ul>
                  <li>
                    <input onClick={this.handleChangeRating} value="0" type="radio" id="rating" name="rating"  checked/>
                    <label className="title is-6"> All</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeRating} value="0.9" type="radio" id="rating" name="rating"  />
                    <label className="title is-6"> ★✩✩✩✩ & up</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeRating} value="1.9" type="radio" id="rating" name="rating"  />
                    <label className="title is-6"> ★★✩✩✩ & up</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeRating} value="3" type="radio" id="rating" name="rating"  />
                    <label className="title is-6"> ★★★✩✩ & up</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeRating} value="3.9" type="radio" id="rating" name="rating"  />
                    <label className="title is-6"> ★★★★✩ & up</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="section searchResults">
                <h2 className="subtitle is-4">Minimum Players</h2>
                <ul>
                  <li>
                    <input onClick={this.handleChangeMinPlayers} value="0" type="radio" id="players" name="players" checked />
                    <label className="title is-6"> All</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMinPlayers} value="0.9" type="radio" id="players" name="players"  />
                    <label className="title is-6"> 1</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMinPlayers} value="1.9" type="radio" id="players" name="players"  />
                    <label className="title is-6"> 2</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMinPlayers} value="2.9" type="radio" id="players" name="players"  />
                    <label className="title is-6"> 3</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMinPlayers} value="3.9" type="radio" id="players" name="players"  />
                    <label className="title is-6"> 4</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMinPlayers} value="4.9" type="radio" id="players" name="players"  />
                    <label className="title is-6"> 5</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMinPlayers} value="5.9" type="radio" id="players" name="players"  />
                    <label className="title is-6"> 6+</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="section searchResults">
                <h2 className="subtitle is-4">Play Time (Minutes)</h2>
                <ul>
                  <li>
                    <input onClick={this.handleChangeMaxTime} value="0" type="radio" id="playTime" name="playTime"  checked/>
                    <label className="title is-6"> All</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMaxTime} value="15.1" type="radio" id="playTime" name="playTime"  />
                    <label className="title is-6"> 15 Max</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMaxTime} value="30.1" type="radio" id="playTime" name="playTime"  />
                    <label className="title is-6"> 30 Max</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMaxTime} value="45.1" type="radio" id="playTime" name="playTime"  />
                    <label className="title is-6"> 45 Max</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMaxTime} value="60.1" type="radio" id="playTime" name="playTime"  />
                    <label className="title is-6"> 60 Max</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMaxTime} value="90.1" type="radio" id="playTime" name="playTime"  />
                    <label className="title is-6"> 90 Max</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMaxTime} value="120.1" type="radio" id="playTime" name="playTime"  />
                    <label className="title is-6"> 120 Max</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeMaxTime} value="120" type="radio" id="playTime" name="playTime"  />
                    <label className="title is-6"> Over 120</label>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="section searchResults">
                <h2 className="subtitle is-4">Year Published</h2>
                <ul>
                  <li>
                    <input onClick={this.handleChangeYearMade} value="0" type="radio" id="year" name="year"  />
                    <label className="title is-6"> All</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeYearMade} value="1999" type="radio" id="year" name="year"  />
                    <label className="title is-6"> Before 2000</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeYearMade} value="2000" type="radio" id="year" name="year"  />
                    <label className="title is-6"> 2000-2004</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeYearMade} value="2005" type="radio" id="year" name="year"  />
                    <label className="title is-6"> 2005-2009</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeYearMade} value="2010" type="radio" id="year" name="year"  />
                    <label className="title is-6"> 2010-2014</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeYearMade} value="2015" type="radio" id="year" name="year"  />
                    <label className="title is-6"> 2015-2019</label>
                  </li>
                  <li>
                    <input onClick={this.handleChangeYearMade} value="2019" type="radio" id="year" name="year"  />
                    <label className="title is-6"> 2019</label>
                  </li>
                </ul>
              </div>
              <div className="section searchResults">
                <hr />
                <div className={` ${this.state.mechanicsOpen ? 'showMechanics' : 'hideMechanics'}`}>
                  <h2 className="subtitle is-4">Mechanics</h2>
                  {this.getFilterItemsMechanics(this.state.mechanics)}
                </div>
                <br />
                <button className="button is-dark" onClick={this.toggleMechanics} >show or hide</button>
                <hr />
                <div className={` ${this.state.categoriesOpen ? 'showCategories' : 'hideCategories'}`}>
                  <h2 className="subtitle is-4">Categories</h2>
                  {this.getFilterItemsCategories(this.state.categories)}
                </div>
                <br />
                <button className="button is-dark" onClick={this.toggleCategories} >show or hide</button>
                <hr />
              </div>
            </div>
            <div className="container column is-four-fifths">
              <div className="searchfield columns is-multiline">
                <div className="container column is-half">
                  <div className="field">
                    <input placeholder="search" className="input" onKeyUp={this.handleKeyUp}/>
                  </div>
                </div>
                <div className="column is-half">
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
              </div>
              <div className="searchResults section">
                <div className=" searchResults columns is-multiline">
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
        </div>
        <div>
          <hr />
          <p className=" subtitle has-text-black is-2 level-item"> Made by Lana & Fred 😁</p>
        </div>
      </section>
    )
  }
}

export default GamesIndex
