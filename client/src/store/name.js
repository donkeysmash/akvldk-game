const KEY_NAME = 'akvldk-game-name';

class NameStore {
  load() {
    this.name = localStorage.getItem(KEY_NAME);
  }

  getName() {
    return this.name;
  }

  setName(name) {
    localStorage.setItem(KEY_NAME, name);
    this.name = name
  }

  isNameAvailable() {
    return typeof this.name === 'string' && this.name.length > 0;
  }

  logout() {
    localStorage.removeItem(KEY_NAME);
    this.name = null;
  }
}

const nameStore = new NameStore();

export default nameStore;