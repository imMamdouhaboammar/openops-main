
// tag: don't regression this feature
import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 'intel-1',
    title: 'The Rise of Deterministic Agents: Why "Vibe-Prompting" is Dead',
    excerpt: 'Enterprise environments demand reliability. We explore why structured JSON schemas and strict system instructions are replacing open-ended conversation loops in 2024.',
    category: 'Intel',
    author: { name: 'Dr. A. Saleh', role: 'Head of Research', verified: true },
    date: 'Oct 12, 2024',
    readTime: '6 min',
    tags: ['Architecture', 'Strategy', 'Enterprise'],
    content: [
      { type: 'header', content: 'The Prediction Paradox' },
      { type: 'text', content: 'For the last two years, the AI industry has been obsessed with "magic"—the ability of LLMs to generate creative, unexpected outputs. But for a business running operations, "unexpected" is a liability. You don\'t want a creative accountant; you want a deterministic one.' },
      { type: 'quote', content: 'Reliability is the new feature. If you can\'t reproduce the output 100 times in a row, you can\'t ship it to production.' },
      { type: 'text', content: 'This shift is driving the market towards "Agent Specifications" rather than simple prompts. A specification includes the exact JSON schema the agent must output, the specific tools it is allowed to call, and the failure modes it must handle.' },
      { type: 'header', content: 'The Code-First Approach' },
      { type: 'code', language: 'json', content: `// Instead of "Write me a blog post"
// We define the output structure strictly:

{
  "response_format": {
    "type": "json_object",
    "schema": {
       "title": "string",
       "seo_keywords": ["string"],
       "sections": [
          { "heading": "string", "body": "string" }
       ]
    }
  }
}` },
      { type: 'text', content: 'By enforcing schemas, we turn the LLM from a creative writer into a logic engine. This is the foundation of the OpenOps Fleet philosophy.' }
    ]
  },
  {
    id: 'blueprint-1',
    title: 'Blueprint: Orchestrating a 3-Agent Support Swarm',
    excerpt: 'A technical deep-dive on connecting a Triage Agent, a Resolution Agent, and a QA Agent using a shared state graph. Includes pseudo-code.',
    category: 'Blueprint',
    author: { name: 'Sarah Jenkins', role: 'Lead Architect', verified: true },
    date: 'Oct 08, 2024',
    readTime: '12 min',
    tags: ['Engineering', 'Code', 'Tutorial'],
    content: [
      { type: 'header', content: 'The Handoff Problem' },
      { type: 'text', content: 'Single agents often hallucinate when context windows get too full. The solution is decomposition: breaking one complex task into three specialized roles.' },
      { type: 'code', language: 'typescript', content: `const supportSwarm = new Swarm({
  agents: [
    new TriageAgent({ model: 'gemini-1.5-flash' }),
    new ResolutionAgent({ model: 'claude-3-opus' }),
    new QAAgent({ model: 'gpt-4o' })
  ],
  sharedState: new RedisMemory()
});` },
      { type: 'text', content: 'In this setup, the Triage Agent categorizes the ticket and enriches it with user data. It then passes the state key to the Resolution Agent. Crucially, the Resolution Agent does not reply to the user. It drafts a reply.' },
      { type: 'header', content: 'The QA Gate' },
      { type: 'text', content: 'The QA Agent is the final gatekeeper. It checks the draft against company policy and sentiment guidelines. Only if it passes does the swarm emit the final response.' }
    ]
  },
  {
    id: 'case-study-1',
    title: 'Case Study: How FinCorp Reduced Audit Time by 70% using "Compliance / Legal" Agent',
    excerpt: 'Real-world data on deploying our L4 Compliance Agent to scan contracts for standard clauses vs. risky deviations.',
    category: 'Case Study',
    author: { name: 'OpenOps Team', role: 'Case Team', verified: true },
    date: 'Sep 29, 2024',
    readTime: '8 min',
    tags: ['ROI', 'Legal', 'Operations'],
    relatedProductIds: ['ops-3'], // Compliance / Legal
    content: [
      { type: 'header', content: 'The Bottleneck' },
      { type: 'text', content: 'FinCorp (pseudonym) was spending 40 hours a week manually reviewing NDAs and MSA agreements. The legal team was a bottleneck for sales.' },
      { type: 'text', content: 'They deployed the OpenOps "Compliance / Legal" agent, specifically configured with their risk playbooks.' },
      { type: 'header', content: 'The Results' },
      { type: 'text', content: '- 70% reduction in first-pass review time.\n- Zero missed critical risk clauses in the 3-month pilot.\n- Sales cycle reduced by 4 days on average.' },
      { type: 'quote', content: '"We moved lawyers from reading boilerplate to negotiating high-value deals. The agent handles the boring stuff perfectly." - General Counsel, FinCorp' }
    ]
  }
];
