#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { detectCommand } from '../src/commands/detect.js';
import { scaffoldCommand } from '../src/commands/scaffold.js';
import { generateCommand } from '../src/commands/generate.js';
import { auditCommand } from '../src/commands/audit.js';
import { healCommand } from '../src/commands/heal.js';
import { loopCommand } from '../src/commands/loop.js';
import { runScenarioDesigner } from '../src/ai/scenario-designer/index.js';

// Banner
console.log(
  chalk.cyan(
    figlet.textSync('Test-Kit', {
      horizontalLayout: 'default',
      verticalLayout: 'default',
    })
  )
);
console.log(chalk.blue('═══════════════════════════════════════════════'));
console.log(chalk.bold.green('Test-Kit v0.1-alpha — AI Testing Made Easy'));
console.log(chalk.blue('═══════════════════════════════════════════════\n'));

const program = new Command();

program
  .name('test-kit')
  .description('AI-assisted testing framework for Vibe Coders')
  .version('0.1.0-alpha')
  .usage('[command] [options]');

// Register commands
program.addCommand(detectCommand);
program.addCommand(scaffoldCommand);
program.addCommand(generateCommand);
program.addCommand(auditCommand);
program.addCommand(healCommand);
program.addCommand(loopCommand);

// AI Scenario Designer command
program
  .command('ai:plan')
  .description('🧠 Run AI Scenario Designer to imagine test scenarios')
  .option('--enable-ai', 'Enable real AI provider (requires API keys)', false)
  .action(async (options) => {
    await runScenarioDesigner(options.enableAi);
  });

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (process.argv.length < 3) {
  program.outputHelp();
}
