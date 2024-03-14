import { _decorator, Component,director,UITransform, Vec3, math, tween, CCFloat, Prefab, CCInteger, instantiate} from 'cc';
import {Platform} from "../Character/Platform";
const { ccclass, property } = _decorator;


@ccclass('PlatformFabric')
export class PlatformFabric extends Component
{
    @property({
        type : Prefab
    })
    public platformExample:Prefab;
    @property({
        type: CCInteger
    })
    public poolSize:number = 3;

    public platformsPool = [];
    private index:number = 0;

    public Init()
    {
        for (let i = 0; i < this.poolSize; i++) {

            let instance =instantiate(this.platformExample);
            instance.parent = this.node;
            this.platformsPool.push(instance.getComponent(Platform));
        }
    }

    public GetPlatform():Platform
    {
        let result =this.platformsPool[this.index];
        this.index++;
        if(this.index>=this.platformsPool.length)
        {
            this.index=0;
        }
        return result;
    }


    public ResetIndex() {
        this.index = 0;
    }
}