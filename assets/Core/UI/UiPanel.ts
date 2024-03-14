import { _decorator, Component, director, Button, EventHandler, Node, UITransform } from 'cc';
import {GameUiMediator} from "db://assets/Core/UI/GameUIMediator";
const { ccclass, property } = _decorator;


export class UiPanel extends Component {
    @property({
        type: UITransform
    })
    private transform: UITransform;
    private gameUiMediator:GameUiMediator;


    public Show(){
        this.Activate();
    }

    public Activate(){
        this.node.active = true;
    }

    public Hide(){
        this.Deactivate();
    }

    public Deactivate() {
        this.node.active = false;
    }
}
