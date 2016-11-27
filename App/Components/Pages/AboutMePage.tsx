import * as React from "react";
import SmartComponent from "../SmartComponent";

export default class AboutMePage extends SmartComponent<{}, {}> {
    constructor() {
        super();
    }

    render(): React.ReactElement<{}> {
        return <div>
                {"This is the about me page! I am Francesco!"}
               </div>;
    }

    getState(): {} {
        return {};
    };
}