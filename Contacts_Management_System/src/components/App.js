/*
Author: Team Saturn
*/
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';

const App = () => {
	return (
		<Router>
			<div className='main1'>
				<Route exact path='/' component={LoginPage} />
			</div>
		</Router>

	);
};

export default App;
