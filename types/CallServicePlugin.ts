import type {
  AwsChimeSessionInfo,
  OpenTokSessionInfo,
  PublisherState,
  VideoCallClient,
} from '~/types'

export interface CallServiceBase {
  initSession(info: AwsChimeSessionInfo | OpenTokSessionInfo): Promise<void>
  connectSession(token: string): Promise<void>
  initPublisher(targetElement: HTMLElement): Promise<void>
  registerStreamCreatedCallback(callback: (stream: any) => void): void
  subscribe(stream: any, targetElement: HTMLElement): Promise<void>
  publisherState: PublisherState | null
}

export interface CallServicePlugin extends CallServiceBase {
  initialize(type: VideoCallClient): void
}
