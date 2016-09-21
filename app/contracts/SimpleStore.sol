

contract SimpleStore {
  uint public store;

  function set(uint _store) {
    store = _store;
  }

  function get() constant public returns (uint storeValue) {
    return store;
  }

}
