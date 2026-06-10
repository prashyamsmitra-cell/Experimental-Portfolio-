import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Cpu,
  Database,
  GitBranch,
  Network,
  Server,
  Terminal,
  X,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { EditOverlay } from "@/components/EditOverlay";

type PhilosophyItem = {
  color: string;
  title: string;
  body: string;
};

type SkillGroupDraft = {
  category: string;
  items: string[];
  itemsText: string;
};

const identityRoles = [
  "B.Tech Computer Science Student",
  "Full Stack Developer",
  "AI Enthusiast",
  "Aspiring Software Engineer",
];

const focusAreas = [
  "Building products",
  "Learning system design",
  "Exploring AI applications",
  "Understanding scalability",
];

const journeyNodes = [
  {
    stage: "01",
    title: "Programming fundamentals",
    detail: "Started with C and C++, learning how logic, memory, and constraints shape code.",
    depth: "translate-y-4 opacity-70",
  },
  {
    stage: "02",
    title: "Web development",
    detail: "Moved into JavaScript and React, turning ideas into usable interfaces and workflows.",
    depth: "translate-y-2 opacity-85",
  },
  {
    stage: "03",
    title: "Full-stack products",
    detail: "Connected frontends to APIs, databases, authentication, and real user journeys.",
    depth: "translate-y-0 opacity-100",
  },
  {
    stage: "04",
    title: "AI integrations",
    detail: "Exploring OpenAI APIs, RAG patterns, automation, and assistant-style product experiences.",
    depth: "translate-y-0 opacity-100",
  },
  {
    stage: "05",
    title: "Scalable architecture",
    detail: "Studying how systems behave under growth, failure, latency, and operational pressure.",
    depth: "-translate-y-2 opacity-90",
  },
];

