
let angles = null;

export function getAngles() {
  if (angles) { return angles };

  return {
    a: document.querySelector('[data-angle="a"]'),
    b: document.querySelector('[data-angle="b"]'),
    c: document.querySelector('[data-angle="c"]'),
    d: document.querySelector('[data-angle="d"]'),
  }
}

export function getDomVal(str) {
  return str.replace(/[a-z]/g, '');
}
