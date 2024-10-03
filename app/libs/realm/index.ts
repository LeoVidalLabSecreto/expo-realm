import { createRealmContext } from "@realm/react";
import { InputRealm } from "./schemas/input";

// const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
//   type: Realm.OpenRealmBehaviorType.OpenImmediately,
// };

// export const syncConfig: any = {
//   user: "App.name",
//   flexible: true,
//   newRealmFileBehavior: realmAccessBehavior,
//   existingRealmFileBehavior: realmAccessBehavior,
// };
export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [InputRealm],
  });
