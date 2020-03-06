/**
 * Created by cahyo on 03/12/2018.
 *
 * File environment for development
 * this file can import by alias 'environment'
 */

import BaseEnvironment from './BaseEnvironment';

export default ((ENV) => {

  ENV['LOGGER'] = true;
  ENV['NODE_ENV'] = process.env.NODE_ENV;
  ENV['BASE_API'] = process.env.RESOURCE["BASE_API"];
  ENV['USER_API'] = ENV['BASE_API'] + 'users/';

  return ENV;
})(BaseEnvironment);
