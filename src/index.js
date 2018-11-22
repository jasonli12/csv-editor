const PapaParse = require('papaparse');
const fs = require('fs');

class UserFunctions {
  constructor() {
    this.data = {};
  }

  read(path, tableName) {
    const file = fs.createReadStream(path);
    PapaParse.parse(file, {
      delimiter: ",",
      header: true,
      dynamicTyping: true,
      complete: (results) => {
      	console.log("Parsing complete:", results);
        console.log(tableName);
        this.data[tableName] = results.data;
      }
    })
  }

}
module.exports = {
  UserFunctions: UserFunctions
};
