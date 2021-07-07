const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
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
    };
    return admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("notifications")
      .add(notification)
      .then((doc) => console.log("noti added", doc));
  });
