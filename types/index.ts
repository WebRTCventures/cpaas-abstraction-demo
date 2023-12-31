import { Attendee, MeetingSession } from "amazon-chime-sdk-js"

export enum VideoCallClient {
  OPENTOK = 'opentok',
  AWS_CHIME_SDK = 'chimesdk',
  TWILIO = 'twilio'
}

export interface OpenTokSessionInfo {
  apiKey: string
  sessionId: string
  token: string
}

export interface AwsChimeSessionInfo {
  meetingResponse: MeetingSession
  attendeeResponse: Attendee
}

export interface TwilioSessionInfo {
  token: string
}
