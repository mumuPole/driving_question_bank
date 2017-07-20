/**
 * Created by panchong on 17/7/4.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import App from './components/app';
import IndexComponent from './components/indexPage/indexPage';
import './commonLess/common.less';

const main = () => {
    ReactDOM.render((<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={IndexComponent} />
        </Route>
    </Router>), document.getElementById('root'),
    );
};
main();
