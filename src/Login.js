import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {

    handleSignIn = async (e) => {
        e.preventDefault();
        const user = await request.post('http://localhost:3000/api/auth/signin', {
            email: this.state.signInEmail,
            password: this.state.signInPassword,
            display_name: this.state.signInName,
        })

        this.props.setUser(user);

        this.props.history.push('/')
    }

    handleSignUp = async (e) => {
        e.preventDefault();
        const user = await request.post('https://shielded-tor-15379.herokuapp.com/api/auth/signup', {
            email: this.state.signUpEmail,
            password: this.state.signUpPassword,
            display_name: this.state.signUpName,
        })

        this.props.setUser(user);

        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                {this.props.user && <h2>Hi {this.props.user.displayName}</h2>}
                <form onSubmit={this.handleSignIn}>
                    Email: <input onChange={(e) => this.setState({ signInEmail: e.target.value })} />

                    Password: <input onChange={(e) => this.setState({ signInPassword: e.target.value })} type="password"/>
                    
                    Name: <input onChange={(e) => this.setState({ signInName: e.target.value })} />
                    <button className="myButton">Sign In</button>
                </form>
                <form onSubmit={this.handleSignUp}>
                    Email: <input onChange={(e) => this.setState({ signUpEmail: e.target.value })} />

                    Password: <input onChange={(e) => this.setState({ signUpPassword: e.target.value })} type="password" />

                    Name: <input onChange={(e) => this.setState({ signUpName: e.target.value })} />
                    <button className="myButton">Sign Up</button>
                </form>
            </div>
        )
    }
}