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
