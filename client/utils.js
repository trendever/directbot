import config from 'root/../config'


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
  facebook: (/FBAN|FBAV/i.test(_ua)),
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
  instagram: /instagram/i.test(_ua),
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


export const isStandalone = function(){
  if(config.testBrowserStandalone){
    return true
  }
  if(browser.standalone){
    if(browser.instagram||browser.facebook ){
      return false
    }
    return true
  }
  return false
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




export const formatPastTime = ( pasttime ) => {
  const second = parseInt( pasttime);
  const minute = parseInt( second / 60 );
  const hour   = parseInt( minute / 60 );
  const day    = parseInt( hour / 24 );
  const month  = parseInt( day / 30 );
  const year   = parseInt( month / 12 );

  if ( second <= 60 ) {
    return `${second} сек`;
  }

  if ( minute <= 60 ) {
    return `${minute} мин`;
  }


  if ( hour < 24 ) {

    if ( (hour === 1) || (hour === 21) ) {

      return `${hour} час`;

    }

    if ( (hour > 1 && hour <= 4) || (hour >= 22 && hour <= 23) ) {

      return `${hour} часа`;

    }

    return `${hour} часов`;

  }

  if ( day > 0 ) {

    if ( (day === 1) || (day === 21) || (day === 31) ) {

      return `${day} день`;

    }

    if ( (day >= 2 && day <= 4) || (day >= 22 && day <= 24) ) {

      return `${day} дня`;

    }

    if ( (day >= 5 && day <= 20) || (day >= 26 && day <= 30) ) {

      return `${day} дней`;

    }

  }

  if ( month > 0 ) {

    if ( month === 1 ) {

      return `${month} меc`;

    }

    if ( month >= 2 && day <= 4 ) {

      return `${month} мес`;

    }

    if(month > 12) {
      return '1 мес';
    }

    return `${month} мес`;

  }

  if ( year > 0 ) {

    if ( year === 1 ) {

      return `${year} год`;

    }

    if ( year > 1 && year <= 4 ) {

      return `${year} года`;

    }

    return `${year} лет`;

  }

};


export const  navigateTolink = (href, newTab) => {

  let a = document.createElement('a');
    a.href = href;
    if (newTab) {
      a.setAttribute('target', '_blank');
    }
  a.click();

}

import JQuery from 'jquery';

export const keyboardButtomToBottom = () =>{
  let body = document.body
  if(window.browser.ios){
    Promise.resolve().then(()=>{
      setTimeout(()=>{
        body.scrollTop = window.innerHeight || body.offsetHeight;
      },10)
    }).then(()=>{
      if(window.browser.facebook) return;
      if(window.browser.instagram) return;
      if(window.browser.chrome_mobile) return;
      setTimeout(()=>{
        JQuery(body).animate({scrollTop: body.scrollTop - window.innerHeight / 12},50);
      },350)
    })
  }

}

window.prettyLog = (obj)=>{
  console.log(JSON.parse(JSON.stringify(obj)))
}

window.colorLog = (string, color = 'darkgreen')=>{
  console.log(`%c${string}`, `color: ${color}; font-size: 30px`)
}
window.Green30 = `color: darkgreen; font-size: 30px`;

export class ScrollStorage {

  constructor(page='user'){

    this.debug = false;
    this.pageStore = new Map();

    this.page = page;
    let local = new Map(JSON.parse(localStorage.getItem(`${this.page}.scrl.storage`)))
    if(!local){
      this.setValue('default', 0);
    }

    if (local) {
      for(let [key, value] of local.entries()){
        if(this.debug) {
          colorLog(key, 'red')
          console.log(value)
        }
        this.setValue(key, local.get(key))
      }
    }
  }

  setValue(userID,value){
    this.pageStore.set(userID,value)
    localStorage.setItem(`${this.page}.scrl.storage`, JSON.stringify(this.pageStore));
    if(this.debug) {
      colorLog('scroll pushed', 'green');
      console.log(JSON.stringify(this.pageStore));
    }
  }

  scrollTo(userID){
    window.scrollY = this.pageStore.get(userID);
    document.body.scrollTop = this.pageStore.get(userID);
  }

}


export const declOfNum = (titles) => {
  var cases = [2, 0, 1, 1, 1, 2];
  return function(number){
      return  titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }
}


export const lazyload = ($, window, document, undefined) => {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

};


