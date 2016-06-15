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
  this.insurePool = function (new_pool) {
    console.log('pool', new_pool);
    return _.forEach(cfg.pools, function (pool) {
      if (pool.id === new_pool.id) {
        pool.premium += new_pool.premium
      }
    });
  };

}

angular.module('peerService', []).service('PeerService', PeerService);
