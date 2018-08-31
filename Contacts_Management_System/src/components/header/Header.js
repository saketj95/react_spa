import React from 'react';
import logo from '../../assets/images/Cybage_Logo.png';
import WelcomeUser from './WelcomeUser';

class Header extends React.Component {
	render() {
		return (
			<div className="container-fluid  header-style">
				<div className="row">
					<div className="col-md-2">
						<img alt="Cybage Logo" src={logo} height="110px" />
					</div>
					<div className="col-md-10">
						<h1 className="text-center text-primary header-text">
                        Contacts Management System
						</h1>
					</div>
					{localStorage.getItem('username') ? <WelcomeUser/> : null}
				</div>
			</div>
		);
	}
}

export default Header;
