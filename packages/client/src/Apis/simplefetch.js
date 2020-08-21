const responseHandler = async (response) => {
  if (response.status >= 200 && response.status < 400) {
    return { ...response, data: await response.json() };
  } else {
    return Promise.reject({ ...response, response: await response.json() });
  }
};

const requestMaker = async ({ method, url, data, config }) => {
  method = method ? method : "GET";
  const headers = config
    ? config.headers
    : {
        "Content-Type": "application/json",
      };
  data = data ? JSON.stringify(data) : data;
  console.log(method, data);
  const response = await window.fetch(config.baseURL + url, {
    method,
    headers,
    body: data,
  });
  console.log(response);
  return responseHandler(response);
};

const simplefetch = {
  config: {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: "",
    timeout: 10000,
  },

  //Create Instance
  create(config) {
    const instance = Object.assign({}, this);
    instance.config = this.reconfig(config);
    delete instance.create;
    return instance;
  },

  //Reconfiguration
  reconfig(config) {
    if (!config) return this.config;
    let { headers, timeout, baseURL } = config;
    headers = { ...headers, ...this.config.headers };
    timeout = timeout || this.config.timeout;
    baseURL = baseURL || this.config.baseURL;
    return { headers, timeout, baseURL };
  },

  // Handle GET Request
  get(url, config) {
    return Promise.resolve(
      requestMaker({
        method: "GET",
        url,
        config: this.reconfig(config),
      })
    );
  },

  //Handle POST Request
  post(url, data = {}, config) {
    return Promise.resolve(
      requestMaker({
        method: "POST",
        url,
        data,
        config: this.reconfig(config),
      })
    );
  },

  //Handle PUT request
  put(url, data = {}, config) {
    console.log(data);
    return Promise.resolve(
      requestMaker({
        method: "PUT",
        url,
        data,
        config: this.reconfig(config),
      })
    );
  },

  //Handle DELETE Request
  delete(url, config) {
    return Promise.resolve(
      requestMaker({
        method: "DELETE",
        url,
        config: this.reconfig(config),
      })
    );
  },
};

module.exports = simplefetch;
