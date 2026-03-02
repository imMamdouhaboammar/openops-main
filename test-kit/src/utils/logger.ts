import chalk from 'chalk';
import { mkdirSync } from 'fs';
import { appendFileSync } from 'fs';
import { join } from 'path';

interface LogEvent {
  command: string;
  status: 'success' | 'failed';
  timestamp: string;
  [key: string]: any;
}

class Logger {
  private logsDir: string;

  constructor() {
    this.logsDir = join(process.cwd(), '.test-kit', 'logs');
    mkdirSync(this.logsDir, { recursive: true });
  }

  async logEvent(command: string, data: any): Promise<void> {
    const event: LogEvent = {
      command,
      status: data.status || 'unknown',
      timestamp: data.timestamp || new Date().toISOString(),
      ...data,
    };

    const eventsFile = join(this.logsDir, 'events.json');

    try {
      // Append to events log
      const line = JSON.stringify(event) + '\n';
      appendFileSync(eventsFile, line);
    } catch (error) {
      console.error(chalk.red(`Failed to log event: ${error}`));
    }
  }

  info(message: string): void {
    console.log(chalk.blue(`ℹ️  ${message}`));
  }

  success(message: string): void {
    console.log(chalk.green(`✅ ${message}`));
  }

  error(message: string): void {
    console.log(chalk.red(`❌ ${message}`));
  }

  warn(message: string): void {
    console.log(chalk.yellow(`⚠️  ${message}`));
  }
}

export const logger = new Logger();
