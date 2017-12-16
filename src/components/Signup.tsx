// import * as React from 'react'
// import { TextField, RaisedButton, Snackbar } from 'material-ui'
// import { API_SIGNUP_ENDPOINT } from '../constants/const'
// import { withRouter, RouteComponentProps } from 'react-router'

// interface SignupProps extends RouteComponentProps<{}> { }

// interface SignupState {
//   address?: string,
//   firstName: string,
//   lastName: string,
//   phoneNumber?: string,
//   email: string,
//   password: string,
//   hasError: boolean
// }

// @withRouter
// class Signup extends React.Component<SignupProps, SignupState> {

//   constructor (props: SignupProps) {
//     super(props)

//     this.state = {
//       address: '',
//       firstName: '',
//       lastName: '',
//       phoneNumber: '',
//       email: '',
//       password: '',
//       hasError: false
//     }
//   }

//   closeSnackbar = () => {
//     this.setState({
//       hasError: false
//     })
//   }

//   handleSignup = async () => {
//     [this.state.firstName,
//       this.state.lastName,
//       this.state.email,
//       this.state.password].forEach((s) => {
//         if (s.length === 0) {
//           this.setState({
//             hasError: true
//           })
//           return
//         }
//       })
//     const response = await fetch(API_SIGNUP_ENDPOINT, {
//       method: 'post',
//       body: qs.stringify(this.state),
//       credentials: 'same-origin',
//       headers: [
//                 ['Content-Type', 'application/x-www-form-urlencoded']
//       ]
//     })
//     if (response.status === 200) {
//       console.log('success signed up')
//     } else {
//       console.log('fail')
//     }
//   }

//   render () {
//     return (
//             <div className='Signup'>
//                 <div>
//                     <TextField
//                         type='text'
//                         hintText='Email'
//                         value={this.state.email}
//                         onChange={(e, v) => { this.setState({ email: v }) }}
//                     />
//                 </div>
//                 <div>
//                     <TextField
//                         type='text'
//                         hintText='First Name'
//                         value={this.state.firstName}
//                         onChange={(e, v) => { this.setState({ firstName: v }) }}
//                     />
//                 </div>
//                 <div>
//                     <TextField
//                         type='text'
//                         hintText='Last Name'
//                         value={this.state.lastName}
//                         onChange={(e, v) => { this.setState({ lastName: v }) }}
//                     />
//                 </div>
//                 <div>
//                     <TextField
//                         type='number'
//                         hintText='Phone Number'
//                         value={this.state.phoneNumber}
//                         onChange={(e, v) => { this.setState({ phoneNumber: v }) }}
//                     />
//                 </div>
//                 <div>
//                     <TextField
//                         type='password'
//                         hintText='Passowrd'
//                         value={this.state.password}
//                         onChange={(e, v) => { this.setState({ password: v }) }}
//                     />
//                 </div>
//                 <div>
//                     <RaisedButton
//                         onClick={this.handleSignup}
//                         primary={true}
//                     >
//                         Login
//                     </RaisedButton>
//                 </div>
//                 <Snackbar
//                     open={this.state.hasError}
//                     message='Invalid Entry'
//                     autoHideDuration={4000}
//                     onRequestClose={this.closeSnackbar}
//                 />
//             </div>
//     )
//   }

// }

// export default Signup
