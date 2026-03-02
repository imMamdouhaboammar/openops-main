import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { runLoop } from '../core/orchestrator.js';
import { logger } from '../utils/logger.js';

export const loopCommand = new Command()
  .name('loop')
  .description('Run complete agentic testing cycle (detect → scaffold → generate → audit → heal)')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .option('-i, --iterations <num>', 'Number of iterations', '1')
  .action(async (options) => {
    const spinner = ora(chalk.cyan('🔄 Starting agentic testing loop...')).start();

    try {
      const iterations = parseInt(options.iterations, 10);
      const result = await runLoop(options.dir, { iterations });

      spinner.succeed(chalk.green('✅ Agentic loop complete!'));
      console.log('\n' + chalk.bold('Loop Summary:'));
      console.log(chalk.gray('─'.repeat(50)));
      console.log(chalk.cyan('  Iterations: ') + chalk.bold(result.iterationsCompleted));
      console.log(chalk.cyan('  Tests Generated: ') + chalk.bold(result.testCount));
      console.log(chalk.cyan('  Coverage: ') + chalk.bold(result.coverageImprovement + '%'));

      await logger.logEvent('loop', {
        status: 'success',
        timestamp: new Date().toISOString(),
        iterations: result.iterationsCompleted,
        testCount: result.testCount,
        coverageImprovement: result.coverageImprovement,
      });

      console.log('\n' + chalk.blue('✨ Testing infrastructure is now optimized!'));
    } catch (error) {
      spinner.fail(chalk.red('❌ Loop execution failed'));
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));

      await logger.logEvent('loop', {
        status: 'failed',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      });

      process.exit(1);
    }
  });
