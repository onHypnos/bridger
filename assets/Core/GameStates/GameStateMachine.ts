import {_decorator,Component, Vec3, CCFloat, input, Input} from 'cc';
import {CharacterMediator} from "db://assets/Core/Character/CharacterMediator";
import {GameUiMediator} from "db://assets/Core/UI/GameUIMediator";
import {CharacterFabric} from "db://assets/Core/Character/CharacterFabric";
import {Platform} from "db://assets/Core/Character/Platform";
import { PlatformFabric } from '../Character/PlatformFabric';
import GameSceneContext from "db://assets/Core/Context/GameSceneContext";
import {GetRandomNumberInRange} from "db://assets/Core/Utils/Utils";
import {PlayerProfile} from "db://assets/Core/Services/PlayerProfile";
import {SoundManager} from "db://assets/Core/Services/SoundManager";

const {ccclass, property} = _decorator;

@ccclass('GameStateMachine')
export class GameStateMachine extends Component {
    @property({
        type:Vec3
    })
    private startPlatformDestination:Vec3;
    @property({
        type:Vec3
    })
    private previousPlatformDestination:Vec3;
    @property({
        type:Vec3
    })
    private currentPlatformDestination:Vec3;
    @property({
        type:Vec3
    })
    private nextPlatformDestination:Vec3;
    @property({
        type:Vec3
    })
    private nextPlatformSpawn:Vec3;

    @property({
        type:CCFloat
    })
    private riddleMinValue:number;
    @property({
        type:CCFloat
    })
    private riddleMaxValue:number;
    private riddleDistance:number;


    private gameUIMediator: GameUiMediator;
    private playerProfile: PlayerProfile;
    private platformFabric:PlatformFabric;
    private characterFabric:CharacterFabric;
    private soundManager: SoundManager;

    private character: CharacterMediator
    private previousPlatform: Platform;
    private currentPlatform: Platform;

    private nextPlatform: Platform;
    private currentStickValue: number;
    private stickIncreasingSpeed: number = 200;
    private increaseStick: boolean;


    public Init(ctx:GameSceneContext) {
        this.gameUIMediator = ctx.GetDependency(GameUiMediator);
        this.platformFabric = ctx.GetDependency(PlatformFabric);
        this.characterFabric = ctx.GetDependency(CharacterFabric);
        this.playerProfile = ctx.GetDependency(PlayerProfile);
        this.soundManager = ctx.GetDependency(SoundManager);
        this.character = this.characterFabric.SpawnCharacter();
        this.character.Init();

        this.gameUIMediator.BindStartGameButton(() => this.StartGame());
        this.gameUIMediator.BindRestartButton(() => this.RestartGame());
        this.gameUIMediator.BindHomeButton(() => this.EnterMenuState());

        this.EnterMenuState();
    }


    //todo:refactor to different files for each state
    private EnterMenuState() {
        this.Reset();

        this.playerProfile.ResetPoints();
        this.currentPlatform = this.platformFabric.GetPlatform();
        this.currentPlatform.HideReward();
        this.currentPlatform.SetSize(100);

        this.currentPlatform.WarpToPosition(this.startPlatformDestination);
        this.character.WarpToPosition(this.startPlatformDestination);
        this.gameUIMediator.ShowMenu();
    }

    private StartGame()
    {
        this.SetupRiddle();
    }

    private RestartGame()
    {
        this.Reset();

        this.playerProfile.ResetPoints();
        this.currentPlatform = this.platformFabric.GetPlatform();
        this.currentPlatform.HideReward();
        this.currentPlatform.SetSize(100);

        this.currentPlatform.WarpToPosition(this.currentPlatformDestination);
        this.character.WarpToPosition(this.GetCharacterPositionOnPlatform());
        this.gameUIMediator.HideCurtain().start();
        this.SetupRiddle()
    }

    private SetupRiddle()
    {
        this.gameUIMediator.ShowGame();
        this.SetupNextPlatform();
        this.riddleDistance = GetRandomNumberInRange(this.riddleMinValue,this.riddleMaxValue);
        this.EnterTransitionState();
    }

    private SetupNextPlatform()
    {
        this.nextPlatform = this.platformFabric.GetPlatform();
        this.nextPlatform.Reset();
        this.nextPlatform.WarpToPosition(this.nextPlatformSpawn)
        return this.nextPlatform.RandomiseSize();
    }

