/**
 * @class OraclesPaymentController
 * @classdesc
 * @ngInject
 */
function OraclesPaymentController(cfg, Notification, UserService, PeerService) {
  var ctl = this;
  ctl.simulate = simulate;

  ctl.transferPurposes = cfg.transferPurposes;
  ctl.transaction = {
    id: null,
    from: null,
    to: null,
    amount: null,
    purpose: ctl.transferPurposes[0]
  };

  function simulate(transaction) {
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
      Notification.error('Destination ' + transaction.id + ' not found.');
    }
  };
}

angular.module('oraclesPaymentController', [])
.controller('OraclesPaymentController', OraclesPaymentController);
