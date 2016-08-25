// React dependencies
import React from 'react';
import { render } from 'react-dom';

// app dependencies
import routes from './config/routes';

// APP INIT
render(
	routes,
	document.getElementById('container')
);