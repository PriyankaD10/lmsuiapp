import React from "react";
import { isEmpty, trim } from 'lodash';
import { withRouter } from "../withRouter";
import UserService from "../services/UserService";
import {login} from '../features/user';
class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            user: {
                username: '',
                password: '',
            },
            errorList: []
        };
    }

    setFieldValue = (e) => {
        if (!isEmpty(trim(e.target.value))) {
            let user = this.state;
            let errorList = this.state;
            let fieldName = e.target.id;
            let fieldValue = trim(e.target.value);
            user[fieldName] = fieldValue;
            errorList = [];
            this.setState({user:user,errorList:errorList});
        }
    }

    validate = () => {
        let isValid = true;
        let user = this.state.user;
        let username = trim(user.username);
        let password = trim(user.pass);
        let errorList = this.state.errorList;
        if ((isEmpty(username) || isEmpty(password)) || (isEmpty(username) && isEmpty(password))) {
            isValid = false
            errorList.push('Please enter a valid username and password')
        } else {
            isValid = true
        }
        if (isValid) {
            
            this.authenticate(user);
        }
        else {
            this.setState({ errorList: errorList })
        }
    }

    authenticate = (user) => {
        UserService.login(user).then((res) => {
            let data = res.data;
            if(data.status ==="OK"){
                alert("Login successful");
                this.setState({ courseList: data });
                let userData = data;
                userData.isLoggedIn = true;
                this.props.dispatch(login(userData))
                this.props.navigate("/dashboard");
            }else{
                alert("Failed login.Please try again");
                this.props.navigate("/")
            }
        })
    }

    renderForm = () => {
        return (
            <div className="container" style={{textAlign:"text-center"}}>
                    <div className="row" style={{paddingLeft: "35%", paddingBottom: "1%", textAlign: "justify" }}>
                        <div className="title">Sign In</div>
                    </div>
                    <div className="row" style={{ paddingLeft: "30%", paddingBottom: "2%", textAlign: "justify" }}>
                        <label>Username </label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => this.setFieldValue(e)} required />

                    </div>
                    <div className="row" style={{ paddingLeft: "30%", paddingBottom: "2%", textAlign: "justify" }}>
                        <label>Password </label>
                        <input type="password" id="pass" name="pass" placeholder="Enter your password" onChange={(e) => this.setFieldValue(e)} required />
                    </div>
                    <div className="row" style={{ paddingBottom: "1%", textAlign: "justify" }}>
                        <div style={{paddingLeft:"30%"}}><button className="primaryBtn" onClick={(e) => { this.validate() }}>Sign In</button></div>
                        <div style={{display: "inline", paddingLeft:"2%"}}><span>New user ?</span> <a href="/register" onClick={this.registerPage}><span>Register</span></a></div>
                    </div>  
            </div>
        );
    }

    errorList = () => {
        let errors = this.state.errorList;
        const listItems = errors.map((d, i) => <li key={i}>{d}</li>);
        return (
            <div>
                {listItems}
            </div>
        )
    }


    render() {
        let isSuccess = this.state.isSuccess;
        return (
            <div style={{ width: "100%" }}>
                {isSuccess ? alert("Dashboard") : this.renderForm()}
            </div>
        );
    }
}
export default withRouter(LoginPage);