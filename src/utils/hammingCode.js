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

  static markErrors(data){
    let paritySum=[];
    
    for(let i = 1; i<=data.length; i++){
      
    }
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