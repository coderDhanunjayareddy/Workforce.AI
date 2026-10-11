import { describe, expect, it } from "vitest";

import { parseContactCsv, validateCsvRows } from "./contactCsv";

describe("contact CSV import", () => {
  it("parses quoted commas and maps named columns", () => {
    const preview = parseContactCsv('Full Name,Email,Phone,Company\n"Ravi, Kumar",ravi@example.com,+919876543210,Acme');
    const result = validateCsvRows(preview, []);
    expect(result.contacts[0].fullName).toBe("Ravi, Kumar");
    expect(result.errors).toHaveLength(0);
  });
  it("reports invalid rows and skips case-insensitive email and formatted phone duplicates", () => {
    const preview = parseContactCsv("name,email,phone\nRavi Kumar,ravi@example.com,+91 98765 43210\nRavi Duplicate,RAVI@example.com,+919000000000\nPhone Duplicate,other@example.com,919876543210\nInvalid,bad,12");
    const result = validateCsvRows(preview, []);
    expect(result.contacts).toHaveLength(1);
    expect(result.duplicates).toBe(2);
    expect(result.errors[0].row).toBe(5);
  });
  it("rejects empty, malformed, oversized and duplicate-header files", () => {
    expect(() => parseContactCsv("name,email,phone")).toThrow();
    expect(() => parseContactCsv('name,email,phone\n"unfinished')).toThrow();
    expect(() => parseContactCsv("name,email,email\nRavi,a@b.com,a@b.com")).toThrow();
    expect(() => parseContactCsv("name,email,phone\n" + Array.from({ length: 1001 }, () => "Ravi,a@b.com,123456789").join("\n"))).toThrow();
  });
});
