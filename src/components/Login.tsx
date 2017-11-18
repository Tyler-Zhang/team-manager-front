import * as React from 'react'
import * as qs from 'qs'
import { TextField, RaisedButton } from 'material-ui'
import { API_LOGIN_ENDPOINT } from '../constants/const'
import { withRouter, RouteComponentProps } from 'react-router'

interface LoginProps extends RouteComponentProps<{}> {}

interface LoginState {
    email: string,
    password: string
}

@withRouter
class Login extends React.Component<LoginProps, LoginState > {

    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleLogin = async () => {
        const data = {email: this.state.email, password: this.state.password}
        
        const response = await fetch(API_LOGIN_ENDPOINT, { 
            method: 'post', 
            body: qs.stringify(data), 
            credentials: 'same-origin',
            headers: [
                ['Content-type', 'application/x-www-form-urlencoded']
            ]
        })
        if (response.status === 200) { 
            console.log('success')
            this.props.history.push('/dashboard')
        } else {
            console.log('failed')
        }
    }

    render() {
        return (
            <div className="Login">
                <div>
                    <TextField 
                        type="text"
                        hintText="Email" 
                        value={this.state.email}
                        onChange={(e, v) => { this.setState({email: v}) }}
                    />
                </div>
                <div>
                    <TextField
                        type="password"
                        hintText="Password"
                        value={this.state.password}
                        onChange={(e, v) => { this.setState({password: v}) }}
                    />
                </div>
                <div>

                    <RaisedButton
                        onClick={this.handleLogin}
                        primary={true}
                    >
                        Login
                    </RaisedButton>
                    <RaisedButton
                        secondary={true}
                    >
                        Sign Up
                    </RaisedButton>
                </div>
            </div>
        )
    }
}

export default Login;