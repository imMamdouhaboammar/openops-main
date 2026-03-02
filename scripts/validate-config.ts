#!/usr/bin/env ts-node

/**
 * OpenOps Studio - Configuration Validator
 * 
 * Validates all JSON configuration files across all 10 layers
 * Ensures proper structure, cross-references, and integration points
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    filesChecked: number;
    modulesValidated: number;
    integrationPointsVerified: number;
  };
}

interface ModuleConfig {
  module: {
    name: string;
    version: string;
    layer: string;
    code: string;
    description: string;
  };
  governance?: any;
  objectives?: string[];
  integration_points?: {
    imports_from?: string[];
    exports_to?: string[];
  };
  security_rules?: any;
}

class ConfigValidator {
  private rootDir: string;
  private result: ValidationResult;
  private allModules: Map<string, ModuleConfig>;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
    this.result = {
      valid: true,
      errors: [],
      warnings: [],
      stats: {
        filesChecked: 0,
        modulesValidated: 0,
        integrationPointsVerified: 0
      }
    };
    this.allModules = new Map();
  }

  /**
   * Main validation entry point
   */
  async validate(): Promise<ValidationResult> {
    console.log('🔍 Starting OpenOps Configuration Validation...\n');

    // Step 1: Discover all JSON config files
    await this.discoverModules();

    // Step 2: Validate each module structure
    await this.validateModuleStructures();

    // Step 3: Validate cross-references
    await this.validateIntegrationPoints();

    // Step 4: Validate naming conventions
    await this.validateNamingConventions();

    // Step 5: Generate report
    this.generateReport();

    return this.result;
  }

  /**
   * Discover all JSON configuration files
   */
  private async discoverModules(): Promise<void> {
    console.log('📂 Discovering modules...');

    const layers = [
      '00_governance',
      '01_orchestration',
      '02_agents',
      '03_product',
      '04_research',
      '05_architecture',
      '06_security',
      '07_tracking',
      '08_ux',
      '09_tooling',
      '10_legacy'
    ];

    for (const layer of layers) {
      const layerPath = path.join(this.rootDir, layer);

      if (!fs.existsSync(layerPath)) {
        this.result.warnings.push(`Layer directory not found: ${layer}`);
        continue;
      }

      const files = fs.readdirSync(layerPath);

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(layerPath, file);
          this.result.stats.filesChecked++;

          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const config: ModuleConfig = JSON.parse(content);

            // Store module for cross-reference validation
            const moduleKey = `${layer}/${file}`;
            this.allModules.set(moduleKey, config);

            console.log(`  ✓ Loaded: ${moduleKey}`);
          } catch (error) {
            this.result.errors.push(`Failed to parse ${layer}/${file}: ${error}`);
            this.result.valid = false;
          }
        }
      }
    }

    console.log(`\n✓ Discovered ${this.allModules.size} modules\n`);
  }

  /**
   * Validate module structure
   */
  private async validateModuleStructures(): Promise<void> {
    console.log('🔍 Validating module structures...');

    for (const [moduleKey, config] of this.allModules.entries()) {
      this.result.stats.modulesValidated++;

      // Check required fields
      if (!config.module) {
        this.result.errors.push(`${moduleKey}: Missing 'module' section`);
        this.result.valid = false;
        continue;
      }

      const required = ['name', 'version', 'layer', 'code', 'description'];
      for (const field of required) {
        if (!config.module[field as keyof typeof config.module]) {
          this.result.errors.push(`${moduleKey}: Missing module.${field}`);
          this.result.valid = false;
        }
      }

      // Validate version format (semver)
      if (config.module.version && !this.isValidSemver(config.module.version)) {
        this.result.warnings.push(`${moduleKey}: Invalid semver version`);
      }

      // Check for governance section
      if (!config.governance) {
        this.result.warnings.push(`${moduleKey}: Missing governance section`);
      }

      // Check for objectives
      if (!config.objectives || config.objectives.length === 0) {
        this.result.warnings.push(`${moduleKey}: No objectives defined`);
      }

      console.log(`  ✓ Validated: ${moduleKey}`);
    }

    console.log(`\n✓ Validated ${this.result.stats.modulesValidated} modules\n`);
  }

  /**
   * Validate integration points and cross-references
   */
  private async validateIntegrationPoints(): Promise<void> {
    console.log('🔗 Validating integration points...');

    for (const [moduleKey, config] of this.allModules.entries()) {
      if (!config.integration_points) {
        continue;
      }

      // Check imports_from references
      if (config.integration_points.imports_from) {
        for (const importRef of config.integration_points.imports_from) {
          this.result.stats.integrationPointsVerified++;

          const referenced = this.findModuleByName(importRef);
          if (!referenced) {
            this.result.warnings.push(
              `${moduleKey}: imports_from references non-existent module '${importRef}'`
            );
          } else {
            console.log(`  ✓ Valid import: ${moduleKey} ← ${importRef}`);
          }
        }
      }

      // Check exports_to references
      if (config.integration_points.exports_to) {
        for (const exportRef of config.integration_points.exports_to) {
          this.result.stats.integrationPointsVerified++;

          const referenced = this.findModuleByName(exportRef);
          if (!referenced) {
            this.result.warnings.push(
              `${moduleKey}: exports_to references non-existent module '${exportRef}'`
            );
          } else {
            console.log(`  ✓ Valid export: ${moduleKey} → ${exportRef}`);
          }
        }
      }
    }

    console.log(`\n✓ Verified ${this.result.stats.integrationPointsVerified} integration points\n`);
  }

  /**
   * Validate naming conventions
   */
  private async validateNamingConventions(): Promise<void> {
    console.log('📝 Validating naming conventions...');

    for (const [moduleKey, config] of this.allModules.entries()) {
      const fileName = path.basename(moduleKey, '.json');
      const expectedPattern = /^\d{2}[A-Z]?_[A-Za-z_]+$/;

      if (!expectedPattern.test(fileName)) {
        this.result.warnings.push(
          `${moduleKey}: File name doesn't follow convention {LayerCode}_{ModuleName}`
        );
      }

      // Check module code format
      if (config.module.code && !/^\d{2}[A-Z]?$/.test(config.module.code)) {
        this.result.warnings.push(
          `${moduleKey}: Module code '${config.module.code}' doesn't follow convention`
        );
      }

      console.log(`  ✓ Naming OK: ${moduleKey}`);
    }

    console.log('\n');
  }

  /**
   * Find module by name
   */
  private findModuleByName(name: string): ModuleConfig | undefined {
    for (const [key, config] of this.allModules.entries()) {
      if (config.module.name === name || key.includes(name)) {
        return config;
      }
    }
    return undefined;
  }

  /**
   * Validate semver format
   */
  private isValidSemver(version: string): boolean {
    const semverPattern = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/;
    return semverPattern.test(version);
  }

  /**
   * Generate validation report
   */
  private generateReport(): void {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 VALIDATION REPORT');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📈 Statistics:');
    console.log(`  • Files Checked: ${this.result.stats.filesChecked}`);
    console.log(`  • Modules Validated: ${this.result.stats.modulesValidated}`);
    console.log(`  • Integration Points Verified: ${this.result.stats.integrationPointsVerified}\n`);

    if (this.result.errors.length > 0) {
      console.log('❌ Errors:');
      this.result.errors.forEach(error => console.log(`  • ${error}`));
      console.log('');
    }

    if (this.result.warnings.length > 0) {
      console.log('⚠️  Warnings:');
      this.result.warnings.forEach(warning => console.log(`  • ${warning}`));
      console.log('');
    }

    if (this.result.valid && this.result.warnings.length === 0) {
      console.log('✅ VALIDATION PASSED - All configurations are valid!\n');
    } else if (this.result.valid) {
      console.log('⚠️  VALIDATION PASSED WITH WARNINGS\n');
    } else {
      console.log('❌ VALIDATION FAILED - Please fix errors above\n');
    }

    console.log('═══════════════════════════════════════════════════════════\n');
  }
}

// Main execution
async function main() {
  const rootDir = process.cwd();
  const validator = new ConfigValidator(rootDir);

  try {
    const result = await validator.validate();
    process.exit(result.valid ? 0 : 1);
  } catch (error) {
    console.error('❌ Validation failed with error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { ConfigValidator, ValidationResult };
