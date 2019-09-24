# Project 2: Bored Games

The site: [Bored Games](https://freddiehoy.github.io/project-02/)

## Collaborator

Lana Kirilenko - [Github](https://github.com/DucanKir)

## Overview

This project helps 'bored' users to find a board game that is right for them. The site is focuses heavily on the search criteria allowing users to find board games based on number of players, genre, length of time, game mechanics (ie. dice), price and more.

This is my 2nd coding project on the 3 month, General Assembly software engineering immersive course.

The project was completed as a 48hr paircoded hackathon. The project was focused on consuming an API and using RESTful routes. However, the API only game us 100 games for free. The frontend is made using React and Node.js.

![BoredGames homepage](https://user-images.githubusercontent.com/51379192/65143270-7215ba00-da0c-11e9-92da-56927dad77b4.png)


# Brief

* **Consume a public API** – this could be anything but it must make sense for your project.
* **Have several components** - At least one classical and one functional.
* **The app should include a router** - with several "pages".
* **Include wireframes** - that you designed before building the app.
* Have **semantically clean HTML** - you make sure you write HTML that makes structural sense rather than thinking about how it might look, which is the job of CSS.
* **Be deployed online** and accessible to the public.

## Technologies used:

* HTML5 & SCSS
* Javascript ES6
* Node.js
* React
* npm
* Webpack
* Bulma
* Insomnia
* Git
* GitHub
* gh-pages

### All Features

* Home page
* Board game index page
* Search or filter by name and price
* Search using tick boxes giving values on rating price etc.
* Search by Mechanics & categories. Using drop down list.
* Detail page for each board game.

## Site display


![Index page](https://user-images.githubusercontent.com/51379192/65154173-ee1afc80-da22-11e9-9a7b-ef04b6355044.png)

### Search
![search](https://user-images.githubusercontent.com/51379192/65155875-f3c61180-da25-11e9-9b4c-fc4b0b731e9e.gif)

### List dropdown
![dopdown](https://user-images.githubusercontent.com/51379192/65155910-02142d80-da26-11e9-9bea-d64b4b883f8f.gif)


## ProjectLog

| Time      | Task         |
| ------------- |:-------------:|
| **1st day - Half**    | Project Ideas, API search, reading API docs, Interaction with Insomnia.  |
| **2nd day - Whole**     | Get data to display board games, work on filtering and sorting, radio buttons & check boxes.    |
| **3rd day - Half**  | Display game detail, styling, home page, categories & mechanics dropdown.      |


# Challenges

### Sorting and Filtering at Once

Getting all the sorting and filtering to work at the same time was the biggest issue. As we were fairly in-experienced in coding at this stage in the course (6 weeks) in hindsight the method we used was not the most elegant, however it did work!

We used one very large function called filtergames(). This function had sections. Each section took the previous sections array of board games and filtered it depending on which box was ticked.

> Index.js
```
filterGames() {
  let filterGamesByPrice
  if(this.state.sortPrice === '0')  {
    filterGamesByPrice = this.state.games
  } else if (this.state.boxCheckedPrice){
    filterGamesByPrice = this.state.games.filter(game => Number(game.price) <= Number(this.state.sortPrice) && Number(game.price) > Number(this.state.sortPrice) - 20)
  } else if(this.state.sortPrice === '80.1') {
    filterGamesByPrice = this.state.games.filter(game => Number(game.price) > Number(this.state.sortPrice))
  } else filterGamesByPrice = this.state.games
```

For example the above code is the start of the function. It takes the array of games fetched from the API and looks to see which box is checked in the Price section.

![Index page](https://user-images.githubusercontent.com/51379192/65154173-ee1afc80-da22-11e9-9a7b-ef04b6355044.png)

In this case 'All' is checked so it returns 'filterGamesByPrice'. This array although named differently is the same as the original array of games. It then passes filterGamesByPrice to the next section in the function which is discount.

Therefore each section applies a filter to the original array and the final array of board games is return to be displayed.

This gives a very long function which could probably be shortened significantly perhaps by using lodash.

### Time constraints

Being a hackathon time constraints are obvious. However it was a good lesson in how to manage you time in order to achieve an MVP as efficiently as possible.

A lesson that carried forward into following projects.

# Moving forward

* I learn't about the effectiveness of pair coding
* What an API with good documentation is like compared to bad
* Effective time management in order to reach an MVP
* More time could of been used on styling
* The addition of where to buy the boarding game on the detail view would make the site much more useful
* The limit of only 100 board games from the API has proved to be less useful

# Contact

Freddie Hoy

Email: freddiehoy0@gmail.com

[Portfolio](https://freddiehoy.github.io/) | [LinkedIn](https://www.linkedin.com/in/freddie-hoy/) |
[GitHub](https://github.com/FreddieHoy?tab=repositories)
