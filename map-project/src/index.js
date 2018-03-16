import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.css';
import './css/mapProject.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
