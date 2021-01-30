const fs = require('fs');

const runtimeConfig = {
  apiDelayInMS: 0,
  enableApiRequestLogs: false,
};

class RuntimeConfig {
  load = (callback) => {
    fs.access('./runtime.json', fs.F_OK, (err) => {
      if (err)
        this.handleWriteJSONConfig((err) => {
          if (err) callback(err);
          this.handleLoadJSONConfig(callback);
        });
      else this.handleLoadJSONConfig(callback);
    });
  };

  handleWriteJSONConfig = (callback) => {
    const data = JSON.stringify(runtimeConfig);
    fs.writeFile('./runtime.json', data, (err) => {
      if (err) callback(err);
      callback();
    });
  };

  handleLoadJSONConfig = (callback) => {
    fs.readFile('./runtime.json', (err, data) => {
      if (err) callback(err);
      const parsedData = JSON.parse(data);
      runtimeConfig.apiDelayInMS = parsedData.apiDelayInMS;
      runtimeConfig.enableApiRequestLogs = parsedData.enableApiRequestLogs;
      callback();
    });
  };

  setConfig = (newRuntimeConfig, callback) => {
    const { apiDelayInMS, enableApiRequestLogs } = newRuntimeConfig;
    runtimeConfig.apiDelayInMS = apiDelayInMS;
    runtimeConfig.enableApiRequestLogs = enableApiRequestLogs;
    this.handleWriteJSONConfig(callback);
  };

  getConfig = () => ({
    apiDelayInMS: runtimeConfig.apiDelayInMS,
    enableApiRequestLogs: runtimeConfig.enableApiRequestLogs,
  });
}

module.exports = new RuntimeConfig();
