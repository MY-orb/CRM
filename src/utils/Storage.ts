class LocalStorage {
  get = (key: string) => {
    window.localStorage.getItem(key);
  };
  set = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  };
}

export default new LocalStorage();
