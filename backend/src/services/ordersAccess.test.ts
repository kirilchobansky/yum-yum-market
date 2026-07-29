import test from "node:test";
import assert from "node:assert/strict";
import { getOrderQueryForUser } from "../services/ordersAccess";

test("returns no user filter for admins", () => {
  const query = getOrderQueryForUser({ isAdmin: true, id: "admin-id" });
  assert.deepEqual(query, {});
});

test("filters orders by the logged-in user for non-admins", () => {
  const query = getOrderQueryForUser({ isAdmin: false, id: "user-123" });
  assert.deepEqual(query, { user: "user-123" });
});
