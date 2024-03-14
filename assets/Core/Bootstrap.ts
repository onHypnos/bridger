import { _decorator, Component, Node , CCFloat,director} from 'cc';
import ProjectContext from "db://assets/Core/Context/ProjectContext";
const { ccclass, property } = _decorator;

@ccclass('Bootstrap')
export class Bootstrap extends Component {

    @property({
        type:ProjectContext
    })
    private projectContext:ProjectContext;

    start() {
        this.projectContext.Init();
    }
}


