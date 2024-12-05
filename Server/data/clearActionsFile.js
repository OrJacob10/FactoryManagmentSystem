const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'actionsTracker.json');

const clearActionsArray = () => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (Array.isArray(data.actions)) {
            data.actions = [];
        } else {
            console.log('No "actions" array found in the JSON file.');
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log('Actions array in JSON file cleared.');
    } catch (error) {
        console.error('Error clearing actions array:', error);
    }
};

module.exports = clearActionsArray;
