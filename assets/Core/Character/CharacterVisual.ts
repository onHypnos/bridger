import {_decorator, CCFloat, Component, director, Sprite, Tween, tween, UITransform, Vec3} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('CharacterVisual')
export class CharacterVisual extends Component {
    @property({
        type:Sprite
    })
    public image:Sprite;
    @property({
        type:UITransform
    })
    public uiTransform:UITransform;

    public width:number;
    public Init() {
        this.width = this.uiTransform.contentSize.x;
    }


}
