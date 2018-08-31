import React from 'react';
import axios from 'axios';

class WelcomeUser extends React.Component {

	constructor() {
		super();
		this.state = {
			loginFlag: false
		};
	}
	render() {
		return (
			<div className="container-fluid pull-right pull-right1">
				<div className="btn-group">
					<span><button className="btn btn-sm user-label welcome_user" role="button" aria-disabled="true"><span className="glyphicon glyphicon-home"></span> Welcome {this.state.username}</button></span>
				</div>
			</div>
		);
	}
	componentWillMount() {
		axios.post('http://localhost:7000/getUsername', {
			username: localStorage.getItem('username'),
		})
			.then(response => {
				if (response.data.success === 1) {
					this.setState({
						username: response.data.username
					});
				} else {
					alert('Invalid');
				}
			})
			.catch(function (error) {
				alert(error);
			});
	}

}

export default WelcomeUser;
