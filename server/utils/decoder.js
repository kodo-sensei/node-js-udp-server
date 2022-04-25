exports.convertHextoIP = (hex) => {
  return hex.replace(/(\w{2})/gi, function (str, match) {
    return `${parseInt(match, 16)}.`;
  });
};
