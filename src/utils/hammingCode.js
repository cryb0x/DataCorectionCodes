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

    currentPower=1;
    let sumPointer=0;
    while(currentPower<=convertedData.length){
      let i=currentPower-1;
      let skip=false;
      let skipVal=0;

      while(i<convertedData.length)
      {

        if(skip){
          skipVal--;
          if(skipVal<=0) skip=false;
        }
        else{
          if(convertedData[i]==='1') paritySum[sumPointer]++;
          skipVal++;
          if(skipVal>=currentPower) skip=true;
        }
        i++;
      }

      sumPointer++;
      currentPower*=2;
    }

    for(let i =0;i<paritySum.length;i++)
    {
      if(paritySum[i]%2===1) convertedData[Math.pow(2,i)-1]=1;
    }
    return convertedData.reverse().toString().replace(/,/g, '');
  }

  static execDecoding(decodedData){

    return decodedData;
  }

  static fixErrors(data){
    let errorCode = HammingCodingService.findErrors(data);
    let errorPosition=0;

    for(let i = 0;i<data.length;i++){
      if(errorCode[i]===1) errorPosition+=Math.pow(2,i);
    }

    if(errorPosition!==0){
      data=data.split("");
      errorPosition=data.length-errorPosition;
      if(data[errorPosition]==="1") data[errorPosition]="0"; else data[errorPosition]="1";
      return data.toString().replace(/,/g, '');
    }
    return data;
  }

  static findErrors(data){
    let paritySum=[];
    let currentPower=1;

    while(currentPower<=data.length){
      let sum=0;

      let i=data.length-currentPower;
      
      let skip=false;
      let skipVal=0;

      while(i>=0){
        if(skip){
          skipVal--;
          if(skipVal===0) skip=false;
        }
        else{
          if(data.charAt(i)==='1') sum++;
          skipVal++;
          if(skipVal===currentPower) skip=true;
        }
        i--;
      }

      paritySum.push(sum);
      currentPower*=2;
    }

    for(let i =0;i<paritySum.length;i++)
    {
      if(paritySum[i]%2===1)  paritySum[i]=1; else paritySum[i]=0;
    }

    return paritySum;
  }


  static removeRedundancy(data){
    let currentPower=1;
    let pointer=1;

    for(let i=data.length;i>0;i--){
      if(pointer===currentPower){
        data = data.slice(0, i-1) + data.slice(i);
        currentPower*=2;
      }
      pointer++;
    }

    return data;
  }

  static testFunc() {
    return 'ziemniak';
  }
}

export default HammingCodingService;