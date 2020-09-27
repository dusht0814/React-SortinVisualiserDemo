export function getMergeSortAnimations(array){
    const animations = [];
    if(array.length <=1)
    return array;
    const auxillaryArray = array.slice();
    mergeSortHelper(array,0,array.length-1,auxillaryArray,animations);
    return animations;
}


function mergeSortHelper (mainArray,startIdx,endIdx,auxillaryArray,animations){
    if(startIdx === endIdx)
        return;
    const middleIdx = Math.floor((endIdx +  startIdx)/2);
    mergeSortHelper(auxillaryArray,startIdx,middleIdx,mainArray,animations);
    mergeSortHelper(auxillaryArray,middleIdx+1,endIdx,mainArray,animations);
    doMerge(mainArray,startIdx,middleIdx,endIdx,auxillaryArray,animations);
}
 
function doMerge(mainArray,startIdx,middleIdx,endIdx,auxillaryArray,animations){
    let k=startIdx,i=startIdx,j=middleIdx+1;
    
    while(i <= middleIdx && j <= endIdx){
        animations.push([i,j]);
        animations.push([i,j]);
       

        if(auxillaryArray[i] < auxillaryArray[j]){
            animations.push([k, auxillaryArray[i]]);
            mainArray[k++] = auxillaryArray[i++];
        }
        else{
            animations.push([k, auxillaryArray[j]]);
            mainArray[k++] = auxillaryArray[j++];
        }
    }
   while(i<=middleIdx){
       animations.push([i,i]);
       animations.push([i,i]);
       animations.push([k,auxillaryArray[i]]);
       mainArray[k++] = auxillaryArray[i++];
   }
   while(j<=endIdx){
    animations.push([j,j]);
    animations.push([j,j]);
    animations.push([k,auxillaryArray[j]]);
    mainArray[k++] = auxillaryArray[j++];
    }
}


export function bubbleSort(array){
    const animations = [];
    if(array.length <=1)
         return array;
    
    let i=0,j=0;
    for(i=0; i < array.length - 1; i++){
        for(j=0; j < array.length - i - 1; j++){
            animations.push([j,j+1]);
            animations.push([j,j+1]);
            if (array[j] > array[j+1]){
                animations.push([j,array[j+1],j+1,array[j]]);
                [array[j],array[j+1]] = [array[j+1],array[j]];

            }
        }
    }
    return animations;

}


