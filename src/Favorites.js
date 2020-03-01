import React, { Component } from 'react'
import List from './List';
import request from 'superagent';

export default class Favorites extends Component {
    state = {
        characters: []
    }

    componentDidMount = async () => {
        const faves = await request.get('https://shielded-tor-15379.herokuapp.com/api/me/favorites').set('Authorization', this.props.user.token);

        this.setState({ characters: faves.body })
    }

    render() {
        return (
            <div>
                <h2 id="faves">Your Favorites</h2>
                <List characters={this.state.characters} />
            </div>
        )
    }
}