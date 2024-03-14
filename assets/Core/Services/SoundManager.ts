import { _decorator, AudioSource, Component,director } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('SoundManager')
export class SoundManager extends Component {

    @property({
        type:AudioSource
    })
    private winAudio:AudioSource;

    @property({
        type:AudioSource
    })
    private loseAudio:AudioSource;

    @property({
        type:AudioSource
    })
    private background:AudioSource;

    @property({
        type:AudioSource
    })
    private stickRising:AudioSource;


    public Init()
    {
        this.PlayBackgroundTheme();
    }


    public PlayBackgroundTheme()
    {
        this.background.play();
    }


    public PlayStickSound()
    {
        this.stickRising.play();
    }

    public StopStickSound()
    {
        this.stickRising.stop();
    }


    public PlayReward() {
        this.winAudio.play();
    }

    public PlayLose()
    {
        this.loseAudio.play();
    }
}