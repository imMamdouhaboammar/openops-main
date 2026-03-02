import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

export class FileSystem {
  static readFile(filePath: string): string {
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    return readFileSync(filePath, 'utf-8');
  }

  static readJSON<T>(filePath: string): T {
    const content = this.readFile(filePath);
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to parse JSON from ${filePath}: ${error}`);
    }
  }

  static writeFile(filePath: string, content: string): void {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content, 'utf-8');
  }

  static writeJSON<T>(filePath: string, data: T, pretty = true): void {
    const content = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
    this.writeFile(filePath, content);
  }

  static fileExists(filePath: string): boolean {
    return existsSync(filePath);
  }

  static normalizePath(filePath: string): string {
    return filePath.replace(/\\/g, '/');
  }

  static joinPaths(...paths: string[]): string {
    return join(...paths);
  }
}
