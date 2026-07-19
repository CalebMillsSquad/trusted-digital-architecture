import Link from "next/link";
import type { PublicPage } from "@/lib/site-content";
import { SiteFooter, SiteHeader } from "./site-shell";

const emailHref = "mailto:caleb@trustedacademy.net?subject=TRUSTed%20Digital%20Architecture%20Project";

function PreviewForm({ type }: { type: "contact" | "audit" }) {
  const contactFields = ["Name", "Organization", "Email", "Phone (optional)", "Website", "Industry", "Project type", "Current systems", "Primary challenge", "Desired outcome", "Estimated timeline", "Estimated budget range", "Platform constraints"];
  const auditFields = ["Name", "Organization", "Email", "Website URL", "Primary goal", "Known concerns", "Desired improvements"];
  return <div className="prototype-form" aria-label={`${type} form preview`}>
    {(type === "contact" ? contactFields : auditFields).map((field) => <label key={field}>{field}<input disabled placeholder="Preview only" /></label>)}
    {type === "contact" && <label className="form-wide">Project context<textarea disabled placeholder="Describe what needs to work better." /></label>}
    <label className="form-wide consent"><input type="checkbox" disabled /> I understand this preview does not submit or store information.</label>
    <button disabled>{type === "contact" ? "Request a project review" : "Request a website audit"}</button>
  </div>;
}

export function EditorialPage({ page }: { page: PublicPage }) {
  return <><SiteHeader /><main>
    <section className="editorial-hero"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.description}</p><Link className="button button-dark" href={emailHref}>{page.cta} <span>→</span></Link></div><div className="editorial-diagram" aria-hidden="true"><i /><i /><i /><span>STRATEGY</span><span>SYSTEMS</span><span>OPERATIONS</span></div></section>
    {page.sections.map((section, index) => <section className={`content-section section-pad ${index % 2 ? "content-tint" : ""}`} key={`${section.title}-${index}`}>
      <div className="content-heading">{section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}<h2>{section.title}</h2>{section.body?.map((text) => <p key={text}>{text}</p>)}</div>
      {section.items && <ul className="capability-list">{section.items.map((item) => <li key={item}><span>✦</span>{item}</li>)}</ul>}
      {section.cards && <div className="content-card-grid">{section.cards.map((card) => <article key={card.title}>{card.status && <span className="status-label">{card.status}</span>}<h3>{card.title}</h3><p>{card.description}</p>{card.href && <Link href={card.href}>Explore the solution <span>→</span></Link>}</article>)}</div>}
      {section.notice && <aside className="notice"><strong>Important:</strong> {section.notice}</aside>}
      {page.form && index === page.sections.length - 1 && <PreviewForm type={page.form} />}
    </section>)}
    <section className="final-cta"><div className="cta-sketch" aria-hidden="true"/><div><h2>Let us build what your business actually needs.</h2><p>Start with one defined need or a complete digital architecture plan.</p></div><Link className="button button-outline" href={emailHref}>{page.cta} <span>→</span></Link></section>
  </main><SiteFooter /></>;
}
