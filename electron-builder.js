module.exports = {
  asar: true,
  mac: {
    icon: "build/icon.png",
  },
  files: ["out"],
  publish: [
    {
      provider: "github",
      owner: "hokaccha",
      repo: "draftan",
    },
  ],
};
