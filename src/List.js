import React, { Component } from 'react'
import request from 'superagent';
import { withRouter } from 'react-router-dom';

// we need withRouter to get access to the URL to see if we are on the favorites page
export default withRouter(class List extends Component {
    makeFavorite = async (char) => {
        const fave = await request.post('https://shielded-tor-15379.herokuapp.com/api/me/favorites', {
            name: char.name,
            species: char.species,
            image: char.image,
        })
            .set('Authorization', this.props.user.token)
        console.log('faves', fave.body)
    }

    renderButtonOrStar = (char) => {
        const isOnFavoritesList = this.props.favorites.find(person => char.name === person.name);
        if (!isOnFavoritesList) {

            return <button className="myButton" onClick={(e) => this.makeFavorite(char)}>Make Favorite</button>
        }

        return <button disabled>Favorited ✔️</button>
    }

    render() {
        return (
            <div>
                {

                    this.props.characters.map(char => <div key={char.name} className="char-box">
                        <div id="stats">Name: {char.name}</div>
                        <img
                            alt={char.image}
                            src={char.image} />
                        <div id="stats">Species: {char.species}</div>
                        {
                            this.props.location.pathname !== '/favorites'
                            && this.renderButtonOrStar(char)
                        }
                    </div>)
                }
            </div>
        )
    }
})

