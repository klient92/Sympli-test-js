import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { storeConfig } from './store/storeConfig'
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(<Provider store={storeConfig}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
