const fs = require('fs');
const show = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (error, data) => {
            if (error) {
                reject("lah kok error");
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = show