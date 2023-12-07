import {
  RemoteVideoTrack,
  Room,
  connect,
  createLocalVideoTrack,
} from 'twilio-video'
import { CallServiceClient } from '../CallServiceClient/callServiceClient'
import { TwilioSessionInfo } from '~/types'

export default class TwilioCallClient implements CallServiceClient {
  credentials: TwilioSessionInfo
  private session: Room | undefined
  private publisherDivElement: HTMLDivElement | undefined
  private subscribersDivElement: HTMLDivElement | undefined

  constructor(credentials: TwilioSessionInfo) {
    this.credentials = credentials
  }

  async initSession(): Promise<void> {
    console.log('Nothing to do here!')
    return Promise.resolve()
  }

  initPublisher(targetElement: HTMLDivElement): Promise<void> {
    this.publisherDivElement = targetElement
    return Promise.resolve()
  }

  async connectSession(): Promise<void> {
    const localTrack = await createLocalVideoTrack()

    this.publisherDivElement?.appendChild(localTrack.attach())

    this.session = await connect(this.credentials.token, {
      tracks: [localTrack],
    })

    this.session.participants.forEach(participant => {
        participant.tracks.forEach(publication => {
          if (publication.track) {
            this.subscribersDivElement?.appendChild((publication.track as RemoteVideoTrack).attach());
          }
        });
      
       participant.on('trackSubscribed', track => {
          this.subscribersDivElement?.appendChild((track as RemoteVideoTrack).attach());
        });
      });
      

    this.session.on('participantConnected', (participant) => {
      participant.tracks.forEach((publication) => {
        if (publication.isSubscribed) {
          const track = publication.track
          this.subscribersDivElement?.appendChild(
            (track as RemoteVideoTrack).attach()
          )
        }
      })

      participant.on('trackSubscribed', (track) => {
        this.subscribersDivElement?.appendChild(
          (track as RemoteVideoTrack).attach()
        )
      })
    })
  }

  registerStreamCreatedCallback(callback: (stream: any) => void): Promise<void> {
    callback(null)
    return Promise.resolve()
  }

  subscribe(stream: any, targetElement: HTMLDivElement): Promise<void> {
    this.subscribersDivElement = targetElement
    return Promise.resolve()
  }
}
