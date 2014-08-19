angular.module('ngBiscuit', []);



angular.module('ngBiscuit').
  service('cookieStore', ["$document", function($document) {

    function hasItem(key) {
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test($document[0].cookie);
    }

    return {

      get: function(key) {
        var value = $document[0].cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
        return decodeURIComponent(value) || null;
      },

      /**
       * options:
       *  - end (Infinity|String|Date)
       *  - path
       *  - domain
       *  - secure
       */
      put: function(key, value, options) {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
          return false;
        }
        var expires = "",
          domain = (options && options.domain) || '',
          path = (options && options.path) || '',
          secure = (options && options.secure) || false;

        if (options && options.end) {
          switch (options.end.constructor) {
            case Number:
              expires = options.end === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + options.end;
              break;
            case String:
              expires = "; expires=" + options.end;
              break;
            case Date:
              expires = "; expires=" + options.end.toUTCString();
              break;
          }
        }
        $document[0].cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value)
          + expires
          + (domain ? "; domain=" + domain : "")
          + (path ? "; path=" + path : "")
          + (secure ? "; secure" : "");

        return true;
      },

      remove: function(key, options) {

        if (!key || !hasItem(key)) {
          return false;
        }

        var domain = (options && options.domain) || '',
          path = (options && options.path) || '';

        $document[0].cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
          + ( domain ? "; domain=" + domain : "")
          + ( path ? "; path=" + path : "");

        return true;
      }
    };
  }]
);