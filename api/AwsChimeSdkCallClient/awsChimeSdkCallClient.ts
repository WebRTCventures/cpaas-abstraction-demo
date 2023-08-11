import { CallServiceClient } from "~/api/CallServiceClient/callServiceClient";
import { AwsChimeSessionInfo, PublisherState } from "~/types";

export default class AwsChimeSdkCallClient implements CallServiceClient {
  registerStreamCreatedCallback(callback: (stream: any) => void): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  connectSession(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  initPublisher(targetElement: HTMLElement): Promise<void> {
    throw new Error("Method not implemented.");
  }

  subscribe(stream: any, targetElement: HTMLElement): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  initSession(_info: AwsChimeSessionInfo): Promise<void> {
    return Promise.resolve();
  }

  publisherState: PublisherState = PublisherState.INITIAL;
}
