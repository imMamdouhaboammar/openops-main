import { AgentCard } from "./AgentCard";
import { marketplaceAgents, marketplaceStats } from "./data";

export function MarketplacePage() {
  return (
    <main className="marketplace-shell">
      <section className="hero-section">
        <div className="hero-section__content">
          <span className="eyebrow">OpenOps Marketplace</span>
          <h1>Claude Plugin Marketplace for marketing teams</h1>
          <p>
            A simple catalog of agents, skills, and workflows for paid media, content, SEO, PR,
            proposals, decks, Saudi marketing, account management, and performance analysis.
          </p>
          <div className="hero-section__actions">
            <a href="#agents" className="button button--primary">Browse agents</a>
            <a href="#how-it-works" className="button button--secondary">How it works</a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Marketplace summary">
          {marketplaceStats.map((stat) => (
            <div key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="simple-note" id="how-it-works">
        <span>How it works</span>
        <p>
          Pick the agent, open it in Claude, paste your brief, and get a structured output. The
          current launch offer makes every item free for a limited time while the marketplace is
          being shaped.
        </p>
      </section>

      <section className="agents-section" id="agents" aria-labelledby="agents-heading">
        <div className="section-heading">
          <span>Agents and skills</span>
          <h2 id="agents-heading">12 ready workflows</h2>
        </div>
        <div className="agents-grid">
          {marketplaceAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </main>
  );
}
