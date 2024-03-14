import { _decorator, Component,director } from 'cc';
import {Context} from "./Context";
import ProjectContext from "db://assets/Core/Context/ProjectContext";
import {GameStateMachine} from "db://assets/Core/GameStates/GameStateMachine";
import {GameUiMediator} from "db://assets/Core/UI/GameUIMediator";
import {CharacterFabric} from "db://assets/Core/Character/CharacterFabric";
import {SceneContext} from "db://assets/Core/Context/SceneContext";
import {PlatformFabric} from "db://assets/Core/Character/PlatformFabric";
import { InputHandler } from '../Services/InputHandler';
import {PlayerProfile} from "db://assets/Core/Services/PlayerProfile";
import {SaveLoad} from "db://assets/Core/Services/SaveLoad";
import {SoundManager} from "db://assets/Core/Services/SoundManager";
const { ccclass, property } = _decorator;

@ccclass('GameSceneContext')
class GameSceneContext extends SceneContext {
    @property({
        type:GameStateMachine
    })
    private gameStateMachine:GameStateMachine;
    @property({
        type:CharacterFabric
    })
    private characterFabric:CharacterFabric;
    @property({
        type:GameUiMediator
    })
    private gameUiMediator:GameUiMediator;
    @property({
        type:PlatformFabric
    })
    private platformFabric:PlatformFabric

    @property({
        type:PlayerProfile
    })
    private playerProfile: PlayerProfile;

    public override Init(pContext: ProjectContext) {
        this.projectContext = pContext;

        this.InstallBindings();

        this.gameStateMachine.Init(this);
    }

    private InstallBindings() {
        this.Bind(this.projectContext.GetDependency(SoundManager));
        this.Bind(this.projectContext.GetDependency(SaveLoad));
        this.Bind(this.gameStateMachine);
        this.Bind(this.characterFabric);
        this.Bind(this.gameUiMediator);
        this.gameUiMediator.Init();
        this.Bind(this.platformFabric);
        this.platformFabric.Init();
        this.Bind(this.playerProfile);
        this.playerProfile.Init(this);

    }
}

export default GameSceneContext;