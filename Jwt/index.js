import jwtService from "@markab.io/node/jwt-service/jwt-service.js"

const Jwt = ({ config, userModel, chatLogModel }) => {
  const onVerify = decodedId => {
    return new Promise((resolve, reject) => {
      userModel.findOne({ _id: decodedId }, (err, user) => {
        if (err) {
          reject(err);
          return console.error(err);
        }
        resolve(user);
        return user;
      });
    });
  };
  const jwtApi = jwtService({ secret: config.get("secret"), onVerify });
  return jwtApi;
};

export default Jwt;
