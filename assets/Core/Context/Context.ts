import {_decorator, Component} from 'cc';

const { ccclass, property } = _decorator;


export class Context extends Component {
    protected dependencies: Map<new () => Component, Component> = new Map();

    protected Bind<T extends Component>(value: T): void {
        if (value) {
            this.dependencies.set(value.constructor as new () => Component, value);
        } else {
            console.error("Cannot bind null or undefined value. Проверь экземпляр");
        }
    }

    public GetDependency<T extends Component>(type: new () => T): T | undefined {
        return this.dependencies.get(type) as T | undefined;
    }
}

