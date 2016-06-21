/**
 * @class PoolListController
 * @classdesc
 * @ngInject
 */
function PoolListController($scope, $interval, $uibModal, Notification, PeerService, UserService) {
  var ctl = this;
  ctl.openEnterPoolModal = openEnterPoolModal;
  ctl.openInsurePoolModal = openInsurePoolModal;
  ctl.create = create;

  $scope.$on('$viewContentLoaded', getPools);
  var currentUser = UserService.getUser();
  $interval(getPools, 1000);

  function getPools() {
    var pools = PeerService.getPools();
    ctl.pools = pools;
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

  function openInsurePoolModal(pool) {
    var modalInstance = $uibModal.open({
      templateUrl: 'insure-pool-modal.html',
      controller: 'InsurePoolModalController as insurePool',
      resolve: {
        pool: function () {
          return pool;
        }
      }
    });

    modalInstance.result
      .then(function (pool) {
        PeerService.insurePool(pool, currentUser.id);
        Notification.success('You successfully insured ' + pool.name);
      });
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

function EnterPoolModalController($uibModalInstance, pool) {
  this.pool = pool;

  this.enter = function (pool) {
    $uibModalInstance.close(pool);
  };
}

function CreatePoolModalController($uibModalInstance) {
  this.pool = {
    name: null,
    coverage: null,
    premium: null,
    trigger: null
  };

  this.create = function (pool) {
    $uibModalInstance.close(pool);
  };
}

function InsurePoolModalController($scope, $uibModalInstance, pool) {
  this.pool = pool;

  this.insure = function (pool) {
    $uibModalInstance.close(pool);
  };
}

angular.module('app')
  .controller('PoolListController', PoolListController)
  .controller('EnterPoolModalController', EnterPoolModalController)
  .controller('CreatePoolModalController', CreatePoolModalController)
  .controller('InsurePoolModalController', InsurePoolModalController);
