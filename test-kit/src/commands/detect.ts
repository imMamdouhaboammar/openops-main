import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { detectStack } from '../core/detect.js';
import { logger } from '../utils/logger.js';

export const detectCommand = new Command()
  .name('detect')
  .description('Detect project tech stack (framework, test runner, etc.)')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .action(async (options) => {
    const spinner = ora(chalk.cyan('🔍 Detecting project stack...')).start();

    try {
      const result = await detectStack(options.dir);

      spinner.succeed(chalk.green('✅ Stack detected successfully!'));
      console.log('\n' + chalk.bold('Detected Stack:'));
      console.log(chalk.gray('─'.repeat(50)));
      console.table(result);

      await logger.logEvent('detect', {
        status: 'success',
        timestamp: new Date().toISOString(),
        stack: result,
      });

      console.log(
        '\n' +
          chalk.blue('💡 Next: Run ') +
          chalk.bold('test-kit scaffold') +
          chalk.blue(' to set up test configuration')
      );
    } catch (error) {
      spinner.fail(chalk.red('❌ Detection failed'));
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));

      await logger.logEvent('detect', {
        status: 'failed',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      });

      process.exit(1);
    }
  });
