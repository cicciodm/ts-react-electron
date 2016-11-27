import DispatchListener from "./../Dispatcher/DispatcherListener";

abstract class BaseStore extends DispatchListener {
    // Set of listeners who want to be notified when there is a change in the stores
    private listeners: Array<() => void> = null;
    
    constructor() {
        super();
        this.listeners = [];
    }

    addListener(listener: () => void): void {
        this.listeners.push(listener);
    }

    removeListener(listener: () => void): void {
        const index: number = this.listeners.indexOf(listener);

        if (index !== -1) {
            this.listeners.splice(index, 1);
        } else {
            alert("Tried to remove listener that was never added");
        }
    }

    protected emitChange(): void {
        this.listeners.forEach(listener => {
            listener();
        });
    }

    protected postProcessAction(): void {
        this.emitChange();
    }
}

export default BaseStore;