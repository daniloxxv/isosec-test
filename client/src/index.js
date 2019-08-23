import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './Wrapper';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Wrapper />, document.getElementById('root'));


serviceWorker.unregister();