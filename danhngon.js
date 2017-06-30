Danhngon = {

    /**
     * Request type : GET
     */
    getRequest: 'GET',

    /**
     * Empty String
     */
    EMPTY_STRING: '',

    /**
     * API url
     */
    baseURL: 'http://danhngon-api-danhngon-api.1d35.starter-us-east-1.openshiftapps.com/api/danhngon',

    /**
     * Request a random danhngon
     */
    getRandomDanhngon: function() {
        var result;
        var that = this;
        var languageParamExisted = arguments.length > 2;

        var language = languageParamExisted ? arguments[0] : this.EMPTY_STRING;
        var callback = languageParamExisted ? arguments[1] : arguments[0];
        var callbackErr = languageParamExisted ? arguments[2] : arguments[1];

        var requestURL = this.baseURL + '/random/' + language;

        this.xdr(requestURL, this.getRequest, '', callback, callbackErr);
    },

    /**
     * Request a random danhngon
     */
    getDanhngon: function() {
        var that = this;
        var languageParamExisted = arguments.length > 3;

        var id = arguments[0]
        var language = typeof arguments[1] != 'function' ? arguments[1] : this.EMPTY_STRING;
        var callback = languageParamExisted ? arguments[2] : arguments[1];
        var callbackErr = languageParamExisted ? arguments[3] : arguments[2];

        if (arguments.length < 3) {
            callbackErr(new Error('Id was not set', callbackErr));
            return;
        }

        var requestURL = this.baseURL + '/' + id + '/' + language;

        this.xdr(requestURL, this.getRequest, '', callback, callbackErr);
    },

    /**
     * Make a X-Domain request to url and callback.
     *
     * @param url {String}
     * @param method {String} HTTP verb ('GET', 'POST', 'DELETE', etc.)
     * @param data {String} request body
     * @param callback {Function} to callback on completion
     * @param errback {Function} to callback on error
     */
    xdr: function (url, method, data, callback, errback) {
        var req;
        
        if(XMLHttpRequest) {
            req = new XMLHttpRequest();

            if('withCredentials' in req) {
                req.open(method, url, true);
                req.onreadystatechange = function() {
                    if (req.readyState === 4) {
                        if (req.status >= 200 && req.status < 400) {
                            callback(JSON.parse(req.responseText));
                        } else {
                            errback(new Error('Response returned with non-OK status'));
                        }
                    }
                };
                req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                req.send(data);
            }
        } else if(XDomainRequest) {
            req = new XDomainRequest();
            req.open(method, url);
            req.onload = function() {
                callback(JSON.parse(req.responseText));
            };
            req.send(data);
        } else {
            errback(new Error('CORS not supported'));
        }
    }
};