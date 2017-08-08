function transformChangeDescription(message) {

  let transformed = message.replace(' was removed.', ' is not present.');

  transformed = transformed.replace(
    /changed type from (.*) to (.*)./,
    function (match, p1, p2, p3) { return `expected ${p1} but got ${p2}.` }
  );

  return transformed
}
module.exports = transformChangeDescription;
