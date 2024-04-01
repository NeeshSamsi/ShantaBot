import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "Guild";
    readonly columns: readonly [
      {
        readonly name: "memberCountChannel";
        readonly type: "string";
      }
    ];
  },
  {
    readonly name: "Profile";
    readonly columns: readonly [
      {
        readonly name: "guildID";
        readonly type: "string";
        readonly notNull: true;
        readonly defaultValue: "guildID";
      },
      {
        readonly name: "userID";
        readonly type: "string";
        readonly notNull: true;
        readonly defaultValue: "userID";
      },
      {
        readonly name: "birth_day";
        readonly type: "int";
      },
      {
        readonly name: "birth_month";
        readonly type: "int";
      },
      {
        readonly name: "birth_year";
        readonly type: "int";
      }
    ];
  },
  {
    readonly name: "LatestYouTubeVideo";
    readonly columns: readonly [
      {
        readonly name: "channelID";
        readonly type: "string";
        readonly unique: true;
      },
      {
        readonly name: "videoID";
        readonly type: "string";
        readonly unique: true;
      }
    ];
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type Guild = InferredTypes["Guild"];
export type GuildRecord = Guild & XataRecord;
export type Profile = InferredTypes["Profile"];
export type ProfileRecord = Profile & XataRecord;
export type LatestYouTubeVideo = InferredTypes["LatestYouTubeVideo"];
export type LatestYouTubeVideoRecord = LatestYouTubeVideo & XataRecord;
export type DatabaseSchema = {
  Guild: GuildRecord;
  Profile: ProfileRecord;
  LatestYouTubeVideo: LatestYouTubeVideoRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
