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

    }

    renderButtonOrStar = (char) => {
        const isOnFavoritesList = this.props.favorites.find(person => char.name === person.name);
        if (!isOnFavoritesList) {

            return <button className="myButton" onClick={(e) => this.makeFavorite(char)}>Make favorite</button>
        }

        return <span role="img">✔️</span>
    }

    render() {
        return (
            <div>
                {

                    this.props.characters.map(char => <div key={char.name} className="char-box">
                        <div>{char.name}</div>
                        <img
                            alt={char.image}
                            src={char.image} />
                        <div>{char.species}</div>
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

