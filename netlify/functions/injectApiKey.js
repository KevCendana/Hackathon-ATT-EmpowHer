const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyABc0tIF5O7gavsJISQZXoQW96kPCGIk9g';

console.log("injecting Google Maps API key into index.html");

fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
        console.error('error reading index.html:', err);
        return;
    }

    const result = data.replace('GOOGLE_MAPS_KEY_PLACEHOLDER', apiKey);

    fs.writeFile(indexPath, result, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('error writing to index.html:', writeErr);
        }
    });
});
