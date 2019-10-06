window.module = {
  exports: {},
  require: function (key) {
    return this.exports[key];
  }
}

window.module.require.bind(window.module);