const fs = require('fs');
const path = require('path');

// Function to recursively find all sources.ts files
function findSourcesFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findSourcesFiles(filePath, fileList);
    } else if (file === 'sources.ts') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix a sources.ts file
function fixSourcesFile(filePath) {
  console.log(`Fixing ${filePath}...`);
  
  // Read the file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file already uses the new approach
  if (content.includes('// Import the component and module files')) {
    console.log(`  Already fixed, skipping.`);
    return;
  }
  
  // Get the directory of the file
  const dir = path.dirname(filePath);
  
  // Check if template.html exists
  const templatePath = path.join(dir, 'template.html');
  let templateContent = '';
  if (fs.existsSync(templatePath)) {
    templateContent = fs.readFileSync(templatePath, 'utf8');
  }
  
  // Create the new content
  let newContent = `// Import the component and module files
import * as component from './component';
import * as moduleFile from './module';

// Create a function to convert the imported module to a string
function moduleToString(mod: any): string {
  return mod.toString();
}

`;

  // Add template content if it exists
  if (templateContent) {
    newContent += `// HTML content as a string
const templateHtml = \`${templateContent.replace(/`/g, '\\`')}\`;

`;
  }

  // Add the sources export
  newContent += `// Use static content for the sources
export const sources = [
  {
    filename: 'component.ts',
    contents: {
      raw: { default: moduleToString(component) },
      highlighted: { default: moduleToString(component) },
    },
  },`;

  // Add template if it exists
  if (templateContent) {
    newContent += `
  {
    filename: 'template.html',
    contents: {
      raw: { default: templateHtml },
      highlighted: { default: templateHtml },
    },
  },`;
  }

  // Add module
  newContent += `
  {
    filename: 'module.ts',
    contents: {
      raw: { default: moduleToString(moduleFile) },
      highlighted: { default: moduleToString(moduleFile) },
    },
  },
];
`;

  // Write the new content to the file
  fs.writeFileSync(filePath, newContent);
  console.log(`  Fixed successfully.`);
}

// Main function
function main() {
  const demosDir = path.join(__dirname, 'projects', 'demos', 'app', 'demo-modules');
  const sourcesFiles = findSourcesFiles(demosDir);
  
  console.log(`Found ${sourcesFiles.length} sources.ts files.`);
  
  sourcesFiles.forEach(filePath => {
    try {
      fixSourcesFile(filePath);
    } catch (error) {
      console.error(`Error fixing ${filePath}:`, error);
    }
  });
  
  console.log('Done!');
}

main();