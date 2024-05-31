require("ts-node").register({
  project: "./tsconfig.scripts.json",
});
require("./scripts/populateFirestore");
