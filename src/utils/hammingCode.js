class HammingCodingService {

  static execCoding(data){
    let convertedData=[];
    let convertedDataPointer=1;

    let paritySum=[];

    let currentChar=data.length;
    let currentPower=1;

    while(currentChar>0){
      if(convertedDataPointer===currentPower){
        convertedData.push(0);
        paritySum.push(0);
        currentPower*=2;
      }
      else
      {
        convertedData.push(data[currentChar-1]);
        currentChar--;
      }

      convertedDataPointer++;
    }

    for(currentChar=1;currentChar<=convertedData.length;currentChar++){
      for(let i =0;i<paritySum.length;i++)
      {
        if((+currentChar).toString(2).charAt(i)==='1') paritySum[i]++;
      }
    }
    
    for(let i =0;i<paritySum.length;i++)
    {
      if(paritySum[i]%2!==0) convertedData[Math.pow(2,i)-1]=1;
    }

    return convertedData.reverse().toString().replace(/,/g, '');
  }

  static execDecoding(decodedData){

    return decodedData;
  }

  static fixErrors(data){
    let errorCode = HammingCodingService.findErrors(data);
    let errorPosition=0;

    for(let i = 1;i<=data.length;i++){
      if(errorCode[i]===1) errorPosition++;
    }

    if(errorCode!==0){
      errorPosition=data.length-errorPosition;
      data=data.split("");
      
      if(data[errorPosition]==="1") data[errorPosition]="0"; else data[errorPosition]="1";
      return data.toString().replace(/,/g, '');
    }
    return;
  }

  static findErrors(data){
    let paritySum=[];
    let currentPower=1;
    
    while(currentPower<=data.length){
      paritySum.push(0);
      currentPower*=2;
    }

    for(let i=data.length;i>0;i--){
      for(let j =0;j<paritySum.length;j++)
      {
        if(data.charAt(j)==='1') paritySum[j]++;
      }
    }

    for(let i =0;i<paritySum.length;i++)
    {
      paritySum[i]%2!==0 ? paritySum[i]=1 : paritySum[i]=1;
    }

    return paritySum;
  }
  
  static removeRedundancy(data){
    let currentPower=1;
    let pointer=1;

    for(let i=data.length;i>0;i++){
      if(pointer===currentPower){
        data = data.slice(0, i) + data.slice(i);
      }
    }

    return data;
  }

  static convertBin(val){
    return (+val).toString(2);
  }

  static testFunc() {
    return 'ziemniak';
  }
}

export default HammingCodingService;