
// tag: don't regression this feature
import React from 'react';
import { AgentProduct } from '../../../types';
import { EvaluationSandbox } from '../../EvaluationSandbox';

interface PreviewTabProps {
  agent: AgentProduct;
}

export const PreviewTab: React.FC<PreviewTabProps> = ({ agent }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <EvaluationSandbox agent={agent} />
      
      <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500 px-2 font-mono">
        <p>* Evaluation data is ephemeral and cleared upon session reset.</p>
        <p>OpenOps Evaluation Harness v1.0.4</p>
      </div>
    </div>
  );
};
