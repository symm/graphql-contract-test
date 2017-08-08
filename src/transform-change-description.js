function transformChangeDescription(message) {
  let transformed = message.replace(' was removed.', ' is not present.');

  transformed = transformed.replace(
    /changed type from (.*) to (.*)./,
    (match, p1, p2) => `expected ${p1} but got ${p2}.`,
  );

  return transformed;
}

module.exports = transformChangeDescription;
