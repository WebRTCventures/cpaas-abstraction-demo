import { AwsChimeSessionInfo, OpenTokSessionInfo, TwilioSessionInfo } from "~/types";
import { CallServiceBase } from "~/types/CallServicePlugin";

export interface CallServiceClient extends CallServiceBase {
  credentials: AwsChimeSessionInfo | OpenTokSessionInfo | TwilioSessionInfo
}