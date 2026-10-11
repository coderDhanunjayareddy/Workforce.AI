import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.WORKFORCE_PLAYWRIGHT_MODULE || "playwright");
const origin = process.env.WORKFORCE_TEST_URL || "http://127.0.0.1:5174";
const suffix = Date.now().toString().slice(-8);
const contactEmail = `smoke${suffix}@example.com`;
const csvEmail = `csv${suffix}@example.com`;
let activePage;
const browser = await chromium.launch({
  headless: true,
  ...(process.env.WORKFORCE_BROWSER_PATH ? { executablePath: process.env.WORKFORCE_BROWSER_PATH } : {})
});
await mkdir("test-results", { recursive: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  activePage = page;
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${origin}/login`);
  if (process.env.WORKFORCE_TEST_PASSWORD) await page.getByLabel("Password", { exact: true }).fill(process.env.WORKFORCE_TEST_PASSWORD);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.waitForURL("**/app/workforce", { waitUntil: "domcontentloaded" });
  await page.goto(`${origin}/app/contacts`);
  await page.getByRole("button", { name: "Add Contact", exact: true }).click();
  const form = page.getByRole("dialog", { name: "Add Contact" });
  await form.getByLabel("Full name", { exact: true }).fill("Smoke Test Customer");
  await form.getByLabel("Email", { exact: true }).fill(contactEmail);
  await form.getByLabel("Phone", { exact: true }).fill(`+919${suffix}`);
  await form.getByRole("button", { name: "Save Contact", exact: true }).click();
  await form.waitFor({ state: "hidden" });
  await page.reload();
  await page.getByRole("textbox", { name: "Search contacts", exact: true }).fill(contactEmail);
  await page.getByRole("link", { name: /^Smoke Test Customer/ }).click();
  const profileUrl = page.url();
  await page.getByRole("button", { name: "Edit Contact", exact: true }).click();
  const edit = page.getByRole("dialog", { name: "Edit Contact" });
  await edit.getByLabel("Full name", { exact: true }).fill("Smoke Updated Customer");
  await edit.getByRole("button", { name: "Save Contact", exact: true }).click();
  await edit.waitFor({ state: "hidden" });
  await page.reload();
  await page.getByRole("heading", { name: "Smoke Updated Customer", exact: true }).waitFor();
  await page.goto(`${origin}/app/contacts/import`);
  await page.getByRole("button", { name: "Next", exact: true }).click();
  assert.equal(await page.getByRole("button", { name: "Next", exact: true }).isDisabled(), true);
  await page.getByLabel("Contact file", { exact: true }).setInputFiles({
    name: "customers.csv", mimeType: "text/csv",
    buffer: Buffer.from(`name,email,phone\nCSV Customer,${csvEmail},+918${suffix}\nCSV Duplicate,${csvEmail},+917${suffix}\nInvalid,wrong,12`)
  });
  await page.getByText("3 rows found.", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByText("3 rows checked. 1 invalid rows will be skipped.", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByText(/1 duplicates found by email or phone/).waitFor();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Import Contacts", exact: true }).click();
  await page.getByText("1 contacts saved. 1 duplicates skipped. 1 invalid rows skipped.", { exact: true }).waitFor();
  await page.goto(`${origin}/app/contacts`);
  await page.getByRole("textbox", { name: "Search contacts", exact: true }).fill(csvEmail);
  await page.getByRole("link", { name: /^CSV Customer/ }).waitFor();
  await page.screenshot({ path: "test-results/contacts-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Add Contact", exact: true }).click();
  await page.getByRole("dialog").waitFor();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.screenshot({ path: "test-results/contact-form-mobile.png" });
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/app/employees/emp_sophia`);
  await page.getByRole("button", { name: "Edit Profile", exact: true }).click();
  const employeeForm = page.getByRole("dialog", { name: "Edit Sophia" });
  const previousRole = await employeeForm.getByLabel("Role", { exact: true }).inputValue();
  await employeeForm.getByLabel("Role", { exact: true }).fill("Smoke Sales Executive");
  await employeeForm.getByRole("button", { name: "Save Profile", exact: true }).click();
  await employeeForm.waitFor({ state: "hidden" });
  await page.reload();
  await page.getByText(/Smoke Sales Executive in/).waitFor();
  await page.getByRole("button", { name: "Edit Profile", exact: true }).click();
  await employeeForm.getByLabel("Role", { exact: true }).fill(previousRole);
  await employeeForm.getByRole("button", { name: "Save Profile", exact: true }).click();
  await employeeForm.waitFor({ state: "hidden" });
  if (process.env.WORKFORCE_TEST_PASSWORD) {
    await page.route("**/api/v1/contacts", (route) => route.abort());
    await page.goto(`${origin}/app/contacts`);
    await page.getByText("Contact hub could not be loaded", { exact: true }).waitFor();
    await page.unroute("**/api/v1/contacts");
  }
  await page.goto(profileUrl);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete Contact", exact: true }).click();
  await page.waitForURL("**/app/contacts", { waitUntil: "domcontentloaded" });
  await page.reload();
  await page.getByRole("textbox", { name: "Search contacts", exact: true }).fill(contactEmail);
  await page.getByText("No contacts available.", { exact: true }).waitFor();
  assert.deepEqual(errors, []);
  process.stdout.write("Browser smoke passed: contact persistence, edit/delete, CSV validation/import, mobile layout, employee edit, and error feedback.\n");
} catch (error) {
  if (activePage) {
    process.stderr.write(`Failed at ${activePage.url()}: ${(await activePage.locator("body").innerText()).slice(0, 2000)}\n`);
    await activePage.screenshot({ path: "test-results/smoke-failure.png", fullPage: true });
  }
  throw error;
} finally {
  await browser.close();
}
