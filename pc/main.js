/**
 * Created by panchong on 17/7/4.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import App from './components/app';
import PATH from './components/common/path';
import IndexComponent from './components/indexPage/indexPage';
import TestPage from './components/testPage/testPage';
import './commonLess/common.less';

const main = () => {
    ReactDOM.render((<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={IndexComponent} />
            <Route path={`${PATH.testPage}/:type/:subject/:time/(:modal)`} component={TestPage} />
        </Route>
    </Router>), document.getElementById('root'),
    );
};
main();
