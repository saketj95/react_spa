import React from 'react';
import axios from 'axios';

class MyContact extends React.Component {
	constructor() {
		super();
		this.state = {
			no_contact_flag: false
		};
		this._getData = this._getData.bind(this);
	}


	_getData() {
		let username = localStorage.getItem('username');
		axios.post('http://localhost:7000/showContactData', {
			username: username
		})
			.then(response => {
				if (response.data.success === 1) {
					this.setState({
						contact_name: response.data.contact_name,
						contact_number: response.data.contact_number,
						email: response.data.email,
						count: response.data.count
					});
				} else {
					this.setState({
						no_contact_flag: true
					});
				}
			})
			.catch(function (error) {
				alert(error);
			});
		var data = [];
		if(this.state.no_contact_flag == true){
			data.push(
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<h3 className="logincolor">No contact added yet.</h3>
						</div>
					</div>
				</div>
			);
			return (data);
		}
		else{
			for (var i = 0; i < this.state.count; i++) {
				data.push(
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-12">
								<div className="panel panel-primary">
									<div className="panel-heading">
										<h3 className="panel-title">
									Contact No :-{(i +1)}
										</h3>
									</div>
									<div className="panel-body">
								Contact Name :-{(this.state.contact_name[i])}
									</div>
									<div className="panel-body">
								Contact Number :-{(this.state.contact_number[i])}
									</div>
									<div className="panel-body">
								Email Address :-{(this.state.email[i])}
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
			return (data);
		}
	}
	render() {
		return (
			<div>
				{this._getData()}
			</div>
		);
	}
}

export default MyContact;
