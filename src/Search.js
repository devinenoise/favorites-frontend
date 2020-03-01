import React, { Component } from 'react'
import List from './List';
import request from 'superagent';


export default class Search extends Component {

    state = {
        characters: [],
        favorites: [],
        input: '',
    }

    componentDidMount = async () => {
        const faves = await request.get('https://shielded-tor-15379.herokuapp.com/api/me/favorites').set('Authorization', this.props.user.token);

        this.setState({ favorites: faves.body })
    }

    handleSearch = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });

        const data = await request.get(`https://shielded-tor-15379.herokuapp.com/api/character?search=${this.state.input}`)


        this.setState({
            characters: data.body.results,
            loading: false
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSearch}>
                    <input value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
                    <button className="myButton" disabled={this.state.loading}>Search</button>
                </form>

                {this.state.loading ? "loading..." : <List characters={this.state.characters} favorites={this.state.favorites} user={this.props.user} />}

            </div>

        )
    }
}


