import authApi from './Auth.js';
import settingsApi from './Settings.js';
import userApi from './User.js';
import kernelApi from './Kernel.js';
import notificationsApi from './Notification.js';
import aclApi from './Acl.js';
import mediaApi from './Media.js';
import localizationApi from './Localization.js';
import jwtApi from './Jwt.js';
import formsApi from './Forms.js';
const orbitalApi = ({
  config,
  userModel,
  permissionsModel,
  notificationsModel,
  formsModel,
  kernelModel,
  settingsModel,
  mediaModel
}) => {
  let authApiRoutes = authApi({
    config,
    userModel,
    permissionsModel,
    formsModel
  });
  let kernelApiRoutes = kernelApi({
    config,
    kernelModel,
    permissionsModel,
    formsModel
  });
  let settingsApiRoutes = settingsApi({
    config,
    settingsModel,
    permissionsModel,
    formsModel
  });
  let notificationsApiRoutes = notificationsApi({
    config,
    settingsModel,
    permissionsModel,
    formsModel,
    notificationsModel
  });
  let aclApiRoutes = aclApi({ config, permissionsModel, formsModel });
  let formsApiRoutes = formsApi({ config, permissionsModel, formsModel });
  let userApiRoutes = userApi({
    config,
    userModel,
    permissionsModel,
    formsModel
  });
  let localizationApiRoutes = localizationApi({
    userModel,
    permissionsModel,
    formsModel
  });
  let jwtApiRoutes = jwtApi({
    config,
    userModel,
    permissionsModel,
    formsModel
  });
  let mediaApiRoutes = mediaApi({
    config,
    userModel,
    permissionsModel,
    formsModel,
    mediaModel
  });
  return {
    authApiRoutes,
    settingsApiRoutes,
    aclApiRoutes,
    formsApiRoutes,
    userApiRoutes,
    localizationApiRoutes,
    jwtApiRoutes,
    mediaApiRoutes,
    kernelApiRoutes,
    notificationsApiRoutes
  };
};

export default orbitalApi;