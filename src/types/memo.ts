import { type Timestamp } from "firebase/firestore";

export type Memo = {
  id: string;
  bodyText: string;
  updatedAt: Timestamp;
};
