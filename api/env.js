// Checks the environment for necessary data, sets defaults as necessary

const dotenv = require('dotenv');

const defaults = {
  // Default to locking accounts for 30 minutes if there are five
  // failed logon attempts within a 1-minute period.
  FILE_PATH: '__files',
  FILE_STORE: 'local',
  LOG_LEVEL: 'info',
  LOG_FILE: 'false',
  LOG_CONSOLE: 'true',
  NODE_ENV: 'development',
  PORT: 8000,
  PROXY_TRUST: 'false',
  STORE_PATH: '',
  STORE_TYPE: 'null' // default to using the /dev/null store
};

// Check if there are any CloudFoundry user-provided services
// offering up environment variables.  If there are, extract
// them and merge them into our environment.
const upsEnv = {};
if (process.env.VCAP_SERVICES) {
  try {
    const vcap = JSON.parse(process.env.VCAP_SERVICES);
    if (Array.isArray(vcap['user-provided'])) {
      vcap['user-provided'].forEach(ups => {
        Object.entries(ups.credentials).forEach(([name, value]) => {
          upsEnv[name] = value;
        });
      });
    }
  } catch (e) {} // eslint-disable-line no-empty
}

dotenv.config();
process.env = { ...defaults, ...upsEnv, ...process.env };

// Don't require this until process.env is finished setting up, since that
// defines how the logger works.
