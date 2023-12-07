import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  MeetingSessionConfiguration,
  MeetingSession,
  VideoTileState,
  MeetingSessionStatus
} from 'amazon-chime-sdk-js'
import { CallServiceClient } from "~/api/CallServiceClient/callServiceClient";
import { AwsChimeSessionInfo } from "~/types";

export default class AwsChimeSdkCallClient implements CallServiceClient {
  credentials : AwsChimeSessionInfo
  private session: MeetingSession | undefined
  private logger: ConsoleLogger | undefined
  private subscriber: HTMLDivElement | undefined
  private publisher: HTMLDivElement | undefined
  private publisherVideo: HTMLVideoElement | undefined
  private subscribersVideos: Array<HTMLVideoElement>

  constructor(credentials : AwsChimeSessionInfo) {
    this.credentials = credentials
    this.subscribersVideos = []
  }

  private createVideo(id: string): HTMLVideoElement {
    const vid_node = document.createElement("video")
    vid_node.id = id
    vid_node.style.height = "auto"
    vid_node.style.width = "100%"

    return vid_node
  }

  initSession(): Promise<void> {
    this.logger = new ConsoleLogger("MyLogger")
    const deviceController = new DefaultDeviceController(this.logger)

    const config = new MeetingSessionConfiguration(
      this.credentials.meetingResponse,
      this.credentials.attendeeResponse
    )

    this.session = new DefaultMeetingSession(
      config,
      this.logger,
      deviceController
    )

    return Promise.resolve();
  }

  initPublisher(targetElement: HTMLDivElement): Promise<void> {
    this.publisher = targetElement
    this.publisherVideo = this.createVideo('publisher')
    this.publisher.appendChild(this.publisherVideo)
    return Promise.resolve();
  }

  async connectSession(): Promise<void> {
    const videoInputs = await this.session!.audioVideo.listVideoInputDevices();
    await this.session?.audioVideo.startVideoInput(videoInputs[0].deviceId)
    const observer = {
      audioVideoDidStart: () => {
        this.logger?.debug("Started")
        this.session?.audioVideo.startLocalVideoTile()
      },
      videoTileDidUpdate: (tileState: VideoTileState) => {
        if (!tileState.boundAttendeeId) {
          return
        }
        if (tileState.localTile) {
          this.session?.audioVideo.bindVideoElement(
            tileState.tileId!,
            this.publisherVideo!
          )
        } else {
          let subscriberVideo = this.subscribersVideos.filter(
            sv => sv.id === tileState.tileId!.toString()
          )[0]
          if (!subscriberVideo) {
            subscriberVideo = this.createVideo(tileState.tileId!.toString())
            this.subscribersVideos.push(subscriberVideo)
            this.subscriber?.appendChild(subscriberVideo)
          }
          this.session?.audioVideo.bindVideoElement(
            tileState.tileId!,
            subscriberVideo
          )
        }
      },
      videoTileWasRemoved: (tileId: number) => {
        const videoElementRemoved = this.subscribersVideos.filter(
          sv => sv.id === tileId.toString()
        )[0]
        videoElementRemoved.remove()
      },
      audioVideoStop: async (sessionStatus: MeetingSessionStatus) => {
        await this.session?.audioVideo.stopAudioInput()
        this.session?.deviceController.destroy()
      }
    }

    this.session?.audioVideo.addObserver(observer)
    this.session?.audioVideo.start()
    this.session?.audioVideo.stopLocalVideoTile()
    return Promise.resolve();
  }

  registerStreamCreatedCallback(callback: (stream: any) => void): Promise<void> {
    callback(null)
    return Promise.resolve();
  }

  subscribe(stream: any, targetElement: HTMLDivElement): Promise<void> {
    this.subscriber = targetElement
    return Promise.resolve();
  }
}
