import React from 'react';
import {Link} from 'react-router';

export default class GlobalHeader extends React.Component {
    render() {
        return (
            <header className="globalHeader">
                <Link to="/">
                    <img src="assets/img/logo.jpg" width="60" />
                    Meels<span className="visibly-hidden"> home page</span>
                </Link>
                <nav className="globalNav">
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/recipes">
                                Recipes
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories">
                                Categories
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
        )
    }
}