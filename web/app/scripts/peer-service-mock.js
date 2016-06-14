/**
 * @class PeerService
 * @classdesc
 * @ngInject
 */
function PeerService(cfg, UserService) {
  // jshint shadow: true
  var PeerService = this;

  this.getPools = function () {
    return cfg.pools;
  };
  this.enter = function (pool) {
    pool.members.push(UserService.getUser().id);
  };

}

angular.module('peerService', []).service('PeerService', PeerService);
