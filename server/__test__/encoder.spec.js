const encoder = require("../encoder").encodeString;

test("XXX encoded should not be equal to x3", () => {
  expect(encoder("XXX")).not.toBe("x3");
});

test("Encodes XXX to be equal to X3", () => {
  expect(encoder("XXX")).toBe("X3");
});

test("Encodes xyz to be equal to x1y1z1", () => {
  expect(encoder("xyz")).toBe("x1y1z1");
});

test("Encodes XXYYZZ to be equal to X2Y2Z2", () => {
  expect(encoder("XXYYZZ")).toBe("X2Y2Z2");
});

test("Encodes XXyyZZ to be equal to X2y2Z2", () => {
  expect(encoder("XXyyZZ")).toBe("X2y2Z2");
});

test("Encodes XXXxxx to be equal to X3x3", () => {
  expect(encoder("XXXxxx")).toBe("X3x3");
});
