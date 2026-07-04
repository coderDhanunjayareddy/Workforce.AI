import { Link } from "@tanstack/react-router";

const footerGroups: { group: string; items: string[] }[] = [
  { group: "Company", items: ["About", "Contact", "Pricing"] },
  { group: "Features", items: ["AI Workforce", "Knowledge", "Campaigns"] },
  { group: "Solutions", items: ["Insurance", "Healthcare", "Education"] },
  { group: "Resources", items: ["Privacy", "Terms", "Support"] }
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
          <div className="mt-5 flex gap-4 text-sm font-semibold text-[var(--text-secondary)]">
            <a href="https://linkedin.com" aria-label="LinkedIn">LinkedIn</a>
            <a href="https://x.com" aria-label="X">X</a>
            <a href="https://github.com" aria-label="GitHub">GitHub</a>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-4">
          {footerGroups.map(({ group, items }) => (
            <div key={group}>
              <p className="font-semibold">{group}</p>
              <div className="mt-3 grid gap-2">
                {items.map((item) => (
                  <a key={item} href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
