import axios from 'axios';

const createUser = async (req, res) => {
  const { userId, userName } = req.body;
  axios
    .post(
      'https://api.chatengine.io/users/',
      {
        username: userName,
        secret: userId,
      },
      {
        headers: {
          'PRIVATE-KEY': process.env.chat_engine_private_key,
        },
      },
    )
    .then(apiRes => {
      res.json({
        body: apiRes.body,
        error: null,
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        body: null,
        error: 'error creating user',
      });
    });
};

export default createUser;
