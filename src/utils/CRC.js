import { arrayIntoChunks } from "./utils";
import { LETTER_SIZE } from "./parity";

const CRC_TYPES = {
  "crc16reverse": {
    POLYNOMIAL: 0x14003,
    KEY_LENGTH: 16,
  },
  "crc16": {
    POLYNOMIAL: 0x18005,
    KEY_LENGTH: 16
  },
  "crc32": {
    POLYNOMIAL: 0x104c11db7,
    KEY_LENGTH: 32,
  }
};

function arrayCopy(src_table, src_start, dest_table, dest_start, length) {
  for (let i = 0; i < length; i++) {
    dest_table[dest_start + i] = src_table[src_start + i];
  }

  return dest_table;
}

function initTable(table) {
  for (let i = 0; i < table.length; i++)
    table[i] = 0;
  return table;
}

class CRCService {

  static encode(data, type = 'crc16') {
    const { KEY_LENGTH } = CRC_TYPES[type];
    data = data.split('').map((byte) => parseInt(byte, 10));

    let n = data.length,
      l = n + KEY_LENGTH;

    let codedData = new Array(l),
      dataType = new Array(l);

    codedData = initTable(codedData);
    codedData = arrayCopy(data, 0, codedData, KEY_LENGTH, n);
    let crc = this.countCRC(data, type);
    codedData = arrayCopy(crc, 0, codedData, 0, KEY_LENGTH);
    Array.from(Array(KEY_LENGTH).keys()).forEach((el, i) => dataType[i] = 3);
    Array.from(Array(l).keys()).forEach((el, i) => dataType[KEY_LENGTH + i] = 0);

    return codedData.join('');
  }

  static decode(data, type = 'crc16') {
    const { KEY_LENGTH } = CRC_TYPES[type];
    const decodedData = new Array(data.length - KEY_LENGTH);

    data = data.split('').map((byte) => parseInt(byte, 10));
    for (let i = 0; i < (data.length - KEY_LENGTH); i++)
    decodedData[i] = data[i + KEY_LENGTH];

    return decodedData.join('');
  }

  static countCRC(data, type = 'crc16') {
    const { POLYNOMIAL, KEY_LENGTH } = CRC_TYPES[type];
    let crc = new Array(KEY_LENGTH)
    let temp = new Array(data.length + KEY_LENGTH);
    let debug = '';

    data = (typeof data === 'string') ? data.split('').map((byte) => parseInt(byte, 10)) : data;

    initTable(temp);
    initTable(crc);

    temp = arrayCopy(data, 0, temp, KEY_LENGTH, data.length);
    let tKey = new Array(KEY_LENGTH + 1);
    for (let i = 0; i < KEY_LENGTH + 1; i++) {
      debug += POLYNOMIAL & (1 << i) + '\n';
      if ((POLYNOMIAL & (1 << i)) === 0) tKey[i] = 0;
      else tKey[i] = 1;
    }

    let start = data.length + KEY_LENGTH - 1;
    for (start; start > KEY_LENGTH - 1; start--) {
      if (temp[start] === 1) {
        for (let i = 0; i < KEY_LENGTH + 1; i++) {
          temp[start - i] = temp[start - i] ^ tKey[KEY_LENGTH - i];
        }
      }
    }

    return arrayCopy(temp, 0, crc, 0, KEY_LENGTH);
  }

  static fix(data, type = 'crc16') {
    const { KEY_LENGTH } = CRC_TYPES[type];
    let errors = 0;
    let dataType = new Array(data.length);

    data = data.split('').map((byte) => parseInt(byte, 10));
    let crc = this.countCRC(data, type);
    let valid = true, iValid = [];

    crc.forEach((byte, i) => {
      if (byte === 1) {
        valid = false;
      }
    });

    return data.join('');
  }

  static findErrors(dataRecieved, dataSended) {
    let errors = [];
    if (dataRecieved.length !== dataSended.length)
      return -1;
    for (var i = 0; i < dataRecieved.length; i++) {
      if (dataRecieved[i] !== dataSended[i])
        errors.push(dataRecieved[i])
    }
    return errors.join(',');
  }

  static removeRedundancy() {
    return 'N/A';
  }

  static testFunc() {
    return 'ziemniak';
  }
}

export { CRCService, CRC_TYPES };