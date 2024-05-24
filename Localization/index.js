import i18nService from "@markab.io/node/i18n-service/i18n-service.js"
import express from "express"
import path from "path"

/* Zee:
  what's happening here? None of the input args are used. 
  What does it mean to localize? 
 */
const Localization = ({ config, userModel }) => {
  const apiRoutes = express.Router();
  let localesPath = path.join(
    __dirname,
    "@markab.io/node/lib/",
    "/services/i18n-service/locales"
  );
  apiRoutes.use("/locales", express.static(localesPath));
  let i18nApi = i18nService();
  return [i18nApi, apiRoutes];
};

export default Localization;
