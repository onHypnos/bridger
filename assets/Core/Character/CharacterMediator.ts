import { _decorator, Component,director, Vec3 } from 'cc';
import {CharacterMovement} from "./CharacterMovement";
import {CharacterVisual} from "db://assets/Core/Character/CharacterVisual";
const { ccclass, property } = _decorator;

@ccclass('CharacterMediator')
export class CharacterMediator extends Component
{
    @property({
        type:CharacterMovement
    })
    private cMovement:CharacterMovement;
    @property({
        type:CharacterVisual
    })
    private cVisual:CharacterVisual;

    //character animator


    public Init()
    {
        this.cMovement.Init();
        this.cVisual.Init();
    }

    public GetCurrentVisualWidth():number
    {
        if(this.cVisual)
            return this.cVisual.width;
        else
            return 0;
    }

    public WarpToPosition(newPosition:Vec3)
    {
        this.cMovement.Warp(newPosition);
    }

    public MoveToPosition(newPosition:Vec3) {
        return this.cMovement.MoveTo(newPosition);
    }

    public TranslateToPosition(newPosition:Vec3){
        return this.cMovement.TranslateTo(newPosition);
    }

    public DropCharacterDown(downPosition:Vec3) {
        return this.cMovement.MoveDown(downPosition);
    }

    public Reset(){
        this.cMovement.StopAllMovements();
    }
}