(function () {
  'use strict';

  angular.module('nx.widget', []);

})();

(function () {
  'use strict';

  angular.module('nx.widget')
    .directive('photoSwipe', [ function () {
      return {
        restrict: 'E',
        scope: {
          cssClass: '@'
        },
        template: '<div class="nx-widget-photo-swipe {{cssClass}}">' +
          '<div class="pswp photo-swipe" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="pswp__bg"></div>'+
            '<div class="pswp__scroll-wrap">'+
              '<div class="pswp__container">'+
                '<div class="pswp__item"></div>'+
                '<div class="pswp__item"></div>'+
                '<div class="pswp__item"></div>'+
              '</div>'+
              '<div class="pswp__ui pswp__ui--hidden">'+
                '<div class="pswp__top-bar">'+
                  '<div class="pswp__counter"></div>'+
                  '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'+
                  '<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>'+
                  '<div class="pswp__preloader">'+
                    '<div class="pswp__preloader__icn">'+
                      '<div class="pswp__preloader__cut">'+
                        '<div class="pswp__preloader__donut"></div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'+
                  '<div class="pswp__share-tooltip"></div>'+
                '</div>'+
                '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">'+
                '</button>'+
                '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">'+
                '</button>'+
                '<div class="pswp__caption">'+
                  '<div class="pswp__caption__center"></div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'
      };

    }]);


})();

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
