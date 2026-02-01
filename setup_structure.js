const fs = require('fs');
const path = require('path');

const root = process.cwd();
const appDir = path.join(root, 'app');
const startupDir = path.join(appDir, 'startup');

if (!fs.existsSync(startupDir)) {
    fs.mkdirSync(startupDir, { recursive: true });
    console.log('Created app/startup');
}

function move(src, dest) {
    if (fs.existsSync(src)) {
        // If dest exists and is a directory, move src INSIDE dest?
        // No, standard fs.rename behavior: rename src to dest.
        // But if dest parent doesn't exist, it fails. startupDir exists.
        
        try {
            fs.renameSync(src, dest);
            console.log(`Moved ${src} -> ${dest}`);
        } catch (e) {
            console.error(`Error moving ${src} to ${dest}: ${e.message}`);
        }
    } else {
        console.log(`Source not found: ${src}`);
    }
}

// Move directories
move(path.join(appDir, '(auth)'), path.join(startupDir, '(auth)'));
move(path.join(appDir, '(marketing)'), path.join(startupDir, '(marketing)'));

// Move files
move(path.join(appDir, 'layout.tsx'), path.join(startupDir, 'layout.tsx'));
move(path.join(appDir, 'globals.css'), path.join(startupDir, 'globals.css'));

// Move and rename root dirs
move(path.join(root, 'components'), path.join(startupDir, '_components'));
move(path.join(root, 'lib'), path.join(startupDir, '_lib'));

console.log('Structure setup complete.');
