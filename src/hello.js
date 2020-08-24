import app from './mod';

app.controller('Hello', [
  '$scope',
  '$timeout',
  function ($scope, $timeout) {
    $scope.name = 'Timmy Tester!';

    $timeout(function () {
      $scope.name = 'New Name';
    }, 5000);
    $scope.$on('name:ready', () => {
      console.log('name is ready', $scope.name);
    });
  }
]);
