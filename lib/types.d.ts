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
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type Guild = InferredTypes["Guild"];
export type GuildRecord = Guild & XataRecord;
export type DatabaseSchema = {
  Guild: GuildRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
