import { expect, it } from "vitest";

import { employees } from "./mockData";

it("keeps employee percentage scores within their documented range", () => {
  const sophia = employees.find((employee) => employee.id === "emp_sophia");
  expect(sophia?.health).toBe(97);
  expect(sophia?.performance).toBe(96);
  for (const employee of employees) {
    for (const score of [employee.health, employee.knowledgeScore, employee.performance, employee.csat]) {
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    }
  }
});
