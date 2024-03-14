import {Component, Sprite, _decorator, tween, UIOpacity, CCFloat} from "cc";
import {UiPanel} from "db://assets/Core/UI/UiPanel";

const {ccclass, property} = _decorator;

@ccclass("CurtainUI")
export class CurtainUI extends UiPanel {
    @property({
        type: UIOpacity
    })
    private opacity: UIOpacity;

    @property({
        type: CCFloat
    })
    private showingDuration: number = 0.5;

    public  ShowCurtain() {
        super.Show();
        return tween(this.opacity)
            .to(this.showingDuration, {opacity: 255},
                {
                    onUpdate:(target:UIOpacity,ratio:number)=>{
                        this.opacity= target;
                    }
                })
    }

    public  HideCurtain() {
        return tween(this.opacity)
            .to(this.showingDuration, {opacity:0},
                {
                    onUpdate:(target:UIOpacity,ratio:number)=>{
                        this.opacity= target;
                    }
                });
    }

    public ShowImmediately(){
        this.opacity.opacity=255;
        super.Activate();
    }

    public HideImmediately(){
        this.opacity.opacity=0;
        super.Deactivate();
    }
}