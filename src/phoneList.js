import app from './mod';

function setStickyOffsets(container, side, cells) {
  var edge = container.getBoundingClientRect()[side];

  cells.forEach((cell) => {
    // TODO: determine how scrolling affects offset.
    // Attempting to fix using scrollTop and scrollLeft,
    // but I'm not sure if this works yet
    // var scrollOffset =
    //   (side === 'top' ? window.scrollTop : window.scrollLeft) || 0;
    var cellOffset =
      cell.getBoundingClientRect()[side] + edge - cell.style[side] + 'px';

    switch (side) {
      case 'top':
        cell.style.top = cellOffset;
        break;
      case 'left':
        cell.style.left = cellOffset;
        break;
      default:
        throw Error('Invalid side: ' + side);
    }
  });
}

app.component('phoneList', {
  template: `
  <button ng-click="pop()">Pop</button> <button ng-click="push()">Push</button><br><br>
   <table element-ready="table" class="sticky-table">
    <thead>
      <tr class="sticky-row">
      <th rowspan="2" class="sticky-col">Count</th>
      <th rowspan="2" class="sticky-col">Id</th>
        <th colspan="2">Product</th>
        <th rowspan="2">Color</th>
        <th rowspan="2">URL</th>
      </tr>
      <tr class="sticky-row">
        <th>Name</th>
        <th>Description</th>

      </tr>
    </thead>
    <tbody>
      <tr>  
        <td rowspan="{{phones.length+1}}" class="sticky-col">{{phones.length}}</td>
      </tr>
      <tr element-ready="data" ng-repeat="phone in phones">
        <td class="sticky-col">{{ phone.id }}</td>
        <td>{{ phone.name }}</td>
        <td>{{ phone.snippet }}</td>
        <td>Vel.</td>
        <td>At.</td>
      </tr>
    </tbody>
  </table>
  <button ng-click="pop()">Pop</button> <button ng-click="push()">Push</button><br><br>

  `,
  controller: function PhoneListController($scope, $timeout) {
    // document.addEventListener('DOMContentLoaded', function (event) {

    function update() {
      $timeout(() => {
        var container = document.querySelector('.sticky-table thead');
        var headerCells = document.querySelectorAll('.sticky-table thead th');
        var columnCells = document.querySelectorAll(
          '.sticky-table .sticky-col'
        );
        setStickyOffsets(container, 'top', headerCells);
        setStickyOffsets(container, 'left', columnCells);
      }, 5000);
    }

    $scope.$on('table:ready', () => {
      update();
    });

    $scope.pop = () => {
      $scope.phones.pop();
      update();
    };

    $scope.push = () => {
      $scope.phones.push({
        id: '2',
        name: 'iPhone',
        snippet: 'Apple tech.'
      });
      update();
    };

    $scope.phones = [
      {
        id: '1',
        name: 'Nexus S',
        snippet: 'Fast just got faster with Nexus S.'
      },
      {
        id: '1',
        name: 'Motorola XOOM™ with Wi-Fi',
        snippet: 'The Next, Next Generation tablet.'
      },
      {
        id: '1',
        name: 'MOTOROLA XOOM™',
        snippet: 'The Next, Next Generation tablet.'
      },
      {
        id: '1',
        name: 'Nexus S',
        snippet: 'Fast just got faster with Nexus S.'
      },
      {
        id: '1',
        name: 'Motorola XOOM™ with Wi-Fi',
        snippet: 'The Next, Next Generation tablet.'
      },
      {
        id: '1',
        name: 'MOTOROLA XOOM™',
        snippet: 'The Next, Next Generation tablet.'
      },
      {
        id: '1',
        name: 'Nexus S',
        snippet: 'Fast just got faster with Nexus S.'
      },
      {
        id: '1',
        name: 'Motorola XOOM™ with Wi-Fi',
        snippet: 'The Next, Next Generation tablet.'
      },
      {
        id: '1',
        name: 'MOTOROLA XOOM™',
        snippet: 'The Next, Next Generation tablet.'
      }
    ];
  }
});
