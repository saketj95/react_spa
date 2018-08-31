import React from 'react';
import axios from 'axios';

class MyProfile extends React.Component {
	constructor() {
		super();
		this.state = {
			uneditable: false,
			disable: true
		};
		this._edit = this._edit.bind(this);
		this._save = this._save.bind(this);
	}
	componentWillMount() {
		let username = localStorage.getItem('username');
		axios.post('http://localhost:7000/showProfileData', {
			username: username
		})
			.then(response => {
				if (response.data.success === 1) {
					this.setState({
						profile_fname: response.data.profile_fname,
						profile_lname: response.data.profile_lname,
						profile_email: response.data.profile_email,
						profile_uname: response.data.profile_uname,
						profile_mobileno: response.data.profile_mobileno,
					});
				} else {
					null;
				}
			})
			.catch(function (error) {
				alert(error);
			});
	}
	_edit() {
		debugger;
		var fname = document.getElementById("fname").value;
		this.state.profile_fname = this.fname;
		var lname = document.getElementById("lname").value;
		this.state.profile_lname = this.lname;
		var email = document.getElementById("email").value;
		this.state.profile_email = this.email;
		var mobileno = document.getElementById("mobileno").value;
		this.state.profile_mobileno = this.mobileno;
		this.setState({
			uneditable: false,
			disable: false
		});
		var input_background = document.getElementsByClassName("input-background");
		for (var i = 0; i < input_background.length; i++) {
			input_background[i].classList.add('input');
		}
	}
	_save() {
		var username = localStorage.getItem("username",username);
		console.log(localStorage.getItem("username",username));
		var fname = document.getElementById("fname").value;
		this.state.profile_fname = this.fname;
		var lname = document.getElementById("lname").value;
		this.state.profile_lname = this.lname;
		var email = document.getElementById("email").value;
		this.state.profile_email = this.email;
		var mobileno = document.getElementById("mobileno").value;
		this.state.profile_mobileno = this.mobileno;
		this.setState({
			uneditable: true,
			disable: true
		});
		var input_background = document.getElementsByClassName("input-background");
		for (var i = 0; i < input_background.length; i++) {
			input_background[i].classList.remove('input');
		}
		if((fname === "") || (lname === "") || (email === "") || (mobileno === "")){
			console.log("blank");
		} 
		//axios call
			axios.post('http://localhost:7000/changeDetails', {
				username: username,
				fname: fname,
				lname: lname,
				email: email,
				mobileno: mobileno
			})
				.then(response => {
					if (response.data.success === 1) {
						alert("Details updated successfully");
					}
				})
				.catch(function (error) {
					console.log(error);
				});
				

	}
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						<h3 className="logincolor"><span className="label label-danger">User Name :- </span></h3>
						<input type="text" className="left-margin" value={(this.state.profile_uname)} disabled />
						<hr />
						<h3 className="logincolor"><span className="label label-danger">First Name :- </span></h3>
						<input type="text" id="fname" className="left-margin input-background" disabled={(this.state.disable) ? true : false} value={(this.state.uneditable) ? (this.state.profile_fname) : (this.state.profile_fname)} />
						<hr />
						<h3 className="logincolor"><span className="label label-danger">Last Name :- </span></h3>
						<input type="text" id="lname" className="left-margin input-background" disabled={(this.state.disable) ? true : false} value={(this.state.uneditable) ? (this.state.profile_lname) : (this.state.profile_lname)} />
						<hr />
						<h3 className="logincolor"><span className="label label-danger">Mobile Number :- </span></h3>
						<input type="text" id="mobileno" className="left-margin1 input-background" disabled={(this.state.disable) ? true : false} value={(this.state.uneditable) ? (this.state.profile_mobileno) : (this.state.profile_mobileno)} />
						<hr />
						<h3 className="logincolor"><span className="label label-danger">E-Mail :- </span></h3>
						<input type="text" id="email" className="left-margin2 input-background" disabled={(this.state.disable) ? true : false} value={(this.state.uneditable) ? (this.state.profile_email) : (this.state.profile_email)} />
						<hr />
						<div className="row">
							<div className="col-md-4"></div>
							<div className="col-md-4">
								<button type="button" className="btn btn-warning" onClick={this._edit}>
									<span className="glyphicon glyphicon-pencil"></span> Edit
								</button>
								<button type="button" className="btn btn-success pull-right" onClick={this._save}>
									<span className="glyphicon glyphicon-save"></span> Save
								</button>
							</div>
							<div className="col-md-4"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyProfile;
