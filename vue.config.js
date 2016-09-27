export default {
  customCompilers: {
    // for tags with lang="ts"
    ts(content, cb) {
      // compile some TypeScript...
      cb(null, result);
    }
  }
};
