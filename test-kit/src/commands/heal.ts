import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { healTests } from '../core/heal.js';
import { logger } from '../utils/logger.js';

export const healCommand = new Command()
  .name('heal')
  .description('Auto-heal failing tests using AI assistance')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .option('--ai-model <model>', 'AI model to use (gpt-4, claude-3, etc.)', 'claude-3')
  .action(async (options) => {
    const spinner = ora(chalk.cyan('🔧 Healing tests...')).start();

    try {
      const result = await healTests(options.dir, {
        aiModel: options.aiModel,
      });

      spinner.succeed(chalk.green('✅ Healing process complete!'));
      console.log('\n' + chalk.bold('Results:'));
      console.log(chalk.gray('─'.repeat(50)));
      console.log(chalk.cyan('  Tests Healed: ') + chalk.bold(result.healed));
      console.log(chalk.cyan('  Tests Skipped: ') + chalk.bold(result.skipped));
      console.log(chalk.cyan('  Errors: ') + chalk.bold(result.errors));

      await logger.logEvent('heal', {
        status: 'success',
        timestamp: new Date().toISOString(),
        healed: result.healed,
        skipped: result.skipped,
        errors: result.errors,
      });

      console.log(
        '\n' +
          chalk.blue('💡 Next: Run ') +
          chalk.bold('npm run test') +
          chalk.blue(' to verify healed tests')
      );
    } catch (error) {
      spinner.fail(chalk.red('❌ Healing failed'));
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));

      await logger.logEvent('heal', {
        status: 'failed',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      });

      process.exit(1);
    }
  });
