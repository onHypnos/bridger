import { _decorator, Component, director, Button, EventHandler, Node, UITransform } from 'cc';
import {UiPanel} from "db://assets/Core/UI/UiPanel";
import {GameUiMediator} from "db://assets/Core/UI/GameUIMediator";
const { ccclass, property } = _decorator;

@ccclass('MenuUiPanel')
class MenuUiPanel extends UiPanel {

    @property({
        type:Button
    })
    startButton:Button;

    public Init(mediator: GameUiMediator){
        this.startButton.node.on(Button.EventType.CLICK, () => mediator.ShowGame());
    }




    public BindStartGame(startGame: () => void) {
        this.startButton.node.on(Button.EventType.CLICK, () => startGame());
    }
}


export default MenuUiPanel;