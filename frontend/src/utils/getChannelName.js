import db from "../firebase";

const getChannelName = (channelId) => {
  db.collection("channels").doc(channelId).onSnapshot((snap) => snap.data().channelName)
};

export default getChannelName;