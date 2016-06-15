/**
 * @class PoolListController
 * @classdesc
 * @ngInject
 */
function PoolListController($scope, $interval, $uibModal, Notification, PeerService, UserService) {
  var ctl = this;
  ctl.openEnterPoolModal = openEnterPoolModal;
  ctl.openInsurePoolModal = openInsurePoolModal;
  ctl.cancel = cancel;
  ctl.create = create;
  ctl.simulateMoneyTransfer = simulateMoneyTransfer;
  ctl.simulateInsuranceEvent = simulateInsuranceEvent;

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

  function simulateMoneyTransfer() {
    var modalInstance = $uibModal.open({
      templateUrl: 'oracle-simulate-transfer-modal.html',
      controller: 'SimulateTransferModalController as simulateTransfer'
    });

    modalInstance.result
      .then(function (transaction) {
        var foundUsers = UserService.getUsers().filter(function (user) {
          return user.id === transaction.id;
        });
        var foundPools = PeerService.getPools().filter(function (pool) {
          return pool.id === transaction.id;
        });
        var destination = foundUsers[0] || foundPools[0];

        if (destination) {
          Notification.success('Paying $' + transaction.amount + ' to ' + destination.id + ' for ' + transaction.purpose);
        } else {
          Notification.error('Destination ' + transaction.id + ' not found.')
        }
      });
  }

  function simulateInsuranceEvent() {
    var modalInstance = $uibModal.open({
      templateUrl: 'oracle-simulate-event-modal.html',
      controller: 'SimulateInsuranceEventModalController as simulateEvent'
    });

    modalInstance.result
      .then(function (event) {
        var foundPools = PeerService.getPools().filter(function (pool) {
          return pool.trigger === event.trigger;
        });

        if (!foundPools.length) {
          Notification.error('No Pool found for trigger ' + event.trigger);
        }
        foundPools.forEach(function (pool) {
          Notification.success('Paying $' + pool.premium + ' to ' + pool.id + ' for ' + event.trigger);
        });
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


function SimulateTransferModalController($uibModalInstance, cfg) {
  this.transferPurposes = cfg.transferPurposes;
  this.transaction = {
    id: null,
    from: null,
    to: null,
    amount: null,
    purpose: this.transferPurposes[0]
  };

  this.simulate = function (transaction) {
    $uibModalInstance.close(transaction);
  };
}


function SimulateInsuranceEventModalController($uibModalInstance, cfg) {
  this.triggers = cfg.triggers;
  this.event = {
    trigger: this.triggers[0]
  };

  this.simulate = function (event) {
    $uibModalInstance.close(event);
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
  .controller('SimulateTransferModalController', SimulateTransferModalController)
  .controller('SimulateInsuranceEventModalController', SimulateInsuranceEventModalController)
  .controller('InsurePoolModalController', InsurePoolModalController);
