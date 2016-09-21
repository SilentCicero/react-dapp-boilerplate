import "dapple/test.sol";
import "SimpleStoreRegistry.sol";


contract SimpleStoreRegistryTest is Test {
  SimpleStoreRegistry target;

  function refreshTarget() {
    target = new SimpleStoreRegistry();
  }

  function testRegistry() {
    address someAddr = address(target);
    target.register(someAddr);
    assertEq(target.getService(0), someAddr);
  }
}
