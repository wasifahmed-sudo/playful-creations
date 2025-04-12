
import React from 'react';
import CodeFragment from './CodeFragment';
import { codeFragments } from './constants';

interface CodeFragmentsContainerProps {
  active: boolean;
}

const CodeFragmentsContainer: React.FC<CodeFragmentsContainerProps> = ({ active }) => {
  if (!active) return null;
  
  return (
    <>
      {codeFragments.map((code, index) => (
        <CodeFragment 
          key={`code-${index}`} 
          code={code} 
          index={index} 
          active={active} 
        />
      ))}
    </>
  );
};

export default CodeFragmentsContainer;
