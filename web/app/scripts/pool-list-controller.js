/**
 * @class PoolListController
 * @classdesc
 * @ngInject
 */
function PoolListController($scope, $interval, $uibModal, Notification, PeerService, UserService) {
  var ctl = this;
  ctl.openEnterPoolModal = openEnterPoolModal;
  ctl.cancel = cancel;
  ctl.create = create;

  var currentUserId = UserService.getUser().id;

  $scope.$on('$viewContentLoaded', getPools);

  $interval(getPools, 1000);

  function getPools() {
    var pools = PeerService.getPools();
    ctl.myPools = pools.filter(function (pool) {
      return pool.members.indexOf(currentUserId) !== -1;
    });
    ctl.otherPools = pools.filter(function (pool) {
      return pool.members.indexOf(currentUserId) === -1;
    });
  }

  function openEnterPoolModal(pool) {
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
        PeerService.enterPool(pool);
        Notification.success('You successfully joined ' + pool.name);
      });
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }

  function create() {
    var modalInstance = $uibModal.open({
      templateUrl: 'create-pool-modal.html',
      controller: 'CreatePoolModalController as createPool'
    });

    modalInstance.result
      .then(function (pool) {
        PeerService.createPool(pool);
        Notification.success('You successfully created and joined ' + pool.name);
      });
  }
}

function EnterPoolModalController($scope, $uibModalInstance, pool) {
  this.pool = pool;

  this.enter = function (pool) {
    $uibModalInstance.close(pool);
  };
}

function CreatePoolModalController($scope, $uibModalInstance, cfg) {
  this.triggers = cfg.triggers;
  this.pool = {
    name: null,
    coverage: null,
    premium: null,
    trigger: this.triggers[0]
  };

  this.create = function (pool) {
    $uibModalInstance.close(pool);
  };
}

angular.module('app')
  .controller('PoolListController', PoolListController)
  .controller('EnterPoolModalController', EnterPoolModalController)
  .controller('CreatePoolModalController', CreatePoolModalController);
