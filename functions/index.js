const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp(functions.config().firebase);

// exports.messageCreated = functions.firestore
//   .document("conversations/{conversationId}")
//   .onWrite((doc, context) => {
//     const conversation = doc.data();
//     const conversationId = context.params.conversationId;
//     const userId = context.params.userId;

//     const notification = {
//       content: "new message",
//       converId: conversationId,
//       lastMessage: conversation.lastMessage,
//     };
//     return admin
//       .firestore()
//       .collection("users")
//       .doc(userId)
//       .collection("notifications")
//       .add(notification)
//       .then((doc) => console.log("noti added", doc));
//   });
exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin`,
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.createCustomerUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .createUser({
      email: data.email,
      emailVerified: false,
      phoneNumber: data.phoneNumber,
      displayName: data.displayName,
      photoURL: data.photoURL,
      password: data.password,
      disabled: false,
    })
    .then((userRecord) => {
      console.log("Successfully created new user:", userRecord.uid);
      return {
        message: `tao tai khoan thanh cong`,
        uuid: userRecord.uid,
      };
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
      return {
        message: `tao tai khoan that bai: ${error}`,
      };
    });
});

exports.appointmentCreated = functions.firestore
  .document("users/{userId}/appointments/{appointmentId}")
  .onCreate((doc, context) => {
    const appointment = doc.data();
    const userId = context.params.userId;
    const notification = {
      content: "new appointment",
      date: `${appointment.date}`,
      createAt: admin.firestore.FieldValue.serverTimestamp(),
      seen: false,
      buyerId: `${appointment.buyerId}`,
      realId: `${appointment.realId}`,
      address: `${appointment.address}`,
      buyer: `${appointment.buyer}`,
      seller: `${appointment.seller}`,
      title: `${appointment.title}`,
      price: `${appointment.dealprice}`,
      staffId: `${appointment.staffId}`,
    };
    return admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("notifications")
      .add(notification)
      .then((doc) => console.log("noti added", doc));
  });
