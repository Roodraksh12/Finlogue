const fs = require('fs');
const html = fs.readFileSync('form.html', 'utf8');

// The field definitions look like this:
// [1945144528,"Registered Venture Name ",null,0,[[31366759,...
const regex = /data-params="%\.@\.\[\d+,&quot;([^&]+)&quot;,null,\d+,\[\[(\d+)/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(`${match[1].trim()} -> entry.${match[2]}`);
}

// Alternatively, let's just find all entry. numbers to be safe if regex fails
const fallbackRegex = /\[\[(\d+),null/g;
let fallbackMatches = [];
while ((match = fallbackRegex.exec(html)) !== null) {
  fallbackMatches.push(match[1]);
}
console.log("\nAll possible entry IDs:", fallbackMatches.join(', '));
