import {director} from "cc"


export class SceneManager {

    LoadScene(sceneName:string, callback:any)
    {
        director.loadScene(sceneName,callback);
    }

}