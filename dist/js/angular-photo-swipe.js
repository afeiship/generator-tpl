(function () {
  'use strict';

  angular.module('nx.widget', []);

})();

(function () {
  'use strict';

  angular.module('nx.widget')
    .directive('nxPhotoSwipe', ['$scope', function ($scope) {
      return {
        restrict: 'E',
        scope: {
          cssClass: '@',
          value: '='
        },
        controller: ['$scope', function ($scope) {
          $scope.plus = plus;
          $scope.minus = minus;
          $scope.value = $scope.value || 0;

          function plus() {
            $scope.value++;
          }

          function minus() {
            $scope.value--;
          }
        }],
        template: '<div class="nx-widget-photo-swipe {{cssClass}}">' +
        '<button class="btn plus" ng-click="plus()">+</button>' +
        '<input class="value" ng-model="value" type="tel">' +
        '<button class="btn minus" ng-click="minus()">-</button>' +
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
        interval: 2000,
        cssClass: '',
        msg: _trustAsHtml('You toast <b>msg</b>!'),
        visible: false
      };
      initial();

      return {
        init: initial,
        show: Toast,
        destroy: destroy
      };

      function initial() {
        scope = extend($rootScope.$new(true), defaults);

        element = scope.element = $compile('<toast></toast>')(scope);
        jqLite(document.body).append(element);
      }

      function Toast(inOptions) {

        //init default options:
        var options = extend(scope, inOptions || {});
        scope.show = function () {
          scope.msg = _trustAsHtml(options.msg);
          scope.visible = true;
          scope.close();
        };

        scope.close = function () {
          $timeout(function () {
            scope.visible = false;
          }, options.interval);
        };


        scope.show();
      }

      function destroy() {
        scope.$destroy();
        element.remove();
      }

      /**@private**/
      function _trustAsHtml(inHtml) {
        return $sce.trustAsHtml(inHtml);
      }

    }]);
})();
