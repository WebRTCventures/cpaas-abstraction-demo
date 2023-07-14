import { CallServiceClient } from "~/api/CallServiceClient/callServiceClient";
import { AwsChimeSessionInfo, PublisherState } from "~/types";

export default class AwsChimeSdkCallClient implements CallServiceClient {
  initSession(_info: AwsChimeSessionInfo): Promise<void> {
    return Promise.resolve();
  }

  publisherState: PublisherState = PublisherState.INITIAL;
}
