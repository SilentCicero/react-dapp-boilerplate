import "dapple/test.sol";
import "SimpleStore.sol";


contract SimpleStoreTest is Test {
    SimpleStore target;

    function refreshTargetInstance() {
        target = new SimpleStore();
    }

    function setUp() {
        refreshTargetInstance();
    }

    function testSetMethod() {
        uint256 testValue = 45;
        target.set(testValue);
        assertEq(target.get(), testValue);
    }
}
