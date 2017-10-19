class Utils {
  static checkParams(instance, params = "") {
    let _instance = { ...instance };
    params.split(".").forEach(p => {
      _instance = Utils._checkParam(_instance, p);

      if (!_instance) {
        return;
      }
    });

    return _instance;
  }

  static _checkParam(instance, param) {
    try {
      return instance[param];
    } catch (e) {
      return null;
    }
  }
}

export default Utils;