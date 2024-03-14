import {UiPanel} from "db://assets/Core/UI/UiPanel";
import {GameUiMediator} from "db://assets/Core/UI/GameUIMediator";
import { _decorator, Button,Label} from 'cc';
const { ccclass, property } = _decorator;
@ccclass("EndgameUiPanel")
export class EndgameUiPanel extends UiPanel
{

    @property({
        type:Button
    })
    private restartButton:Button;
    @property({
        type:Button
    })
    private homeButton:Button;
    @property({
        type:Label
    })
    private currentPoints:Label
    ;@property({
        type:Label
    })
    private maxPoints:Label;

    public Init(mediator: GameUiMediator){
        //this.restartButton.node.on(Button.EventType.CLICK, () => mediator.ShowGame());
    }

    public BindRestart(restart: () => void) {
        this.restartButton.node.on(Button.EventType.CLICK, () => restart());
    }

    public BindHome(home: () => void) {
        this.homeButton.node.on(Button.EventType.CLICK, () => home());
    }

    public UpdateMaxPointsValue(currentMaximumScore: number) {
        this.maxPoints.string = currentMaximumScore.toString();
    }

    public BeatHighScore(beatHighScore: boolean) {
        //start beatscore animation
    }

    public UpdatePointsValue(currentScore: number) {
        this.currentPoints.string = currentScore.toString();
    }
}