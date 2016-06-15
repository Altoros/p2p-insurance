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
    ctl.currentUser = currentUser;
    var pools = PeerService.getPools();
    ctl.myPools = pools.filter(function (pool) {
      return pool.members.indexOf(ctl.currentUser.id) !== -1;
    });
    ctl.otherPools = pools.filter(function (pool) {
      return pool.members.indexOf(ctl.currentUser.id) === -1;
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

function CreatePoolModalController($uibModalInstance, cfg) {
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
