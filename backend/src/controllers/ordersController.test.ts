import test from "node:test";
import assert from "node:assert/strict";
import { getOrderPaymentErrorStatus } from "./ordersController";

test("maps missing-order errors to 404", () => {
  assert.equal(getOrderPaymentErrorStatus(new Error("Order Not Found!")), 404);
});

test("maps generic payment failures to 400 instead of 401", () => {
  assert.equal(
    getOrderPaymentErrorStatus(new Error("Order is already paid!")),
    400,
  );
});
