import "dapple/test.sol";
import "SimpleStoreFactory.sol";


contract SimpleStoreFactoryTest is Test {
  SimpleStoreFactory target;
  SimpleStoreRegistry registry;

  function refreshTarget() {
    registry = new SimpleStoreRegistry();
    target = new SimpleStoreFactory(address(registry));
  }

  function testFactory() {
    address simpleStore = target.createSimpleStore();
    assertEq(registry.getService(0), simpleStore);
  }
}
