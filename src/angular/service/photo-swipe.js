(function () {
  'use strict';

  /**
   * @Template service code:
   */

  var extend = angular.extend;
  var jqLite = angular.element;

  angular.module('nx.widget').factory('nxPhotoSwipe', [
    '$rootScope',
    '$timeout',
    '$compile',
    '$sce',
    function ($rootScope, $timeout, $compile, $sce) {
      var scope, element;
      var defaults = {
        cssClass: '',
        history:false,
        index:0,
        rate:{
          width:1,
          heigh:1
        },
        preload:true
      };

      initial();

      return {
        init: initial,
        show:show
      };

      function initial() {
        scope = extend($rootScope.$new(true), defaults);

        element = scope.element = $compile('<photo-swipe></photo-swipe>')(scope);
        jqLite(document.body).append(element);
      }

      function show(inOptions) {
        //init default options:
        var options = extend(scope, inOptions || {});
        var index = options.index || 0;
        var pswpElement = document.querySelectorAll('.photo-swipe')[0];
        var items = [];
        
        options.images.forEach(function (img) {
          items.push({
            src:img,
            w: 0,
            h: 0
          });
        });

        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
          index: options.index,
          history: options.history,
          preload:options.preload
        });


        gallery.listen('gettingData', function(index, item) {
          if (item.w < 1 || item.h < 1) { // unknown size
            var img = new Image();
            img.onload = function() { // will get size after load
              item.w = this.width * options.rate.width; // set image width
              item.h = this.height * options.rate.height; // set image height

              gallery.invalidateCurrItems(); // reinit Items
              gallery.updateSize(true); // reinit Items
            };
            img.src = item.src; // let's download image
          }
        });

        gallery.init();
      }

    }]);
})();
