@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  /* Using CETYS Universidad official brand colors - Yellow, Gray, White */
  --background: oklch(0.99 0 0); /* White background */
  --foreground: oklch(0.35 0 0); /* Dark gray/charcoal */
  --card: oklch(0.99 0 0); /* White */
  --card-foreground: oklch(0.35 0 0); /* Dark gray */
  --popover: oklch(0.99 0 0); /* White */
  --popover-foreground: oklch(0.35 0 0); /* Dark gray */
  /* Primary color is now CETYS yellow/gold */
  --primary: oklch(0.85 0.15 95); /* CETYS Yellow #FFD100 */
  --primary-foreground: oklch(0.2 0 0); /* Black text on yellow */
  --secondary: oklch(0.95 0 0); /* Light gray */
  --secondary-foreground: oklch(0.35 0 0); /* Dark gray */
  --muted: oklch(0.96 0 0); /* Very light gray */
  --muted-foreground: oklch(0.5 0 0); /* Medium gray */
  --accent: oklch(0.85 0.15 95); /* CETYS Yellow accent */
  --accent-foreground: oklch(0.2 0 0); /* Black */
  --destructive: oklch(0.5 0.2 30); /* Red for delete */
  --destructive-foreground: oklch(1 0 0); /* White */
  --border: oklch(0.8 0 0); /* Light gray border */
  --input: oklch(0.96 0 0); /* Light gray */
  --ring: oklch(0.85 0.15 95); /* CETYS Yellow */
  --chart-1: oklch(0.85 0.15 95); /* CETYS Yellow */
  --chart-2: oklch(0.35 0 0); /* Dark gray */
  --chart-3: oklch(0.65 0 0); /* Medium gray */
  --chart-4: oklch(0.99 0 0); /* White */
  --chart-5: oklch(0.2 0 0); /* Black */
  --radius: 0.5rem;
  --sidebar: oklch(0.99 0 0); /* White */
  --sidebar-foreground: oklch(0.35 0 0); /* Dark gray */
  --sidebar-primary: oklch(0.85 0.15 95); /* CETYS Yellow */
  --sidebar-primary-foreground: oklch(0.2 0 0); /* Black */
  --sidebar-accent: oklch(0.95 0 0); /* Light gray */
  --sidebar-accent-foreground: oklch(0.35 0 0); /* Dark gray */
  --sidebar-border: oklch(0.8 0 0); /* Light gray */
  --sidebar-ring: oklch(0.85 0.15 95); /* CETYS Yellow */
}

.dark {
  /* Dark mode with CETYS yellow as accent */
  --background: oklch(0.15 0 0); /* Very dark gray */
  --foreground: oklch(0.99 0 0); /* White */
  --card: oklch(0.2 0 0); /* Dark gray */
  --card-foreground: oklch(0.99 0 0); /* White */
  --popover: oklch(0.2 0 0); /* Dark gray */
  --popover-foreground: oklch(0.99 0 0); /* White */
  --primary: oklch(0.85 0.15 95); /* CETYS Yellow */
  --primary-foreground: oklch(0.2 0 0); /* Black */
  --secondary: oklch(0.25 0 0); /* Dark gray */
  --secondary-foreground: oklch(0.99 0 0); /* White */
  --muted: oklch(0.25 0 0); /* Dark gray */
  --muted-foreground: oklch(0.65 0 0); /* Light gray */
  --accent: oklch(0.85 0.15 95); /* CETYS Yellow */
  --accent-foreground: oklch(0.2 0 0); /* Black */
  --destructive: oklch(0.5 0.2 30); /* Red */
  --destructive-foreground: oklch(1 0 0); /* White */
  --border: oklch(0.3 0 0); /* Dark gray */
  --input: oklch(0.25 0 0); /* Dark gray */
  --ring: oklch(0.85 0.15 95); /* CETYS Yellow */
  --chart-1: oklch(0.85 0.15 95); /* CETYS Yellow */
  --chart-2: oklch(0.35 0 0); /* Dark gray */
  --chart-3: oklch(0.65 0 0); /* Medium gray */
  --chart-4: oklch(0.99 0 0); /* White */
  --chart-5: oklch(0.2 0 0); /* Black */
  --sidebar: oklch(0.15 0 0); /* Very dark gray */
  --sidebar-foreground: oklch(0.99 0 0); /* White */
  --sidebar-primary: oklch(0.85 0.15 95); /* CETYS Yellow */
  --sidebar-primary-foreground: oklch(0.2 0 0); /* Black */
  --sidebar-accent: oklch(0.25 0 0); /* Dark gray */
  --sidebar-accent-foreground: oklch(0.99 0 0); /* White */
  --sidebar-border: oklch(0.3 0 0); /* Dark gray */
  --sidebar-ring: oklch(0.85 0.15 95); /* CETYS Yellow */
}

@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
