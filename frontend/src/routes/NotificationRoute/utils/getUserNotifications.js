import { addNotification } from "../../../state/actions/appAction";
import db, { auth } from "/src/firebase";

export const getUserNotifications = (
  users,
  notificationsDispatch
) => {
  const notificationsArr = [];

  for (const user of users) {
    db.collection("users")
      .doc(user.uid)
      .collection("expensesFrom")
      .doc(auth.currentUser.uid)
      .collection(auth.currentUser.uid)
      .onSnapshot((snap) =>
        snap.docs.forEach((doc) => {
          doc.data().deletion_request &&  notificationsDispatch(addNotification(doc.data()))
        })
      );
  }

};
