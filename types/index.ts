export enum VideoCallClient {
  OPENTOK = 'opentok',
  AWS_CHIME_SDK = 'chimesdk',
}

export enum PublisherState {
  INITIAL = 'initial',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

export interface OpenTokSessionInfo {
  apiKey: string
  sessionId: string
}

export interface AwsChimeSessionInfo {
  sessionId: string
  meetingResponse: any
  attendeeResponse: any
  localUserId: string
}
