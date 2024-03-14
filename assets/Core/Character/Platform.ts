import { _decorator, Component, director,UITransform, Vec3, math, tween, Tween,CCFloat, Node, CCInteger} from 'cc';
import {GetRandomNumberInRange} from "db://assets/Core/Utils/Utils";
import { Stick } from './Stick';
const { ccclass, property } = _decorator;


@ccclass('Platform')
export class Platform extends Component
{
    @property({
        type: UITransform
    })
    private transform:UITransform;

    @property({
        type : CCFloat
    })
    public platformSize:number;

    @property({
        type: Stick
    })
    public stick:Stick;

    @property({
        type:Node
    })
    private rewardZone:Node;
    @property({
        type:CCInteger
    })
    private minSize = 50;
    @property({
        type:CCInteger
    })
    private maxSize = 120;

    public rewardSize:number = 20;

    public nextMovingPoint:Vec3;


    public SetSize(value:number)
    {
        this.platformSize = value;
        this.stick.node.position = new Vec3(value * 0.5, 0, 0);
        this.transform.setContentSize(value, this.transform.contentSize.y);
        this.UpdateMovingPointPosition(value);
    }

    public WarpToPosition(newPosition:Vec3)
    {
        this.node.position = newPosition;
    }

    public MoveToPosition(newPosition: Vec3){
        let onCompleteCallback = () => this.UpdateMovingPointPosition(this.platformSize);

        return tween(this.node.position).to( 0.2, newPosition,
            {
                onUpdate : (target:Vec3)=>{
                    this.node.position = target;
                },
                onComplete:(target:Vec3)=>{
                    onCompleteCallback();
                }
            });
    }

    public UpdateMovingPointPosition(value: number){
        const { x, y, z } = this.node.position;
        this.nextMovingPoint = new Vec3(x + (value * 0.5), y, z);
    }



    public RandomiseSize() {
        this.SetSize(GetRandomNumberInRange(this.minSize,this.maxSize))
        return this.platformSize;
    }

    public Reset()
    {
        this.stick.Reset();
        this.WarpToPosition(new Vec3(0,-1000,0));
        Tween.stopAllByTarget(this.node.position);
    }

    public SetStickValue(currentStickValue: number) {
        this.stick.SetSize(currentStickValue)
    }

    public ShowReward()
    {
        this.rewardZone.active = true;
    }

    public HideReward() {
        this.rewardZone.active = false;
    }

    public RotateStick() {
        return this.stick.Rotate();
    }
    public RotateStickToFall() {
        return this.stick.RotateToFall();
    }
}