import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { auditTests } from '../core/audit';
import { logger } from '../utils/logger';

export const auditCommand = new Command()
  .name('audit')
  .description('Analyze test coverage and provide audit report')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    const spinner = ora(chalk.cyan('📊 Running audit...')).start();

    try {
      const result = await auditTests(options.dir);

      spinner.succeed(chalk.green('✅ Audit complete!'));
      console.log('\n' + chalk.bold('Coverage Summary:'));
      console.log(chalk.gray('─'.repeat(50)));

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        console.log(`  ${chalk.cyan('Unit Tests:')} ${result.coverage.unit}%`);
        console.log(`  ${chalk.cyan('Integration Tests:')} ${result.coverage.integration}%`);
        console.log(`  ${chalk.cyan('E2E Tests:')} ${result.coverage.e2e}%`);
        console.log(`  ${chalk.cyan('Overall:')} ${result.coverage.overall}%`);
      }

      await logger.logEvent('audit', {
        status: 'success',
        timestamp: new Date().toISOString(),
        coverage: result.coverage,
      });
    } catch (error) {
      spinner.fail(chalk.red('❌ Audit failed'));
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));

      await logger.logEvent('audit', {
        status: 'failed',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      });

      process.exit(1);
    }
  });
