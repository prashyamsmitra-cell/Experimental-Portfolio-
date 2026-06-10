import { useState } from "react";
import { Link, useLocation } from "wouter";
import { X, Check } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { EditOverlay } from "@/components/EditOverlay";
import { motion } from "framer-motion";

function BrandEditDialog({ onClose }: { onClose: () => void }) {
  const { data, updateData } = useApp();
  const [text, setText] = useState(data.brandText);
  const save = () => {
    updateData((prev) => ({ ...prev, brandText: text }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="surface w-full max-w-sm rounded-xl border border-primary/30 p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold">Edit Brand Text</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="mb-4 w-full rounded border border-border bg-secondary px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            Cancel
          </button>
          <button onClick={save} className="flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 font-mono text-xs text-primary-foreground transition-colors hover:bg-primary/90">
            <Check className="h-3 w-3" /> Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function SiteNav() {
  const [location] = useLocation();
  const { data } = useApp();
  const [editingBrand, setEditingBrand] = useState(false);

  if (location.startsWith("/admin")) return null;

  const navLinks = [
    { href: "/", label: "About Me" },
    { href: "/projects", label: "Projects" },
    { href: "/certifications", label: "Certifications" },
    { href: "/lab", label: "Systems Lab" },
  ];

  return (
    <>
      {editingBrand && <BrandEditDialog onClose={() => setEditingBrand(false)} />}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <EditOverlay label="Brand" onEdit={() => setEditingBrand(true)}>
            <Link href="/" className="group flex items-center gap-2 rounded p-1">
              <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-sm font-semibold transition-colors group-hover:text-primary">
                {data.brandText}
              </span>
            </Link>
          </EditOverlay>
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = location === link.href || (link.href === "/" && location === "/about");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 font-mono text-sm transition-colors ${
                    isActive ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
