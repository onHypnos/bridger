import { _decorator, Component,director } from 'cc';
import GameSceneContext from "db://assets/Core/Context/GameSceneContext";
import {GameUiMediator} from "db://assets/Core/UI/GameUIMediator";
import {PlayerData, SaveLoad} from "db://assets/Core/Services/SaveLoad";
const { ccclass, property } = _decorator;


@ccclass('PlayerProfile')
export class PlayerProfile extends Component
{
    private ui:GameUiMediator;
    private currentMaximumScore:number;
    private currentScore:number;
    private saveLoad: SaveLoad;

    public Init(pContext: GameSceneContext)
    {
        this.ui = pContext.GetDependency(GameUiMediator);
        this.saveLoad = pContext.GetDependency(SaveLoad);
        let data = this.saveLoad.LoadData()
        this.currentMaximumScore = data.maximumScore;
    }

    public AddPoints(value:number){
        this.UpdatePointsValue(this.currentScore+value);
    }

    public ResetPoints() {
        this.UpdatePointsValue(0);
        this.ui.SetMaxPointsValue(this.currentMaximumScore);
    }

    public UpdatePointsValue(number: number)
    {
        this.currentScore = number;
        if(number > this.currentMaximumScore)
        {
            this.SaveNewMaximumScore(number);
        }
        this.ui.SetPointsValue(this.currentScore); //todo refactor to reactive
    }

    public SaveNewMaximumScore(number: number)
    {
        this.currentMaximumScore = number;
    }


    public GameOverMaxScoreCheck()
    {
        let beatHighScore = false;
        if(this.currentScore > this.currentMaximumScore)
        {
            this.SaveNewMaximumScore(this.currentScore);
            beatHighScore = true;
        }
        this.saveLoad.SaveData(new PlayerData("player",this.currentMaximumScore));
        this.ui.ShowEndgame(beatHighScore);
    }
}