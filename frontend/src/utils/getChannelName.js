import { useState } from "react";
import db from "../firebase";

export const getChannelName = (channelId) => {
  db.collection("channels").doc(channelId).onSnapshot((snap) => snap.data().channelName)
};