import IAction from "./../Actions/IAction";
import Dispatcher from "./Dispatcher";

// Represents the constructor of an object of type T
interface IConstructorOf<T> {
    /* tslint:disable */
    new(...args: any[]): T;
    /* tslint:enable */
}

interface IActionCallbackInfo {
    action: IConstructorOf<IAction>;
    callback: (action: IAction) => void;
}

abstract class DispatcherListener {
    // Map between action type and callback function
    private actionMap: IActionCallbackInfo[];
    // A callback to invoke on any action
    private genericActionCallback: (action: IAction) => void;
    private token: string = null;

    constructor() {
        this.actionMap = [];
        this.token = Dispatcher.register((action: IAction) => this.onActionSent(action));
    }

    get dispatchToken(): string {
        return this.token;
    }

    public addActionCallback<T extends IAction>(action: IConstructorOf<T>, callback: (action: T) => void): void {
        this.actionMap.push({action, callback: callback.bind(this)});
    }

    public addGenericCallback(callback: (action: IAction) => void): void {
        this.genericActionCallback = callback.bind(this);
    }

    protected abstract postProcessAction(): void;

    private onActionSent(action: IAction): void {
        if (this.genericActionCallback) {
            this.tryProcessAction(this.genericActionCallback, action);
        }

        for (let i: number = 0; i < this.actionMap.length; i++) {
            const actionCallbackInfo: IActionCallbackInfo = this.actionMap[i];
            if (action instanceof actionCallbackInfo.action) {
                this.tryProcessAction(actionCallbackInfo.callback, action);
                this.postProcessAction();
                break;
            }
        }
    }

    private tryProcessAction(callback: (action: IAction) => void, action: IAction): void {
        try {
            callback(action);
        } catch (error) {
            alert("Something went wrong while processing action. More info in the console");
            console.log(error);
        }
    }
}

export default DispatcherListener;