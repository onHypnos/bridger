import {_decorator, Component, instantiate, Prefab} from 'cc';
import {CharacterMediator} from "./CharacterMediator";
import {CharacterStick} from "db://assets/Core/Character/CharacterStick";

const { ccclass, property } = _decorator;

@ccclass('CharacterFabric')
export class CharacterFabric extends Component
{
    @property({
        type:Prefab
    })
    private characterExample:Prefab;

    public Init()
    {

    }

    public SpawnCharacter():CharacterMediator {
        let character = instantiate(this.characterExample);
        character.parent = this.node;
        return character.getComponent(CharacterMediator);
    }
}