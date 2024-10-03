import { Realm } from "@realm/react";

type GenerateProps = {
  description: string;
};

export class InputRealm extends Realm.Object<InputRealm> {
  _id!: string;
  description!: string;
  created_at!: string;
  updated_at!: string;

  static generate({ description }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      description,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
  static schema = {
    name: "InputRealm",
    primaryKey: "description",
    properties: {
      _id: "uuid",
      description: "string",
      created_at: "date",
      updated_at: "date",
    },
  };
}
