/**
 * @class OraclesClaimController
 * @classdesc
 * @ngInject
 */
function OraclesClaimController(cfg, Notification, UserService, PeerService) {
  var ctl = this;
  ctl.simulate = simulate;

  this.triggers = cfg.triggers;
  this.event = {
    trigger: this.triggers[0]
  };

  function simulate(event) {
    var foundPools = PeerService.getPools().filter(function (pool) {
      return pool.trigger === event.trigger;
    });

    if (!foundPools.length) {
      Notification.error('No Pool found for trigger ' + event.trigger);
    }
    foundPools.forEach(function (pool) {
      Notification.success('Paying $' + pool.premium + ' to ' + pool.id + ' for ' + event.trigger);
    });
  };
}

angular.module('oraclesClaimController', [])
.controller('OraclesClaimController', OraclesClaimController);
