import {_decorator, director, Component, Vec3, CCFloat, input, Input, Tween, tween, Node, systemEvent, SystemEvent} from 'cc';
import ProjectContext from "db://assets/Core/Context/ProjectContext";

const {ccclass, property} = _decorator;


export enum InputEvents{
    TOUCH_START ="TOUCH_START",
    TOUCH_END = "TOUCH_END"
}


@ccclass("InputHandler")
export class InputHandler extends Component
{
    private eventHandler = new Map<string,Set<new () => void>>();


    //todo refactor for future usage
    public Init()
    {
        let onMouseDown = (e) => this.Notify(InputEvents.TOUCH_START,e);
        let onMouseUp = (e) => this.Notify(InputEvents.TOUCH_END,e);


        //this.AddEventListener(InputEvents.TOUCH_START, (e)=> console.log("mouseDown " + e));
        //this.AddEventListener(InputEvents.TOUCH_END, (e)=> console.log("mouseUP " + e));

        input.on(Input.EventType.TOUCH_START, onMouseDown, this);
        input.on(Input.EventType.TOUCH_END, onMouseUp, this);
    }

    public AddEventListener(event:InputEvents, callback)
    {
        if(!this.eventHandler.has(event))
        {
            this.eventHandler.set(event,new Set());
        }
        this.eventHandler.get(event).add(callback);
    }

    public RemoveEventListener(event:InputEvents, callback)
    {
        if(this.eventHandler.has(event))
        {
            this.eventHandler.get(event).delete(callback);
        }
    }

    public Notify(eventName:string, e)
    {
        if(this.eventHandler.has(eventName))
        {
            let events =this.eventHandler.get(eventName);
            for (const listner of events) {
                listner?.call(e);
            }
        }
    }
}