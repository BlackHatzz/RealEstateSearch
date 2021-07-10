const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp(functions.config().firebase);

exports.messageCreated = functions.firestore
  .document("conversations/{conversationId}/messages/{messageId}")
  .onCreate((doc, context) => {
    const message = doc.data();
    const conversationId = context.params.conversationId;
    const type = message.type;
    if (type === "text") {
      const notification = {
        content: `${message.message}`,
        chatId: conversationId,
      };
      return admin.firestore().collection("users").doc();
    }
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
    };
    return admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("notifications")
      .add(notification)
      .then((doc) => console.log("noti added", doc));
  });
