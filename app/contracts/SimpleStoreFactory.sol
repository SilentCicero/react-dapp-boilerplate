import "SimpleStore.sol";
import "SimpleStoreRegistry.sol";


contract SimpleStoreFactory {
  function SimpleStoreFactory(address _registry){
    registry = SimpleStoreRegistry(_registry);
  }

  function createSimpleStore() returns (address simpleStore) {
    simpleStore = address(new SimpleStore());
    registry.register(simpleStore);
    return simpleStore;
  }

  SimpleStoreRegistry registry;
}
