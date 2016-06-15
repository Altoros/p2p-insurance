/**
 * @class PeerService
 * @classdesc
 * @ngInject
 */
function PeerService(cfg, UserService) {
  // jshint shadow: true
  var PeerService = this;

  PeerService.getPools = function () {
    return cfg.pools;
  };
  PeerService.enterPool = function (pool) {
    pool.members.push(UserService.getUser().id);
  };
  PeerService.createPool = function (pool) {
    pool.members = [];
    pool.insures = [];
    pool.members.push(UserService.getUser().id);
    pool.id = pool.name + Math.random();
    cfg.pools.push(pool);
  };
  PeerService.insurePool = function (new_pool, insureId) {
    return _.forEach(cfg.pools, function (pool) {
      if (pool.id === new_pool.id) {
        pool.insures.push(insureId);
        pool.premium += new_pool.premium;
      }
    });
  };

}

angular.module('peerService', []).service('PeerService', PeerService);
