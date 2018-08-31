import React from 'react';
import axios from 'axios';

class AddUser extends React.Component {
	constructor() {
		super();
		this.state = {
			invalidForm: false,
			invalidForm1: false
		};
		this._addContact = this._addContact.bind(this);
	}

	_addContact(e) {
		e.preventDefault();
		var validation = document.getElementsByClassName('required1');
		var isinvalid = 0,
			isinvalid1 = 0;
		for (var i = 0; i < validation.length; i++) {
			if (validation[i].value === '' || validation[i].value === 'role') {
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
			var fullname = document.getElementById('fullname').value;
			var mobileno = document.getElementById('mobileno').value;
			var email = document.getElementById('email').value;
			if (isNaN(mobileno)) {
				isinvalid1++;
			}
			(isinvalid1 > 0) ?
				this.setState({
					invalidForm1: true
				}) :
				this.setState({
					invalidForm1: false
				});
		}
		if (isinvalid === 0 && isinvalid1 === 0) {
			axios.post('http://localhost:7000/addNewContact', {
				fullname: fullname,
				mobileno: mobileno,
				email: email,
				username: localStorage.getItem('username'),
			})
				.then(response => {
					if (response.data.success) {
						alert('Contact added successfully');
						setTimeout(() => {
							window.location = '/';
						}, 2000);
					}
				})
				.catch(function (error) {
					alert(error);
				});


		}
	}
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3>
									New Contact
								</h3>
							</div>
							<div className="panel-body">
								<form id="newContactForm" onSubmit={this._addContact}>
									<div className="form-group has-feedback">
										<input type="text" className="form-control required1" id="fullname" placeholder="FullNsame" />
										<i className="glyphicon glyphicon-user form-control-feedback"></i>
									</div>
									<div className="form-group has-feedback">
										<input type="text" className="form-control required1" id="mobileno" placeholder="Mobile Number" />
										<i className="glyphicon glyphicon-phone form-control-feedback"></i>
									</div>
									{this.state.invalidForm1
										? <div className="form-group text-center invalid_color">
											<h6>
												<span>Mobile Number should be numeric</span>
											</h6>
										</div>
										: null}
									<div className="form-group has-feedback">
										<input type="email" className="form-control required1" id="email" placeholder="E-Mail" />
										<i className="glyphicon glyphicon-envelope form-control-feedback"></i>
									</div>
									{this.state.invalidForm
										? <div className="form-group text-center invalid_color">
											<h6>
												<span>Please enter all the fields</span>
											</h6>
										</div>
										: null}
									<div className="form-group text-center">
										<button className="btn btn-primary" >Submit</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddUser;
