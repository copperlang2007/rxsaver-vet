import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildVeteranAlert,
  calculatePaymentPlan,
  chooseDrugCoveragePath,
} from "../quality/va-medicare-coordination.mjs";

describe("chooseDrugCoveragePath", () => {
  it("selects the lowest available VA, Medicare, or cash price", () => {
    assert.deepEqual(chooseDrugCoveragePath({ vaPrice: 12, medicarePrice: 28, cashPrice: 18 }), {
      channel: "va",
      price: 12,
    });
  });
});

describe("calculatePaymentPlan", () => {
  it("spreads annual out-of-pocket exposure across the selected months", () => {
    assert.equal(calculatePaymentPlan({ annualOutOfPocket: 2100, months: 12 }), 175);
  });
});

describe("buildVeteranAlert", () => {
  it("calls out VA pharmacy savings when applicable", () => {
    assert.equal(
      buildVeteranAlert({ vaEligible: true, medicarePrice: 40, vaPrice: 15 }),
      "VA pharmacy appears cheaper for this drug",
    );
  });
});
