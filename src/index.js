import React from 'react';
import ReactDOM from 'react-dom';
import 'moment-duration-format';
import './index.less';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
