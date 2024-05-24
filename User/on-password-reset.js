const onPasswordReset = ({ email, userModel }, req, res) => {
  userModel.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(409).send("User doesn't exist");
    }
    user.resetPasswordToken = "reset";
    user.save(err => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send("User password has been reset");
    });
  });
};

export default onPasswordReset;
