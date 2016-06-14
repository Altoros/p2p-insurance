/**
 * @class PoolListController
 * @classdesc
 * @ngInject
 */
function PoolListController($scope, $interval, $uibModal, Notification, PeerService, UserService) {
  var ctl = this;
  ctl.openEnerPoolModal = openEnerPoolModal;
  ctl.cancel = cancel;

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

  function openEnerPoolModal(pool) {
    var modalInstance = $uibModal.open({
      templateUrl: 'enter-pool-modal.html',
      controller: 'EnterPoolModalController as enterPool',
      resolve: {
        pool: function () {
          return pool;
        }
      }
    });

    modalInstance.result
      .then(function (pool) {
        PeerService.enter(pool);
        Notification.success('You successfully joined ' + pool.name);
      });
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }


}

function EnterPoolModalController($scope, $uibModalInstance, pool) {
  this.pool = pool;

  this.enter = function () {
    $uibModalInstance.close(pool);
  };
}

angular.module('app')
  .controller('PoolListController', PoolListController)
  .controller('EnterPoolModalController', EnterPoolModalController);
