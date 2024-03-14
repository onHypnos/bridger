import {_decorator, CCFloat, Component, director, Tween, tween, Vec3} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('CharacterMovement')
export class CharacterMovement extends Component {
    public Init() {
        //init characterAnimator
    }

    public Warp(toPosition: Vec3) {
        this.node.position = toPosition;
    }

    public MoveTo(position: Vec3) {
        //animator.setState(moving);
        return tween(this.node.position).to(.5, position,
            {
                onUpdate : (target:Vec3)=>{
                    this.node.position = target;
                }
            });
    }

    public TranslateTo(position: Vec3)
    {
        //animator.setState(idle);
        return tween(this.node.position).to( 0.2, position,
            {
                onUpdate : (target:Vec3)=>{
                    this.node.position = target;
                }
            });
    }


    public MoveDown(position: Vec3) {
        let newPosition = new Vec3(position.x, position.y, position.z);

        //animator.setState(falling);
        return tween(this.node.position).to(1, position,
            {
                onUpdate: (target: Vec3) => {
                    this.node.position = target;
                }
            });
    }

    public StopAllMovements() {
        Tween.stopAllByTag(1);
        //characterAnimator.setState(idle)
    }
}
