import type { MarketplaceAgent } from "./types";

interface AgentCardProps {
  agent: MarketplaceAgent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <article className="agent-card">
      <div className="agent-card__topline">
        <span className="agent-card__order">{agent.order}</span>
        <span className="agent-card__category">{agent.category}</span>
      </div>
      <div className="agent-card__header">
        <h3>{agent.name}</h3>
        <p>{agent.description}</p>
      </div>
      <div className="agent-card__pricing" aria-label={`Original price ${agent.priceEgp} Egyptian pounds`}>
        <span>{agent.priceEgp.toLocaleString("en-US")} EGP</span>
        <strong>{agent.freeLabel}</strong>
      </div>
      <div className="agent-card__promise">
        <span>Best for</span>
        <p>{agent.bestFor}</p>
      </div>
      <div className="agent-card__promise">
        <span>Output promise</span>
        <p>{agent.promise}</p>
      </div>
      <div className="agent-card__grid">
        <div>
          <span className="agent-card__label">Deliverables</span>
          <ul>
            {agent.deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="agent-card__label">Workflow</span>
          <ol>
            {agent.workflow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="agent-card__command">
        <span>Command preview</span>
        <code>{agent.installCommand}</code>
      </div>
    </article>
  );
}