    private EnterTransitionState() {
        this.currentPlatform
            .MoveToPosition(this.currentPlatformDestination).start();
        this.character
            .TranslateToPosition(this.GetCharacterPositionOnPlatform()).start();
        if(this.previousPlatform != null)
        {
            this.previousPlatform
                .MoveToPosition(this.previousPlatformDestination).start();
        }
        this.nextPlatformDestination = new Vec3(this.currentPlatformDestination.x + this.riddleDistance,this.currentPlatformDestination.y,0);
        this.nextPlatform.ShowReward();
        this.nextPlatform.MoveToPosition(this.nextPlatformDestination)
            .call(() => this.EnterPlayerInputState()).start();
    }

    private GetCharacterPositionOnPlatform() {
        return new Vec3(this.currentPlatformDestination.x + (this.currentPlatform.platformSize - this.character.GetCurrentVisualWidth()) * 0.5,
            this.currentPlatformDestination.y,
            0);
    }

    private EnterPlayerInputState() {

        this.currentStickValue = 0;
        input.once( Input.EventType.TOUCH_START, this.EnableStickIncreasing, this);
    }

    private EnableStickIncreasing()
    {
        this.soundManager.PlayStickSound();
        input.once( Input.EventType.TOUCH_END, this.EnterStickValue, this);
        this.increaseStick = true;
    }

    private IncreaseStickValue(deltaTime: number) {
        this.currentStickValue += deltaTime * this.stickIncreasingSpeed;
        this.currentPlatform.SetStickValue(this.currentStickValue);
    }

    public update(deltaTime:number){
        if(this.increaseStick)
        {
            this.IncreaseStickValue(deltaTime);
        }
    }

    private EnterStickValue()
    {
        this.soundManager.StopStickSound();
        this.increaseStick = false;
        this.currentPlatform.RotateStick().call(()=> {
            this.ResolveRiddle()
        }).start();
    }

    private ResolveRiddle() {
        let startMovingPositionX:number = this.currentPlatformDestination.x + this.currentPlatform.platformSize * 0.5;
        let range:number = this.nextPlatformDestination.x - startMovingPositionX;
        let minimumRange:number = range - this.nextPlatform.platformSize * 0.5;
        let maximumRange:number = minimumRange + this.nextPlatform.platformSize;
        let minimumRewardedRange:number = range - this.nextPlatform.rewardSize * 0.5;
        let maximumRewardedRange:number = minimumRewardedRange + this.nextPlatform.rewardSize;
        let movingPosition:Vec3 = new Vec3(
            startMovingPositionX+this.currentStickValue,
            this.character.node.position.y,
            this.character.node.position.z)
        let fallingPosition = new Vec3(
            startMovingPositionX+this.currentStickValue,
            this.character.node.position.y - 800,
            this.character.node.position.z)
        let tween = this.character.MoveToPosition(movingPosition);

        if(this.currentStickValue >= minimumRange && this.currentStickValue <=maximumRange)
        {
            if(this.currentStickValue >= minimumRewardedRange && this.currentStickValue <=maximumRewardedRange)
            {
                this.playerProfile.AddPoints(3);
                this.soundManager.PlayReward();
            }
            else
            {
                this.playerProfile.AddPoints(1);
            }
            let setup =  () => this.SetupRiddle();
            let shift = () => this.ShiftPlatforms();
            tween.call(()=>{
                shift();
                setup();
            }).start();
        }
        else
        {
            tween.call(() => this.currentPlatform.RotateStickToFall().start()).then(this.GameOver(fallingPosition)).start();
        }
    }

    private ShiftPlatforms()
    {
        this.previousPlatform = this.currentPlatform;
        this.currentPlatform = this.nextPlatform;
        this.nextPlatform.HideReward();
    }

    private GameOver(fallingPosition:Vec3) {
        let playerProfile = this.playerProfile;
        let sound = this.soundManager;
        return this.character.DropCharacterDown(fallingPosition).call(()=> {
            sound.PlayLose();
            playerProfile.GameOverMaxScoreCheck();
        });
    }

    private Reset() {
        if(this.currentPlatform!=null)
        {
            this.currentPlatform.Reset();
        }
        if(this.previousPlatform!=null)
        {
            this.previousPlatform.Reset();
        }
        if(this.nextPlatform!=null)
        {
            this.nextPlatform.Reset();
        }
        this.currentPlatform = null;
        this.previousPlatform = null;
        this.nextPlatform = null;
    }
}