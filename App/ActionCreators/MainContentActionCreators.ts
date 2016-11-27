import Dispatcher from "./../Dispatcher/Dispatcher";
import MainContentPageAddButtonClickedAction from "./../Actions/MainContentActions/MainContentPageAddButtonClickedAction";
import MainContentPageRemoveButtonClickedAction from "./../Actions/MainContentActions/MainContentPageRemoveButtonClickedAction";

export function mainContentPageAddButtonClick(): void {
    Dispatcher.dispatch(new MainContentPageAddButtonClickedAction());
}

export function mainContentPageRemoveButtonClick(): void {
    Dispatcher.dispatch(new MainContentPageRemoveButtonClickedAction());
}   