const technicalEvolution = [
  { category: "Foundations", items: ["C", "C++", "JavaScript"] },
  { category: "Building Products", items: ["React", "Next.js", "Node.js"] },
  { category: "Data & Storage", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { category: "AI & Automation", items: ["OpenAI APIs", "RAG Systems", "AI Agents"] },
  { category: "Systems & Infrastructure", items: ["Docker", "Cloud", "System Design"] },
];

const architectureConcepts = [
  { label: "Requests", Icon: GitBranch, position: "left-[8%] top-[48%]" },
  { label: "Caches", Icon: Cpu, position: "left-[29%] top-[26%]" },
  { label: "Databases", Icon: Database, position: "left-[53%] top-[55%]" },
  { label: "AI", Icon: BrainCircuit, position: "right-[15%] top-[24%]" },
  { label: "Services", Icon: Server, position: "right-[8%] bottom-[18%]" },
];

const trajectory = [
  "Computer Science Student",
  "Software Engineer",
  "Backend Engineer",
  "Distributed Systems Engineer",
  "Technical Architect",
];

function HeroEditDialog({ onClose }: { onClose: () => void }) {
  const { data, updateData } = useApp();
  const [heading, setHeading] = useState(data.hero.heading);
  const [subheading, setSubheading] = useState(data.hero.subheading);
  const [philosophy, setPhilosophy] = useState(data.hero.philosophy);

  const save = () => {
    updateData((prev) => ({ ...prev, hero: { heading, subheading, philosophy } }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="surface w-full max-w-xl rounded-xl border border-primary/30 p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-mono font-bold text-foreground">Edit Hero Section</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase text-muted-foreground">Main Heading</label>
            <textarea
              value={heading}
              onChange={(event) => setHeading(event.target.value)}
              rows={3}
              className="w-full resize-none rounded border border-border bg-secondary px-3 py-2 font-mono text-sm text-foreground transition-colors focus:border-primary focus:outline-none"
              data-testid="input-hero-heading"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase text-muted-foreground">Subheading</label>
            <textarea
              value={subheading}
              onChange={(event) => setSubheading(event.target.value)}
              rows={2}
              className="w-full resize-none rounded border border-border bg-secondary px-3 py-2 font-mono text-sm text-foreground transition-colors focus:border-primary focus:outline-none"
              data-testid="input-hero-subheading"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase text-muted-foreground">Philosophy Quote</label>
            <input
              value={philosophy}
              onChange={(event) => setPhilosophy(event.target.value)}
              className="w-full rounded border border-border bg-secondary px-3 py-2 font-mono text-sm text-foreground transition-colors focus:border-primary focus:outline-none"
              data-testid="input-hero-philosophy"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            Cancel
          </button>
          <button onClick={save} className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-mono text-sm text-primary-foreground transition-colors hover:bg-primary/90" data-testid="button-save-hero">
            <Check className="h-4 w-4" /> Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AboutEditDialog({ onClose }: { onClose: () => void }) {
  const { data, updateData } = useApp();
  const [bio0, setBio0] = useState(data.about.bio[0] ?? "");
  const [bio1, setBio1] = useState(data.about.bio[1] ?? "");
  const [items, setItems] = useState<PhilosophyItem[]>(data.about.philosophyItems.map((item) => ({ ...item })));
  const [skillGroups, setSkillGroups] = useState<SkillGroupDraft[]>(
    data.about.skillGroups.map((group) => ({ ...group, itemsText: group.items.join(", ") })),
  );

  const save = () => {
    updateData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        bio: [bio0, bio1].filter(Boolean),
        philosophyItems: items,
        skillGroups: skillGroups
          .map(({ itemsText, ...group }) => ({
            ...group,
            category: group.category.trim(),
            items: itemsText.split(",").map((item) => item.trim()).filter(Boolean),
          }))
          .filter((group) => group.category && group.items.length > 0),
      },
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="surface my-8 w-full max-w-2xl rounded-xl border border-primary/30 p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-mono font-bold">Edit About Story</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase text-muted-foreground">Bio Paragraph 1</label>
            <textarea value={bio0} onChange={(event) => setBio0(event.target.value)} rows={3} className="w-full resize-none rounded border border-border bg-secondary px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase text-muted-foreground">Bio Paragraph 2</label>
            <textarea value={bio1} onChange={(event) => setBio1(event.target.value)} rows={3} className="w-full resize-none rounded border border-border bg-secondary px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            Cancel
          </button>
          <button onClick={save} className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-mono text-sm text-primary-foreground transition-colors hover:bg-primary/90">
            <Check className="h-4 w-4" /> Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function DepthPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 160, damping: 20 });

  return (
    <motion.div
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function IdentityTerminal({ philosophy }: { philosophy: string }) {
  const terminalLines = [
    { command: "whoami", body: ["Prashyam Sankar Mitra", ...identityRoles] },
    { command: "current_focus", body: focusAreas },
    { command: "status", body: ["Engineer in progress"] },
  ];

  return (
    <DepthPanel className="surface glow overflow-hidden rounded-xl p-4 font-mono text-sm">
      <div className="mb-4 flex items-center gap-2 border-b border-border/50 pb-4">
        <div className="h-3 w-3 rounded-full bg-destructive" />
        <div className="h-3 w-3 rounded-full bg-warning" />
        <div className="h-3 w-3 rounded-full bg-success" />
        <div className="ml-2 text-xs text-muted-foreground">identity.boot</div>
      </div>
      <div className="mb-5 flex items-center gap-4 rounded-lg border border-border/70 bg-background/40 p-3">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-md border border-primary/40 bg-primary/10 text-xl font-bold text-primary">
          PM
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">PRASHYAM SANKAR MITRA</div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Building software. Learning systems. Exploring AI.
          </p>
        </div>
      </div>
      <div className="space-y-5 text-muted-foreground">
        {terminalLines.map((line, index) => (
          <motion.div
            key={line.command}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + index * 0.18 }}
          >
            <span className="text-success">$</span> <span className="text-foreground">{line.command}</span>
            <div className="mt-2 grid gap-1 pl-4">
              {line.body.map((item) => (
                <span key={item} className={item === "Engineer in progress" ? "text-accent" : ""}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
        <div>
          <span className="text-success">$</span> <span className="text-foreground">cat ./philosophy.md</span>
          <div className="mt-2 border-l-2 border-border py-1 pl-3 italic text-accent">{philosophy}</div>
        </div>
      </div>
    </DepthPanel>
  );
}

function KnowledgeGraph() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35">
      <svg className="h-full w-full" viewBox="0 0 600 260" aria-hidden="true">
        <motion.path
          d="M70 150 C150 50 245 210 330 110 S480 70 545 155"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0.2 }}
          whileInView={{ pathLength: 1, opacity: 0.45 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6 }}
        />
        {[70, 170, 285, 400, 545].map((cx, index) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={[150, 84, 178, 96, 155][index]}
            r="5"
            className="fill-primary"
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 3.8, repeat: Infinity, delay: index * 0.35 }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Home() {
  const { data } = useApp();
  const { hero, about } = data;
  const [editingHero, setEditingHero] = useState(false);
  const [editingAbout, setEditingAbout] = useState(false);
  const [gridGlow, setGridGlow] = useState({ x: 50, y: 22 });
  const bio = Array.isArray(about.bio) ? about.bio : [];
  const philosophyItems = Array.isArray(about.philosophyItems) ? about.philosophyItems : [];

  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden px-4 pb-16 pt-24"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setGridGlow({
          x: Math.round(((event.clientX - rect.left) / rect.width) * 100),
          y: Math.round(((event.clientY - rect.top) / rect.height) * 100),
        });
      }}
    >
      {editingHero && <HeroEditDialog onClose={() => setEditingHero(false)} />}
      {editingAbout && <AboutEditDialog onClose={() => setEditingAbout(false)} />}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${gridGlow.x}% ${gridGlow.y}%, oklch(0.78 0.18 165 / 0.12), transparent 28%)`,
        }}
      />

      <div className="container relative mx-auto max-w-5xl">
        <EditOverlay label="Hero" onEdit={() => setEditingHero(true)}>
          <div className="grid grid-cols-1 items-center gap-12 rounded-xl p-2 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-5 font-mono text-sm uppercase text-primary">// engineer_initialization</div>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                I build software that solves <span className="text-gradient">real-world problems</span> while learning how great systems are designed.
              </h1>
              <p className="mb-8 max-w-xl text-lg text-muted-foreground md:text-xl">
                {hero.subheading || "Computer Science student, full-stack developer, and AI enthusiast growing toward backend engineering, distributed systems, and scalable software architecture."}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  View Projects <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/lab" className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 font-mono text-sm font-medium transition-colors hover:bg-secondary">
                  Systems Lab <Terminal className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <IdentityTerminal philosophy={hero.philosophy} />
            </motion.div>
          </div>
        </EditOverlay>

        <EditOverlay label="About" onEdit={() => setEditingAbout(true)}>
          <div className="mt-28 rounded-xl p-2">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
              <div className="mb-6 font-mono text-sm uppercase text-primary">// journey_log</div>
              <div className="grid gap-5 md:grid-cols-5">
                {journeyNodes.map((node, index) => (
                  <motion.div
                    key={node.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`surface rounded-xl border border-border/80 p-4 transition-transform hover:-translate-y-1 hover:border-primary/40 ${node.depth}`}
                  >
                    <div className="mb-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
                      <span>{node.stage}</span>
                      <span className="h-2 w-2 rounded-full bg-primary/70" />
                    </div>
                    <h3 className="mb-3 text-sm font-semibold text-foreground">{node.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{node.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative mt-24 overflow-hidden rounded-xl border border-border/80 bg-background/20 p-6"
            >
              <KnowledgeGraph />
              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="mb-4 font-mono text-sm uppercase text-primary">// systems_over_syntax</div>
                  <h2 className="mb-5 text-3xl font-bold text-foreground md:text-4xl">Systems over syntax.</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-lg">
                      Most developers focus on frameworks. I am increasingly interested in what happens underneath.
                    </p>
                    <p>
                      How requests flow. How databases scale. How systems fail. How architectures evolve. How software survives growth. How engineering decisions shape outcomes.
                    </p>
                    {bio.slice(0, 2).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <DepthPanel className="surface rounded-xl p-5">
                  <div className="mb-5 flex items-center gap-2 font-mono text-sm font-semibold text-foreground">
                    <Network className="h-5 w-5 text-primary" />
                    architecture.trace
                  </div>
                  <div className="relative h-64 rounded-lg border border-border bg-background/50">
                    <div className="absolute left-[14%] right-[13%] top-1/2 h-px bg-primary/30" />
                    <div className="absolute left-[34%] top-[31%] h-[78px] w-px rotate-45 bg-primary/20" />
                    <div className="absolute right-[26%] top-[34%] h-[82px] w-px -rotate-45 bg-primary/20" />
                    <motion.span
                      className="absolute left-[14%] top-1/2 h-1.5 w-1.5 rounded-full bg-accent"
                      animate={{ x: [0, 120, 230, 340], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {architectureConcepts.map(({ label, Icon, position }) => (
                      <div key={label} className={`absolute ${position} group`}>
                        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:text-foreground">
                          <Icon className="h-4 w-4 text-primary" />
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </DepthPanel>
              </div>
            </motion.div>

            <div className="mt-24 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="surface rounded-xl p-6">
                <div className="mb-6 flex items-center gap-2 font-mono text-sm font-semibold text-foreground">
                  <Terminal className="h-5 w-5 text-primary" />
                  engineering.mindset
                </div>
                <div className="space-y-6">
                  {philosophyItems.map((item) => (
                    <div key={item.title} className="border-l-2 border-primary/70 pl-4">
                      <h3 className="mb-2 font-mono text-sm uppercase text-primary">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
                <DepthPanel className="surface rounded-xl p-6">
                  <div className="mb-6 font-mono text-sm uppercase text-primary">// technical_evolution</div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {technicalEvolution.map((group) => (
                      <div key={group.category} className="rounded-lg border border-border bg-background/35 p-4 transition-transform hover:-translate-y-1 hover:border-primary/40">
                        <div className="mb-3 text-sm font-semibold text-foreground">{group.category}</div>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <span key={item} className="rounded-md border border-border bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </DepthPanel>
              </motion.div>
            </div>

            <div className="mt-20 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="surface glow rounded-xl border border-primary/20 bg-primary/5 p-6">
                <div className="mb-4 font-mono text-sm text-success">MISSION STATUS: ACTIVE</div>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">Current mission</h2>
                <p className="mb-5 text-muted-foreground">
                  Building software that combines full-stack engineering, AI capabilities, system design principles, and real-world problem solving.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Every project is an opportunity to understand how production systems are built, where they break, and how thoughtful engineering decisions make them more reliable.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }} className="surface rounded-xl p-6">
                <div className="mb-6 font-mono text-sm uppercase text-primary">// future_trajectory</div>
                <div className="space-y-3">
                  {trajectory.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className={index === 0 ? "h-2.5 w-2.5 rounded-full bg-primary" : "h-2.5 w-2.5 rounded-full border border-primary/60"} />
                      <span className={index === 0 ? "text-foreground" : "text-muted-foreground"}>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg border border-border bg-background/40 p-4 font-mono text-xs text-muted-foreground">
                  growth != title; growth == better judgment, clearer systems, and stronger execution
                </div>
              </motion.div>
            </div>
          </div>
        </EditOverlay>
      </div>
    </div>
  );
}
