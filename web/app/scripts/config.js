angular.module('config', [])
  .constant('cfg', {
    endpoint: 'https://deadbeef-6d99-41a8-988a-c31ce4ae14dc_vp1-api.blockchain.ibm.com:443/chaincode',
    secureContext: 'user_type1_deadbeef',
    chaincodeID: 'badeadbeeff1ec5ab1d077cb38907780c79260420fd94c288d6bddb710114c44969b9d560d365e38b62d379681e2acaa5b88536ebd22d6ed56c0605736349',
    users: [{
      id: 'member1',
      role: 'member'
    }, {
      id: 'member2',
      role: 'member'
    }, {
      id: 'insurer1',
      role: 'insurer'
    }, {
      id: 'insurer2',
      role: 'insurer'
    }],
    pools: [{
      id: 'pool1',
      name: 'Pool Name 1',
      trigger: 'Pool Trigger 1',
      coverage: 2000,
      premium: 100,
      members: ['member1']
    }, {
      id: 'pool2',
      name: 'Pool Name 2',
      trigger: 'Pool Trigger 2',
      coverage: 3000,
      premium: 200,
      members: ['member2']
    }, {
      id: 'pool3',
      name: 'Pool Name 3',
      trigger: 'Pool Trigger 3',
      coverage: 4000,
      premium: 300,
      members: ['member1', 'member2']
    }],
  });
