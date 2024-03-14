import { _decorator, Component, director, Button, EventHandler, Node } from 'cc';
import ProjectContext from "../Context/ProjectContext";
import {SceneStateMachine} from "db://assets/Core/SceneStateMachine";
import MenuUiPanel from "db://assets/Core/UI/MenuUiPanel";
import GameUiPanel from "db://assets/Core/UI/GameUIPanel";
import {EndgameUiPanel} from "db://assets/Core/UI/EndgameUiPanel";
import {CurtainUI} from "db://assets/Core/UI/CurtainUI";
const { ccclass, property } = _decorator;

@ccclass('GameUiMediator')
export class GameUiMediator extends Component {
    @property({
        type: MenuUiPanel
    })
    private menuPanel: MenuUiPanel;
    @property({
        type: GameUiPanel
    })
    private gamePanel: GameUiPanel;
    @property({
        type: EndgameUiPanel
    })
    private endgamePanel:EndgameUiPanel;

    @property({
        type: CurtainUI
    })
    private curtain:CurtainUI;
    public Init(){
        this.menuPanel.Init(this);
        this.gamePanel.Init(this);
        this.endgamePanel.Init(this);
        this.curtain.ShowImmediately();
    }

    public ShowMenu()
    {
        this.HideCurtain().start();
        this.HideAllPanel();
        this.menuPanel.Show();
    }

    public ShowGame()
    {
        this.HideAllPanel();
        this.gamePanel.Show();
    }

    public ShowEndgame(beatHighScore?:boolean) {
        this.HideAllPanel();
        this.endgamePanel.Show();
        this.endgamePanel.BeatHighScore(beatHighScore);
    }

    private HideAllPanel()
    {
        this.menuPanel.Hide();
        this.gamePanel.Hide();
        this.endgamePanel.Hide();
    }

    public ShowCurtain(){
        return this.curtain.ShowCurtain();
    }

    public HideCurtain(){
        return this.curtain.HideCurtain();
    }

    public BindRestartButton(restartGameCallback: () => void) {
        let show = this.ShowCurtain();
        let restart = () =>{
            show.call(restartGameCallback).start();
        }
        this.endgamePanel.BindRestart(restart);
    }

    public BindHomeButton(homeCallback: () => void) {
        let show = this.ShowCurtain();
        let home = () =>{
            show.call(homeCallback).start();
        }

        this.endgamePanel.BindHome(home);
    }

    public BindStartGameButton(startGameCallback: () => void) {
        this.menuPanel.BindStartGame( startGameCallback);
    }

    public SetPointsValue(currentScore: number) {
        this.gamePanel.UpdatePointsValue(currentScore);
        this.endgamePanel.UpdatePointsValue(currentScore);
    }

    public SetMaxPointsValue(currentMaximumScore: number) {
        this.endgamePanel.UpdateMaxPointsValue(currentMaximumScore);
    }
}
