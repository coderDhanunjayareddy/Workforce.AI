import { Link } from "@tanstack/react-router";

const footerGroups = [
  { group: "Company", items: [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Pricing", href: "/pricing" }] },
  { group: "Product", items: [{ label: "Features", href: "/features" }, { label: "Solutions", href: "/solutions" }, { label: "Explore Demo", href: "/login" }] }
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <Link to="/" className="font-display text-xl font-semibold">Workforce AI</Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            Build Your Digital Workforce with AI Employees that learn, perform, and improve alongside human teams.
          </p>
          <p className="mt-5 text-xs text-[var(--text-muted)]">Version 1 demo · Fictional companies and sample data</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-4">
          {footerGroups.map(({ group, items }) => (
            <div key={group}>
              <p className="font-semibold">{group}</p>
              <div className="mt-3 grid gap-2">
                {items.map((item) => (
                  <Link key={item.href} to={item.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">{item.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
