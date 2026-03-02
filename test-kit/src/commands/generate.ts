import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { generateTests } from '../core/generate.js';
import { logger } from '../utils/logger.js';

export const generateCommand = new Command()
  .name('generate')
  .description('Generate example test files based on project structure')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .option('-t, --type <type>', 'Test type (unit|integration|e2e|all)', 'all')
  .action(async (options) => {
    const spinner = ora(chalk.cyan('✨ Generating test files...')).start();

    try {
      const result = await generateTests(options.dir, { type: options.type });

      spinner.succeed(chalk.green('✅ Tests generated successfully!'));
      console.log('\n' + chalk.bold('Generated Files:'));
      console.log(chalk.gray('─'.repeat(50)));
      result.files.forEach((file) => {
        console.log(chalk.green('  ✓ ') + chalk.gray(file));
      });

      await logger.logEvent('generate', {
        status: 'success',
        timestamp: new Date().toISOString(),
        type: options.type,
        files: result.files,
      });

      console.log(
        '\n' +
          chalk.blue('💡 Next: Run ') +
          chalk.bold('npm run test') +
          chalk.blue(' to execute tests')
      );
    } catch (error) {
      spinner.fail(chalk.red('❌ Test generation failed'));
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));

      await logger.logEvent('generate', {
        status: 'failed',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      });

      process.exit(1);
    }
  });
