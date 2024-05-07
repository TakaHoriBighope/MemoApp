import { type Timestamp } from "firebase/firestore";

export type Info = {
  id: string;
  desc: string;
  imgURL: string;
  likes: [];
  uid: string;
  createdAt: Timestamp;
};
