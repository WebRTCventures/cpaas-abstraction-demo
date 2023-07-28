import { Plugin } from "@nuxt/types";
import AwsChimeSdkCallClient from "~/api/AwsChimeSdkCallClient/awsChimeSdkCallClient";
import { CallServiceClient } from "~/api/CallServiceClient/callServiceClient";
import OpenTokCallClient from "~/api/OpenTokCallClient/openTokCallClient";
import { VideoCallClient, AwsChimeSessionInfo, OpenTokSessionInfo } from "~/types";
import { CallServicePlugin } from "~/types/CallServicePlugin";

class CallServiceWrapper implements CallServicePlugin {
  private client: CallServiceClient | null = null

  initialize(clientType: VideoCallClient): void {
    if (this.client) {
      return
    }

    console.debug('CallServiceWrapper#initialize', { clientType })

    switch (clientType) {
      case VideoCallClient.AWS_CHIME_SDK:
        this.client = new AwsChimeSdkCallClient()
        break
      case VideoCallClient.OPENTOK:
        this.client = new OpenTokCallClient()
        break
      default:
        break
    }
  }

  get publisherState() {
    if (!this.client) {
      return null
    }
    return this.client.publisherState
  }

  initSession(info: AwsChimeSessionInfo | OpenTokSessionInfo): Promise<void> {
    console.debug('CallServiceWrapper#initSession', { info })
    return this.client?.initSession(info) || Promise.resolve()
  }
}

const plugin: Plugin = (_ctx, inject) => inject('callService', new CallServiceWrapper())

export default plugin