import { _decorator, Component,director } from 'cc';
import {SceneStateMachine} from '../SceneStateMachine';
import {Context} from './Context';
import {GameUiMediator} from "db://assets/Core/UI/GameUIMediator";
import {SaveLoad} from "db://assets/Core/Services/SaveLoad";
import {SoundManager} from "db://assets/Core/Services/SoundManager";
const { ccclass, property } = _decorator;

@ccclass('ProjectContext')
class ProjectContext extends Context {


    @property({
        type: SceneStateMachine,
    })
    private sceneStateMachine: SceneStateMachine;
    @property({
        type:SaveLoad
    })
    private saveLoad: SaveLoad;
    @property({
        type:SoundManager
    })
    private soundManager:SoundManager
    public Init() {
        director.addPersistRootNode(this.node);
        this.Bind(this.sceneStateMachine);
        this.Bind(this.saveLoad);
        this.Bind(this.soundManager);
        this.soundManager.Init();
        this.sceneStateMachine.Init(this);
    }
}

export default ProjectContext;