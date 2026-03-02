import { readdirSync, statSync } from 'fs';
import { join } from 'path';

interface CodebaseMap {
  totalFiles: number;
  detectedModules: string[];
  timestamp: string;
  frameworks: string[];
  components: string[];
  services: string[];
}

/**
 * Analyze the codebase structure to build an intelligent map
 * Used by AI Scenario Designer to understand project architecture
 */
export async function analyzeCodebase(projectRoot = process.cwd()): Promise<CodebaseMap> {
  const files: string[] = [];
  const components: string[] = [];
  const services: string[] = [];
  const frameworks: Set<string> = new Set();

  function walk(dir: string, depth = 0) {
    if (depth > 5) return; // Prevent deep recursion

    try {
      for (const file of readdirSync(dir)) {
        const full = join(dir, file);
        const stat = statSync(full);

        if (file.startsWith('.') || file === 'node_modules') continue;

        if (stat.isDirectory()) {
          walk(full, depth + 1);
        } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
          const relativePath = full.replace(projectRoot, '');
          files.push(relativePath);

          // Categorize files
          if (/[Cc]omponent|[Pp]age/.test(file)) {
            components.push(relativePath);
          } else if (/[Ss]ervice|[Aa]gent|[Hh]andler/.test(file)) {
            services.push(relativePath);
          }

          // Detect frameworks from imports
          if (/react|vue|svelte|angular|next/.test(file.toLowerCase())) {
            if (/react/.test(file.toLowerCase())) frameworks.add('React');
            if (/vue/.test(file.toLowerCase())) frameworks.add('Vue');
            if (/svelte/.test(file.toLowerCase())) frameworks.add('Svelte');
            if (/angular/.test(file.toLowerCase())) frameworks.add('Angular');
          }
        }
      }
    } catch (err) {
      // Skip unreadable directories
    }
  }

  try {
    const srcPath = join(projectRoot, 'src');
    if (statSync(srcPath).isDirectory()) {
      walk(srcPath);
    } else {
      walk(projectRoot);
    }
  } catch {
    walk(projectRoot);
  }

  const map: CodebaseMap = {
    totalFiles: files.length,
    detectedModules: files.slice(0, 100), // Limit to 100 for performance
    timestamp: new Date().toISOString(),
    frameworks: Array.from(frameworks),
    components: components.slice(0, 50),
    services: services.slice(0, 50),
  };

  return map;
}
