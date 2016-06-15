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
  this.enterPool = function (pool) {
    pool.members.push(UserService.getUser().id);
  };
  this.createPool = function (pool) {
    pool.members = [];
    pool.members.push(UserService.getUser().id);
    pool.id = pool.name + Math.random();
    cfg.pools.push(pool);
  };

}

angular.module('peerService', []).service('PeerService', PeerService);
