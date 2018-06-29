import {Server} from '../../models/server';

const equal = require('fast-deep-equal');

export class TableHelpers  {
    updateTableData(old_data: Server[], new_data: Server[]) {
      for (let i = 0; i < old_data.length; i++) {
        for (let j = 0; j < new_data.length; j++) {
          if (!equal(old_data[i], new_data[j])) {
            old_data[i] = new_data[j];
          }
        }
      }
    }
}
