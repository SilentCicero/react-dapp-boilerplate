

contract SimpleStoreRegistry {

  function register(address simpleStore) public returns (uint serviceId) {
    serviceId = services.length++;
    ids[simpleStore] = serviceId;
    services[serviceId] = simpleStore;
  }

  function getService(uint serviceId) returns (address serviceAddres) {
    return services[serviceId];
  }

  address[] public services;
  mapping(address => uint) public ids;
}
