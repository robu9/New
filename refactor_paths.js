const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('app/startup');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

try {
  const files = getAllFiles(rootDir);
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Calculate relative path to startup root
    const relToStartup = path.relative(path.dirname(file), rootDir);
    
    // Construct replacement paths
    // Force forward slashes for imports
    const componentsPath = path.join(relToStartup, '_components').replace(/\\/g, '/');
    const libPath = path.join(relToStartup, '_lib').replace(/\\/g, '/');
    
    // Replace imports
    // Regex for "@/components"
    content = content.replace(/@\/components/g, (match) => {
      return componentsPath.startsWith('.') ? componentsPath : './' + componentsPath;
    });
    
    // Regex for "@/lib"
    content = content.replace(/@\/lib/g, (match) => {
        return libPath.startsWith('.') ? libPath : './' + libPath;
    });

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  });
} catch (e) {
  console.log("Error processing files:", e);
}
