export const formatPhone = (phonenum, simpleOut) => {
  phonenum = phonenum.replace(/[^\+0-9]/gi, '');
  var regexObj = /^(?:\+?7?8?[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{2})([0-9]{2})$/;
  if (regexObj.test(phonenum)) {
    var parts = phonenum.match(regexObj);
    var phone = '';
    if (simpleOut) {
      if (parts[1]) {
        phone += '+7' + parts[1];
      }
      phone += parts[2] + parts[3] + parts[4];
      return phone;
    }
    if (parts[1]) {
      phone += '+7 (' + parts[1] + ') ';
    }
    phone += parts[2] + '-' + parts[3] + '-' + parts[4];
    return phone;
  } else {
    //invalid phone number
    return phonenum;
  }
};

export const urlThumbnail = (url, size = null, originalWidth = null, originalHeight = null) => {
  console.warn('Deprecated method, please use instagram_images in server response')
  /**
   *  Changed instagram photo url, for crop image.
   *  Supports sizes: 150, 306, 480, 640, 750 (width=height)
   *  if width and height not size, then will get original
   * @type {string} url
   * @type {number} size
   */
  let parser = document.createElement('a');
  parser.href = url;

  var source_path = parser.pathname.split('/');
  if (!size) {
    source_path.splice(2, 1);
  } else {
    if (originalWidth && originalHeight) {
      let minSide = Math.min(originalWidth, originalHeight);
      source_path[2] = `s${size}x${size}/e35/c0.0.${minSide}.${minSide}`;
    } else {
      source_path[2] = 's' + size + 'x' + size;
    }
  }
  return 'https:' + '//' + parser.host + source_path.join('/');
};

/**
 * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth Source area width
 * @param {Number} srcHeight Source area height
 * @param {Number} maxWidth Fittable area maximum available width
 * @param {Number} maxHeight Fittable area maximum available height
 * @return {Object} { width, heigth }
 */
export const ratioFit = function(srcWidth, srcHeight, maxWidth, maxHeight) {

  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
};


//
// Cookies

export const getCookie = function(name) {
  var nameEQ = name + '=',
    ca = document.cookie.split(';'),
    value = '',
    firstChar = '',
    parsed = {};
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      value = decodeURIComponent(c.substring(nameEQ.length, c.length));
      firstChar = value.substring(0, 1);
      if (firstChar == '{') {
        try {
          parsed = JSON.parse(value);
          if ('v' in parsed) return parsed.v;
        } catch (e) {
          return value;
        }
      }
      if (value == 'undefined') return undefined;
      return value;
    }
  }
  return null;
};
export const setCookie = function(name, value, days, path, secure) {
  var date = new Date(),
    expires = '',
    type = typeof(value),
    valueToUse = '',
    secureFlag = '';
  path = path || '/';
  if (days) {
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  if (type === 'object' && type !== 'undefined') {
    if (!('JSON' in window)) throw 'Bummer, your browser doesn`t support JSON parsing.';
    valueToUse = encodeURIComponent(JSON.stringify({ v: value }));
  } else {
    valueToUse = encodeURIComponent(value);
  }
  if (secure) {
    secureFlag = '; secure';
  }

  document.cookie = name + '=' + valueToUse + expires + '; path=' + path + secureFlag;
};

export const removeCookie = function(name) {
  setCookie(name, '', -1);
};


export const guid = function() {
  var lut = [];
  for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
  }
  return function e7() {
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
      lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
      lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
      lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
  }();
};

export const simpleGuid = function() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};

export const throttleEvent = function(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) {
      return; }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};

export var isDebug = window.__debugMode = /[a-z0-9_\-]*[\.]*[a-z0-9_\-]*\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(location.host) || location.hostname === 'localhost';

var _ua = navigator.userAgent.toLowerCase()
var standalone = navigator.standalone

export const browser = {
  version: (_ua.match(/.+(?:me|ox|on|rv|it|era|opr|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
  opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
  msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua)),
  msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
  msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
  msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
  msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
  mozilla: /firefox/i.test(_ua),
  chrome: /chrome/i.test(_ua),
  chrome_mobile: /CriOS/i.test(_ua),
  safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
  standalone: (/iphone|ipod|ipad/.test(_ua) && !standalone && !/safari/.test(_ua) || /androidapp/.test(_ua)),
  androidapp: /androidapp/.test(_ua),
  iphone: /iphone/i.test(_ua),
  ipod: /ipod/i.test(_ua),
  iphone4: /iphone.*OS 4/i.test(_ua),
  ipod4: /ipod.*OS 4/i.test(_ua),
  ipad: /ipad/i.test(_ua),
  ios: /iphone|ipod|ipad/.test(_ua),
  android: /android/i.test(_ua),
  bada: /bada/i.test(_ua),
  mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
  msie_mobile: /iemobile/i.test(_ua),
  safari_mobile: /iphone|ipod|ipad/i.test(_ua),
  opera_mobile: /opera mini|opera mobi/i.test(_ua),
  opera_mini: /opera mini/i.test(_ua),
  mac: /mac/i.test(_ua),
  search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua)
}
// legacy support
window.browser = browser;


export const log = function() {
  if (!window.__debugMode) {
    return;
  }
  var args = Array.prototype.slice.call(arguments);
  if (window.browser.msie || window.browser.mobile) {
    console.log(args.join(' '));
  } else {
    console.log.apply(console, args);
  }
};
// legacy support
window.debugLog = log;

window.Image.prototype.load = function(url, onprogress, onerror, onload) {
  var thisImg = this;
  var xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open('GET', url, true);
  xmlHTTP.responseType = 'arraybuffer';
  xmlHTTP.onload = function() {
    var blob = new Blob([this.response]);
    thisImg.src = window.URL.createObjectURL(blob);
    if (onload) {
      onload();
    }
  };
  xmlHTTP.onerror = function(e) {
    if (onerror) {
      onerror(e);
    }
  };
  xmlHTTP.onprogress = function(e) {
    parseInt(thisImg.completedPercentage = (e.loaded / e.total) * 100);
    if (onprogress) {
      onprogress(thisImg.completedPercentage);
    }
  };
  xmlHTTP.onloadstart = function() {
    thisImg.completedPercentage = 0;
  };
  xmlHTTP.send();
};

window.Image.prototype.completedPercentage = 0;


//close menu outside

export const targetClass = ( event , className , callback ) => {

  let target = event.target;

  while(target.parentNode){

    if(target.classList.contains(className)){
      return;
    }
    target = target.parentNode;
  }

  callback();

}


export const  navigateTolink = (href, newTab) => {

  let a = document.createElement('a');
    a.href = href;
    if (newTab) {
      a.setAttribute('target', '_blank');
    }
  a.click();

}
