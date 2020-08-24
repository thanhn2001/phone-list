import app from './mod';

const elementReady = ($timeout, $rootScope) => {
  return {
    restrict: 'A',
    link(scope, element, attrs) {
      $timeout(() => {
        element.ready(() => {
          scope.$apply(() => {
            $rootScope.$broadcast(`${attrs.elementReady}:ready`);
          });
        });
      });
    }
  };
};

app.directive('elementReady', ['$timeout', '$rootScope', elementReady]);
