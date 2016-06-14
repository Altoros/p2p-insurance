/**
 * @class PoolListController
 * @classdesc
 * @ngInject
 */
function PoolListController($scope, $interval, PeerService, UserService) {
  var ctl = this;

  $scope.$on('$viewContentLoaded', getPools);

  $interval(getPools, 1000);

  function getPools() {
    var currentUserId = UserService.getUser().id;

    var pools = PeerService.getPools();
    ctl.myPools = pools.filter(function (pool) {
      return pool.members.indexOf(currentUserId) !== -1;
    });
    ctl.otherPools = pools.filter(function (pool) {
      return pool.members.indexOf(currentUserId) === -1;
    });

  }
}

angular.module('app')
  .controller('PoolListController', PoolListController);
