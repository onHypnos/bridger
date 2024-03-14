import { Component, UITransform, Vec3, _decorator, tween } from "cc";
const { ccclass, property } = _decorator;


@ccclass('Stick')
export class Stick extends Component{
    @property({
        type: UITransform
    })
    private transform:UITransform;


    public SetSize(value:number) {
        this.transform.setContentSize(this.transform.contentSize.x,value);
    }

    public Rotate() {
        return tween(this.node).to(0.2, {eulerAngles: new Vec3(0, 0, -90)},
            {});
    }

    public RotateToFall() {
        return tween(this.node).to(0.2, {eulerAngles: new Vec3(0, 0, -180)},
            {});
    }

    public Reset(){
        this.node.eulerAngles = new Vec3(0,0,0);
        this.SetSize(0);
    }
}