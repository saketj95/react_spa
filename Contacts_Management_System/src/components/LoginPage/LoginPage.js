import React from 'react';
import axios from 'axios';
import sha256 from 'sha256';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import AddUser from '../AddUser/AddUser';
import MyProfile from '../MyProfile/MyProfile';
import MyContacts from '../MyContacts/MyContacts';
import AddContact from '../AddContact/AddContact';

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoggedin: false,
			my_addUser_flag: false,
			loginFlag: true,
			invalidForm: false,
			invalidForm1: false,
			invalidForm2: false,
			invalidForm3: false,
			invalidForm4: false,
			my_profile_flag: false,
			my_contacts_flag: false,
			my_addContact_flag: false
		};
		this._doLogin = this._doLogin.bind(this);
		this._addUser = this._addUser.bind(this);
		this._newUser = this._newUser.bind(this);
		this._login = this._login.bind(this);
		this._showContacts = this._showContacts.bind(this);
		this._showProfile = this._showProfile.bind(this);
		this._addContact = this._addContact.bind(this);
		this._logout = this._logout.bind(this);
	}

	_doLogin() {
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		if (username === '' || password === '') {
			alert('Please enter a valid Username and Password');
			return false;
		} else {
			axios.post('http://localhost:7000/authenticateUserApi', {
				username: username,
				password: password
			})
				.then(response => {
					if (response.data.success === 1) {
						// var loggedin = response.data.loggedin;
						localStorage.setItem('username', response.data.username);
						this.setState({
							isLoggedin: true
						});
					} else {
						alert('Invalid username or password');
						this.setState({
							isLoggedin: false
						});
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}
	_addUser() {
		this.setState({
			loginFlag: false
		});
	}
	_login() {
		this.setState({
			loginFlag: true
		});

	}
	_newUser() {
		var validation = document.getElementsByClassName('required1');
		var isinvalid = 0,
			isinvalid1 = 0,
			isinvalid2 = 0,
			isinvalid3 = 0,
			isinvalid4 = 0;
		for (var i = 0; i < validation.length; i++) {
			if (validation[i].value === '') {
				validation[i].parentElement.classList.add('has-error');
				isinvalid++;
			} else {
				validation[i].parentElement.classList.remove('has-error');
			}
		}
		(isinvalid > 0) ?
			this.setState({
				invalidForm: true
			}) :
			this.setState({
				invalidForm: false
			});
		if (isinvalid === 0) {
			var firstname = document.getElementById('firstname').value;
			var lastname = document.getElementById('lastname').value;
			var username = document.getElementById('username').value;
			var password = document.getElementById('password').value;
			var confirmpassword = document.getElementById('confpassword').value;
			var mobileno = document.getElementById('mobileno').value;
			var email = document.getElementById('email').value;
			if (password != confirmpassword) {
				isinvalid1++;
			}
			(isinvalid1 > 0) ?
				this.setState({
					invalidForm1: true
				}) :
				this.setState({
					invalidForm1: false
				});
			if (password.length < 7) {
				isinvalid2++;
			}
			(isinvalid2 > 0) ?
				this.setState({
					invalidForm2: true
				}) :
				this.setState({
					invalidForm2: false,
				});
			if (isNaN(mobileno)) {
				isinvalid4++;
			}
			(isinvalid4 > 0) ?
				this.setState({
					invalidForm4: true
				}) :
				this.setState({
					invalidForm4: false,
				});
			if (isinvalid3 === 0) {
				this.setState({ invalidForm3: false });
			}
		}
		if (isinvalid === 0 && isinvalid1 === 0 && isinvalid2 === 0 && isinvalid3 === 0 && isinvalid4 === 0) {
			axios.post('http://localhost:7000/checkDuplicateUser', {
				username: username
			})
				.then(response => {
					if (response.data.success === 1) {
						axios.post('http://localhost:7000/addNewUser', {
							username: username,
							firstname: firstname,
							lastname: lastname,
							mobileno: mobileno,
							email: email,
							password: password
						})
							.then(response => {
								if (response.data.success) {
									alert('User added successfully');
									setTimeout(() => {
										window.location = '/';
									}, 2000);
								}
							})
							.catch(function (error) {
								console.log(error);
							});
					} else {
						isinvalid3++;
						if (isinvalid3 > 0) {
							this.setState({
								invalidForm3: true
							});
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}
	_showProfile() {
		document.getElementById('profile').style.color = '#ffffff';
		document.getElementById('profile').style.backgroundColor = '#000000';
		document.getElementById('contacts').style.color = '#428bca';
		document.getElementById('contacts').style.backgroundColor = '#000000';
		document.getElementById('addcontact').style.color = '#428bca';
		document.getElementById('addcontact').style.backgroundColor = '#000000';
		this.setState({
			my_profile_flag: true,
			my_contacts_flag: false,
			my_addContact_flag: false
		});
	}
	_showContacts() {
		document.getElementById('profile').style.color = '#428bca';
		document.getElementById('profile').style.backgroundColor = '#000000';
		document.getElementById('contacts').style.color = '#ffffff';
		document.getElementById('contacts').style.backgroundColor = '#000000';
		document.getElementById('addcontact').style.color = '#428bca';
		document.getElementById('addcontact').style.backgroundColor = '#000000';
		this.setState({
			my_profile_flag: false,
			my_contacts_flag: true,
			my_addContact_flag: false
		});
	}
	_addContact() {
		document.getElementById('profile').style.color = '#428bca';
		document.getElementById('profile').style.backgroundColor = '#000000';
		document.getElementById('contacts').style.color = '#428bca';
		document.getElementById('contacts').style.backgroundColor = '#000000';
		document.getElementById('addcontact').style.color = '#ffffff';
		document.getElementById('addcontact').style.backgroundColor = '#000000';
		this.setState({
			my_profile_flag: false,
			my_contacts_flag: false,
			my_addContact_flag: true
		});
	}
	_logout() {
		localStorage.removeItem('username');
		this.setState({
			loginFlag: true
		});
	}
	render() {
		if (localStorage.getItem('username') != null) {
			return (
				<div>
					<Header />
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-4">
								<div className="sidebar">
									<ul>
										<li onClick={this._showProfile} className="list" id="profile"><i className="glyphicon glyphicon-user pull-right"></i>Show Profile </li>
										<li onClick={this._showContacts} className="list" id="contacts"><i className="glyphicon glyphicon-list-alt pull-right"></i>Show Contacts </li>
										<li onClick={this._addContact} className="list" id="addcontact"><i className="glyphicon glyphicon-plus pull-right"></i>Add New Contact </li>
										<li onClick={this._logout} className="logout list" id="logout"><i className="glyphicon glyphicon-off pull-right"></i>Logout </li>
									</ul>

								</div>
							</div>
							<div className="col-md-8">
								{(this.state.my_profile_flag) ? <MyProfile /> : null}
								{(this.state.my_contacts_flag) ? <MyContacts /> : null}
								{(this.state.my_addContact_flag) ? <AddContact /> : null}
							</div>
						</div>
					</div>
					<Footer />
				</div>
			);
		} else {
			return (
				<div>
					<Header />
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-4">
							</div>
							{(this.state.loginFlag) ? <div className="col-md-4 loginBg login_panel center">
								<h3 className=" text-center loginHeadingHomePage logincolor">
									Login
		                			</h3>
								<div className="form-group has-feedback">
									<input type="text" className="form-control loginInput" id="username" placeholder="Username" />
									<i className="glyphicon glyphicon-user form-control-feedback"></i>
								</div>
								<div className="form-group has-feedback">
									<input type="password" className="form-control loginInput" id="password" placeholder="Password" />
									<i className="glyphicon glyphicon-lock form-control-feedback"></i>
								</div>
								<div className="row">
									<div className="col-md-4"></div>
									<div className="col-md-4">
										<button type="button" onClick={this._doLogin} className="btn btn-success loginButton">
											Login
			                			</button>
									</div>
									<div className="col-md-4"></div>
								</div>
								<hr />
								<h4 className="logincolor"> New User ? </h4><button type="button" onClick={this._addUser} className="btn btn-primary left-margin">
									Register Now!
								</button>
							</div> : <div className="col-md-4 loginBg login_panel reg_here">
									<h3><span className="label label-danger">Register Here</span></h3>
									<h3 className=" text-center loginHeadingHomePage logincolor">
										New User
		                			</h3>
									<div className="form-group has-feedback">
										<input type="text" className="form-control loginInput required1" id="firstname" placeholder="Firstname" />
										<i className="glyphicon glyphicon-user form-control-feedback"></i>
									</div>
									<div className="form-group has-feedback">
										<input type="text" className="form-control loginInput required1" id="lastname" placeholder="Lastname" />
										<i className="glyphicon glyphicon-user form-control-feedback"></i>
									</div>
									<div className="form-group has-feedback">
										<input type="text" className="form-control loginInput required1" id="username" placeholder="Username" />
										<i className="glyphicon glyphicon-user form-control-feedback"></i>
									</div>
									{(this.state.invalidForm3) ? <div className="form-group text-center invalid_color">
										<h6>
											<span>Username exists</span>
										</h6>
									</div> : null}
									<div className={(this.state.invalidForm1 || this.state.invalidForm2) ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
										<input type="password" className="form-control required1 loginInput" id="password" placeholder="Password" />
										<i className="glyphicon glyphicon-lock form-control-feedback id= pass"></i>
									</div>
									{(this.state.invalidForm1) ? <div className="form-group text-center invalid_color">
										<h6>
											<span>Password does not match</span>
										</h6>
									</div> : null}
									{(this.state.invalidForm2) ? <div className="form-group text-center invalid_color">
										<h6>
											<span>Password should be greater than 8 characters</span>
										</h6>
									</div> : null}
									<div className={(this.state.invalidForm1 || this.state.invalidForm4) ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
										<input type="password" className="form-control required1 loginInput" id="confpassword" placeholder="Confirm Password" />
										<i className="glyphicon glyphicon-lock form-control-feedback"></i>
									</div>
									<div className="form-group has-feedback">
										<input type="text" className="form-control loginInput required1" id="mobileno" placeholder="Mobile No" />
										<i className="glyphicon glyphicon-phone form-control-feedback"></i>
									</div>
									<div className="form-group has-feedback">
										<input type="email" className="form-control loginInput required1" id="email" placeholder="E-Mail" />
										<i className="glyphicon glyphicon-envelope form-control-feedback"></i>
									</div>
									{this.state.invalidForm
										? <div className="form-group text-center invalid_color">
											<h6>
												<span>Please enter all the fields</span>
											</h6>
										</div>
										: null}
									<div className="row">
										<div className="col-md-4"></div>
										<div className="col-md-4">
											<button type="button" onClick={this._newUser} className="btn btn-primary loginButton">
												Submit
			                				</button>
										</div>
										<div className="col-md-4"></div>
									</div>
									<hr />
									<h4 className="logincolor">Already registered? </h4>
									<button type="button" onClick={this._login} className="btn btn-primary left-margin">
										Login
								</button>
								</div>}
							<div className="col-md-4"></div>
						</div>
					</div>
					<Footer />
				</div>
			);
		}
	}
}

export default LoginPage;
