import { _decorator, director,Component} from 'cc';
import {SceneManager} from './Services/SceneManager'
import ProjectContext from "db://assets/Core/Context/ProjectContext";
import GameSceneContext from "db://assets/Core/Context/GameSceneContext";
const { ccclass, property } = _decorator;

@ccclass('SceneStateMachine')
export class SceneStateMachine extends Component {
    sceneManager:SceneManager;

    projectContext:ProjectContext;

    Init(pContext: ProjectContext) {
        this.sceneManager = new SceneManager;
        this.projectContext = pContext;
        this.Run();
    }

    Run():SceneStateMachine {
        this.LoadGameScene(this.projectContext)
        return this;
    }


    public LoadGameScene(pContext:ProjectContext)
    {
        this.sceneManager.LoadScene("2.Game", (()=>
        {
            director
                .getScene()
                .getComponentInChildren(GameSceneContext)
                .Init(pContext);
        }));
    }
}