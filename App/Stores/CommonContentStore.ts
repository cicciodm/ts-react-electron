import BaseStore from "./BaseStore";
import MainContentPageAddButtonClickedAction from "./../Actions/MainContentActions/MainContentPageAddButtonClickedAction";
import MainContentPageRemoveButtonClickedAction from "./../Actions/MainContentActions/MainContentPageRemoveButtonClickedAction";

class CommonContentStore extends BaseStore {

    private _clickCount: number = 0;

    constructor() {
        super();

        this.addActionCallback(MainContentPageAddButtonClickedAction, this.onAddButtonClicked);
        this.addActionCallback(MainContentPageRemoveButtonClickedAction, this.onRemoveButtonClicked);
    }

    public get clickCount(): number {
        return this._clickCount;
    }

    private onAddButtonClicked(action: MainContentPageAddButtonClickedAction): void {
        this._clickCount++;
    }
    
    private onRemoveButtonClicked(action: MainContentPageRemoveButtonClickedAction): void {
        this._clickCount--;
    }
}

export default new CommonContentStore();