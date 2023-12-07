import { Plugin } from '@nuxt/types'
import { CallServiceClient } from '~/api/CallServiceClient/callServiceClient'
import AwsChimeSdkCallClient from '~/api/AwsChimeSdkCallClient/awsChimeSdkCallClient'
import OpenTokCallClient from '~/api/OpenTokCallClient/openTokCallClient'
import TwilioCallClient from '~/api/TwilioCallClient/twilioCallClient'
import {
  VideoCallClient,
  AwsChimeSessionInfo,
  OpenTokSessionInfo,
  TwilioSessionInfo,
} from '~/types'
import { CallServicePlugin } from '~/types/CallServicePlugin'

class CallServiceWrapper implements CallServicePlugin {
  private client: CallServiceClient | null = null

  initialize(
    clientType: VideoCallClient,
    credentials: OpenTokSessionInfo | AwsChimeSessionInfo | TwilioSessionInfo
  ): void {
    if (this.client) {
      return
    }

    console.debug('CallServiceWrapper#initialize', { clientType })

    switch (clientType) {
      case VideoCallClient.AWS_CHIME_SDK:
        this.client = new AwsChimeSdkCallClient(
          credentials as AwsChimeSessionInfo
        )
        break
      case VideoCallClient.OPENTOK:
        this.client = new OpenTokCallClient(credentials as OpenTokSessionInfo)
        break
      case VideoCallClient.TWILIO:
        this.client = new TwilioCallClient(credentials as TwilioSessionInfo)
      default:
        break
    }
  }

  initSession(): Promise<void> {
    console.debug('CallServiceWrapper#initSession')
    return this.client?.initSession() || Promise.resolve()
  }

  initPublisher(targetElement: HTMLElement): Promise<void> {
    if (!this.client) {
      throw new Error('ClientNotInitialized')
    }

    return this.client.initPublisher(targetElement)
  }

  connectSession(): Promise<void> {
    if (!this.client) {
      throw new Error('ClientNotInitialized')
    }

    return this.client.connectSession()
  }

  registerStreamCreatedCallback(callback: (stream: any) => void): void {
    if (!this.client) {
      throw new Error('ClientNotInitialized')
    }

    return this.client.registerStreamCreatedCallback(callback)
  }

  subscribe(stream: any, targetElement: HTMLElement): Promise<void> {
    if (!this.client) {
      throw new Error('ClientNotInitialized')
    }

    return this.client.subscribe(stream, targetElement)
  }
}

const plugin: Plugin = (_ctx, inject) =>
  inject('callService', new CallServiceWrapper())

export default plugin
