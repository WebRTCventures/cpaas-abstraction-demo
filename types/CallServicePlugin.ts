import type {
  AwsChimeSessionInfo,
  OpenTokSessionInfo,
  PublisherState,
  VideoCallClient,
} from "~/types";

export interface CallServiceBase {
  initSession(info: AwsChimeSessionInfo | OpenTokSessionInfo): Promise<void>;
  publisherState: PublisherState | null;
}

export interface CallServicePlugin extends CallServiceBase {
  initialize(type: VideoCallClient): void;
}
