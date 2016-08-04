/******************************************************************************/
// DEPENDENCIES
/******************************************************************************/

// React
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

/******************************************************************************/
// PAGE TEMPLATE CLASS
/******************************************************************************/

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<header className="globalHeader">
					<a href="#">
						<img src="assets/img/logo.jpg" width="60" />
						Meels
					</a>
					<nav className="globalNav">
						<ul>
							<li>
								<Link to="/home">
									Home
								</Link>
							</li>
							<li>
								<Link to="/list">
									Recipes
								</Link>
							</li>
							<li>
								<Link to="/newRecipe">
									New
								</Link>
							</li>
						</ul>
					</nav>
				</header>
				<main>
					{this.props.children}
				</main>
				<footer className="globalFooter">
					<small>&copy; 2016 Phil Gibbins</small>
				</footer>
			</div>
		)
	}
}