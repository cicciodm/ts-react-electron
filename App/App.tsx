import * as React from "react";
import {Router, hashHistory, Route} from "react-router";

import MainContentPage from "./Components/Pages/MainContentPage";
import AboutMePage from "./Components/Pages/AboutMePage";

/* tslint:disable */
const styles: any = require("./App.module.less");
/* tslint:enable */

export default class App extends React.Component<{}, {}> {
    render(): React.ReactElement<{}> {
        return <Router history={hashHistory}>
                   <Route path="/" component={MainContentPage}>
                       <Route path="/aboutme" component={AboutMePage} />
                   </Route>
               </Router>;
    }
}