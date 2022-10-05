import {
  MessageEvent,
  UnsendEvent,
  FollowEvent,
  UnfollowEvent,
  JoinEvent,
  LeaveEvent,
  MemberJoinEvent,
  MemberLeaveEvent,
  PostbackEvent,
  VideoPlayCompleteEvent,
  BeaconEvent,
  AccountLinkEvent,
  DeviceLinkEvent,
  DeviceUnlinkEvent,
  LINEThingsScenarioExecutionEvent,
} from '@line/bot-sdk';

export interface MessagingClientEvents {
  message: [MessageEvent];
  unsend: [UnsendEvent];
  follow: [FollowEvent];
  unfollow: [UnfollowEvent];
  join: [JoinEvent];
  leave: [LeaveEvent];
  memberJoined: [MemberJoinEvent];
  memberLeft: [MemberLeaveEvent];
  postback: [PostbackEvent];
  videoPlayComplete: [VideoPlayCompleteEvent];
  beacon: [BeaconEvent];
  accountLink: [AccountLinkEvent];
  things: [
    DeviceLinkEvent | DeviceUnlinkEvent | LINEThingsScenarioExecutionEvent
  ];
}
