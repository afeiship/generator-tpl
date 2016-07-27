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
            w: 800,
            h: 600
          });
        });

        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
          index: options.index,
          history: options.history,
          preload:options.preload
        });

        gallery.init();
      }

    }]);
})();
