import {Component, sys, _decorator } from "cc";
const { ccclass, property } = _decorator;


@ccclass('SaveLoad')
export class SaveLoad extends Component{

    public SaveData(data:PlayerData){
        sys.localStorage.setItem('userData', JSON.stringify(data));
    }

    public LoadData(){
        let item = sys.localStorage.getItem('userData');
        let result:PlayerData;
        if(item!=null)
            result = JSON.parse(sys.localStorage.getItem('userData'));
        else
            result = new PlayerData("player",0);
        return result;
    }


}

export class PlayerData{
    public name:string;
    public maximumScore:number;

    constructor(name:string, maximumScore:number) {
        this.name = name;
        this.maximumScore = maximumScore;
    }
}