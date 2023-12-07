import { AwsChimeSessionInfo, OpenTokSessionInfo } from "~/types";
import { CallServiceBase } from "~/types/CallServicePlugin";

export interface CallServiceClient extends CallServiceBase {
  credentials: AwsChimeSessionInfo | OpenTokSessionInfo
}