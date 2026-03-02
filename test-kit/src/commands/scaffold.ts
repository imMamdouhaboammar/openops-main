import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { scaffold } from '../core/scaffold.js';
import { logger } from '../utils/logger.js';

export const scaffoldCommand = new Command()
  .name('scaffold')
  .description('Create .test-kit/ folder with configurations and templates')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .option('-f, --force', 'Overwrite existing configuration')
  .action(async (options) => {
    const spinner = ora(chalk.cyan('🧩 Scaffolding .test-kit/ folder...')).start();

    try {
      const result = await scaffold(options.dir, { force: options.force });

      spinner.succeed(chalk.green('✅ Scaffolding complete!'));
      console.log('\n' + chalk.bold('Created:'));
      console.log(chalk.gray('─'.repeat(50)));
      result.created.forEach((file) => {
        console.log(chalk.green('  ✓ ') + chalk.gray(file));
      });

      await logger.logEvent('scaffold', {
        status: 'success',
        timestamp: new Date().toISOString(),
        created: result.created,
      });

      console.log(
        '\n' +
          chalk.blue('💡 Next: Run ') +
          chalk.bold('test-kit generate') +
          chalk.blue(' to create example tests')
      );
    } catch (error) {
      spinner.fail(chalk.red('❌ Scaffolding failed'));
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));

      await logger.logEvent('scaffold', {
        status: 'failed',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      });

      process.exit(1);
    }
  });
