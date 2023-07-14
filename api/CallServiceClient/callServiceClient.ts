import { PublisherState } from "~/types";
import { CallServiceBase } from "~/types/CallServicePlugin";

export interface CallServiceClient extends CallServiceBase {
  publisherState: PublisherState
}