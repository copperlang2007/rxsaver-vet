export function chooseDrugCoveragePath({ vaPrice, medicarePrice, cashPrice }) {
  const options = [
    ["va", vaPrice],
    ["medicare", medicarePrice],
    ["cash", cashPrice],
  ].filter(([, price]) => Number.isFinite(price) && price >= 0);

  if (options.length === 0) {
    throw new Error("At least one valid price is required");
  }

  options.sort((left, right) => left[1] - right[1]);
  return {
    channel: options[0][0],
    price: money(options[0][1]),
  };
}

export function calculatePaymentPlan({ annualOutOfPocket, months = 12 }) {
  assertMoney(annualOutOfPocket, "annualOutOfPocket");
  if (!Number.isInteger(months) || months < 1 || months > 12) {
    throw new RangeError("months must be an integer from 1 to 12");
  }
  return money(annualOutOfPocket / months);
}

export function buildVeteranAlert({ vaEligible, medicarePrice, vaPrice }) {
  if (!vaEligible) return "Compare Medicare and cash prices";
  if (vaPrice < medicarePrice) return "VA pharmacy appears cheaper for this drug";
  return "Medicare coverage appears cheaper than VA for this drug";
}

function assertMoney(value, fieldName) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${fieldName} must be a non-negative number`);
  }
}

function money(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
