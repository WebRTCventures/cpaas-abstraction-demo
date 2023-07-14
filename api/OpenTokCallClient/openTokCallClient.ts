import { CallServiceClient } from "~/api/CallServiceClient/callServiceClient";
import { OpenTokSessionInfo, PublisherState } from "~/types";

export default class OpenTokCallClient implements CallServiceClient {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initSession({apiKey, sessionId}: OpenTokSessionInfo): Promise<void> {
    return Promise.resolve()
  }

  publisherState: PublisherState = PublisherState.INITIAL
}