import type {
  AwsChimeSessionInfo,
  OpenTokSessionInfo,
  TwilioSessionInfo,
  VideoCallClient,
} from '~/types'

export interface CallServiceBase {
  initSession(): Promise<void>
  connectSession(): Promise<void>
  initPublisher(targetElement: HTMLElement): Promise<void>
  registerStreamCreatedCallback(callback: (stream: any) => void): void
  subscribe(stream: any, targetElement: HTMLElement): Promise<void>
}

export interface CallServicePlugin extends CallServiceBase {
  initialize(
    type: VideoCallClient,
    credentials: AwsChimeSessionInfo | OpenTokSessionInfo | TwilioSessionInfo
  ): void
}
