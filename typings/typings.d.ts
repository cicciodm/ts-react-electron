///<reference types="react" />
///<reference types="react-dom" />
///<reference types="flux" />
///<reference types="react-router" />
///<reference types="history" />

///<reference path="./custom/webpack.d.ts"/>

declare module "react" {
    export = React;
}

declare module "react-dom" {
    export = ReactDOM;
}

declare module "react-router" {
    export = ReactRouter;
}

declare module "history" {
    export = RouterHistory;
}