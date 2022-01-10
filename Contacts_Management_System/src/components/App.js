/*
Author: Team Saturn
*/
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'react-router';
import LoginPage from './LoginPage/LoginPage';

const App = () => {
	return (
		<Router>
			<div className='app test'>
				<Routes>
					<Route exact path='/' element={<LoginPage />} />
				</Routes>
			</div>
		</Router>

	);
};

export default App;
