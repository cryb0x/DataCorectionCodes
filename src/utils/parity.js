import { arrayIntoChunks } from './utils'

// byte size of letter
export const LETTER_SIZE = 8;

class ParityService {
  static testFunc() {
    return 'ziemniak';
  }

  static encode(bytecode) {
    const letters = arrayIntoChunks(bytecode.split(''), LETTER_SIZE);

    return letters.map((letter) => {
      let onesCount = 0;
      letter.forEach((byte) => {
        if (byte === '0') onesCount++;
      })
      const parityByte = (onesCount % 2) ? 1 : 0;
      return `${letter.join('')}${parityByte}`
    }).join('');
  }

  static findErrors(bytecode) {
    const letters = arrayIntoChunks(bytecode.split(''), LETTER_SIZE + 1);

    return letters.map((letter) => {
      const parityByte = letter.pop();

      let onesCount = 0;
      letter.forEach((byte) => {
        if (byte === '0') onesCount++;
      });

      const checkedParityByte = (onesCount % 2) ? '1' : '0';

      return parityByte === checkedParityByte ? 0 : 1;
    })
  }
}

export default ParityService;