import { _decorator, Component, director, Button, EventHandler, Node, UITransform, Label } from 'cc';
import {UiPanel} from "db://assets/Core/UI/UiPanel";
import {GameUiMediator} from "db://assets/Core/UI/GameUIMediator";
const { ccclass, property } = _decorator;

@ccclass('GameUiPanel')
class GameUiPanel extends UiPanel {

    @property({
        type:Label
    })
    private currentPoints:Label;

    public Init(mediator: GameUiMediator){
    }

    public UpdatePointsValue(currentScore: number) {
        this.currentPoints.string = currentScore.toString();
    }

    public SetCurrencyValue()
    {
        //add cherry
    }
}


export default GameUiPanel;