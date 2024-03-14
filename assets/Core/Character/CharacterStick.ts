import { _decorator, Component, director, math, UITransform, Vec3} from 'cc';
import {CharacterMovement} from "./CharacterMovement";
import {CharacterMediator} from "db://assets/Core/Character/CharacterMediator";

const {ccclass, property} = _decorator;


@ccclass('CharacterStick')
export class CharacterStick extends Component {
    @property({
        type: UITransform
    })
    private transform: UITransform;

    private initialWidth: math.Size;

    start()
    {
        this.initialWidth = this.transform.contentSize;
        this.Reset();
    }

    public Reset()
    {
        this.transform.contentSize =this.initialWidth;
    }

    public RotateToMoving()
    {

    }

}