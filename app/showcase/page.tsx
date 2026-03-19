import Image from "next/image";
import { Search, ChevronDown, Grid3X3, List, SlidersHorizontal } from "lucide-react";

// Mock data for prototyping
const mockProjects = [
  {
    title: "Sage",
    slug: "sage",
    category: "Web App",
    description: "A modern journaling platform with AI-powered insights and mood tracking.",
    skills: ["React", "TypeScript", "OpenAI", "Supabase"],
    image: "/images/projects/sage/mockup.webp",
    brandColor: "#3d5a4c",
  },
  {
    title: "Evergreen",
    slug: "evergreen",
    category: "Mobile App",
    description: "Sustainable living companion that helps track your environmental impact.",
    skills: ["React Native", "Node.js", "PostgreSQL"],
    image: "/images/projects/sage/mockup.webp",
    brandColor: "#2d645d",
  },
  {
    title: "Harvest",
    slug: "harvest",
    category: "Web App",
    description: "Farm-to-table marketplace connecting local farmers with consumers.",
    skills: ["Next.js", "Stripe", "Prisma", "Tailwind"],
    image: "/images/projects/sage/mockup.webp",
    brandColor: "#8b5a2b",
  },
  {
    title: "Pebble",
    slug: "pebble",
    category: "Design System",
    description: "A comprehensive design system for building accessible interfaces.",
    skills: ["Figma", "Storybook", "CSS"],
    image: "/images/projects/sage/mockup.webp",
    brandColor: "#6b5b4f",
  },
  {
    title: "Driftwood",
    slug: "driftwood",
    category: "CLI Tool",
    description: "A lightweight CLI for managing development environments.",
    skills: ["Rust", "Shell", "Docker"],
    image: "/images/projects/sage/mockup.webp",
    brandColor: "#5c4b3e",
  },
  {
    title: "Canopy",
    slug: "canopy",
    category: "Web App",
    description: "Team collaboration tool with real-time document editing.",
    skills: ["Vue.js", "WebSockets", "Redis"],
    image: "/images/projects/sage/mockup.webp",
    brandColor: "#2f6f31",
  },
];

const filterTags = ["All", "Web App", "Mobile App", "Design System", "CLI Tool", "Open Source"];
const sortOptions = ["Most Recent", "Oldest First", "A-Z", "Z-A"];

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-content-px py-4">
          <h1 className="font-mazaeni text-2xl font-semibold text-foreground">
            Component Showcase
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Prototyping UI components for the portfolio
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-content-px py-8">
        {/* Section: Project List View */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-primary" />
            <h2 className="font-mazaeni text-xl font-semibold text-foreground">
              Project List View
            </h2>
          </div>

          {/* Search & Filter Bar - YouTube Style */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="h-12 w-full rounded-full border border-border bg-card pl-12 pr-4 text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <button className="flex h-12 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium text-card-foreground transition-colors hover:bg-tertiary">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Filter Pills - YouTube Style Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {filterTags.map((tag, i) => (
                <button
                  key={tag}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Sort & View Toggle Row */}
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">6</span> projects found
              </p>
              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-tertiary">
                  <span>Most Recent</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {/* View Toggle */}
                <div className="flex rounded-lg border border-border bg-card p-1">
                  <button className="rounded-md bg-primary p-2 text-primary-foreground">
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground">
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid View - Compact Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mockProjects.map((project) => (
              <CompactProjectCard key={project.slug} {...project} />
            ))}
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-border" />

          {/* Alternative: List View */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-accent" />
              <h2 className="font-mazaeni text-xl font-semibold text-foreground">
                List View Variant
              </h2>
            </div>
            <div className="space-y-3">
              {mockProjects.slice(0, 4).map((project) => (
                <ListProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* Compact Card for Grid View */
function CompactProjectCard({
  title,
  category,
  description,
  skills,
  image,
  brandColor,
}: {
  title: string;
  category: string;
  description: string;
  skills: string[];
  image: string;
  brandColor: string;
}) {
  return (
    <article className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image */}
      <div
        className="relative aspect-video overflow-hidden"
        style={{ backgroundColor: brandColor }}
      >
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge */}
        <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {category}
        </span>
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="font-mazaeni text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {/* Skills - show first 3 */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-tertiary px-2.5 py-1 text-xs font-medium text-tertiary-foreground"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="rounded-full bg-tertiary px-2.5 py-1 text-xs font-medium text-muted-foreground">
              +{skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* List Card for List View */
function ListProjectCard({
  title,
  category,
  description,
  skills,
  image,
  brandColor,
}: {
  title: string;
  category: string;
  description: string;
  skills: string[];
  image: string;
  brandColor: string;
}) {
  return (
    <article className="group flex cursor-pointer gap-4 rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-300 hover:shadow-card-hover sm:gap-5 sm:p-4">
      {/* Thumbnail */}
      <div
        className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg sm:w-48"
        style={{ backgroundColor: brandColor }}
      >
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {category}
          </span>
        </div>
        <h3 className="mt-1 truncate font-mazaeni text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
          {title}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground sm:line-clamp-2">
          {description}
        </p>
        {/* Skills - hidden on mobile, shown on larger */}
        <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-tertiary px-2 py-0.5 text-xs font-medium text-tertiary-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
