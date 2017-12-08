;(function (window, document, undefined) {
  var HttpRequest = function (json) {
    if (this instanceof HttpRequest) {
      this.author = 'Jehorn'
      this.version = '0.0.1'

      this.url = json.url
      this.type = json.type.toUpperCase() || 'GET'
      this.async = json.async || 'true'
    } else {
      return new HttpRequest(json)
    }
  }

  // Create XMLHttpRequest.
  var createXMLHttpRequest = function () {
    var xmlHttp
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlHttp = new XMLHttpRequest()
      if (xmlHttp.overrideMimeType) {
        // mozillar bug
        xmlHttp.overrideMimeType('text/xml')
      }
    } else if (window.ActiveXObject) {
      // code for IE6, IE5
      try {
        xmlHttp = new ActiveXObject('Msxml2.XMLHTTP')
      } catch (e) {
        try {
          xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
        } catch (e) {
          // Create IE6, IE5 http request error.
        }
      }
    }

    return xmlHttp
  }

  // Send the GET/POST request.
  var sendRequest = function (_this) {
    var xmlHttp = createXMLHttpRequest()
    var type = _this.type
    var url = _this.url
    var async = _this.async

    xmlHttp.open(type, url, async)
    xmlHttp.onreadystatechange = callback
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;')

    xmlHttp.send()
    if (type === 'POST') {
      xmlHttp.send(xml)
    }
  }

  HttpRequest.prototype.init = function () {

  }

  window.httpRequest = HttpRequest

}) (window, document, undefined)
