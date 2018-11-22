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
        this.data[tableName] = results.data;
      }
    })
  }

  createNewCol(tableName, newColumnName, transformer) {
    if (!this.data[tableName]) {
      throw new Error(`Table ${tableName} does not exist`);
    }
    this.data[tableName].map(row => addProperty(row, newColumnName, transformer))
  }
}

const addProperty = (row, newColumnName, transformer) => {
  typeof transformer === 'function' ? row[newColumnName] = transformer(row) : row[newColumnName] = transformer;
  return row;
}

module.exports = {
  UserFunctions: UserFunctions
};
