import React from 'react';
import './Visualiser.css';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms';
export default class Visualiser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array: [],
        };
    }

    
    componentDidMount(){
        this.resetArray1();
    }

    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        for(let i =0;i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i%3 !== 2 ;
            
            if(isColorChange){
                const [barOneIdx,barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
               const color =  i%3 === 0 ? 'red' : 'turqoise';
               setTimeout(()=>{
                   barOneStyle.backgroundColor = color;
                   barTwoStyle.backgroundColor = color;
                   
                },i*3);
            }
            else {
                setTimeout(()=>{
                    const [barOneIdx,newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                },i*3);
            }
            
        }
    }

    resetArray(){
        const array=[];
        for(let i=0;i < 310; i++){
            array.push(randomIntFromIntervals(5,550));
        }
        this.setState({array});
    }
    resetArray1(){
        const array=[101,255,401,301,201,151,141,131];
        
        this.setState({array});
    }

    bubbleSort(){
        const animations = sortingAlgorithms.bubbleSort(this.state.array);
        let dict = new Map();
        for(let i=0; i < animations.length;i++){
        const arrayBars = document.getElementsByClassName('array-bar');
        //console.log('isitnew?',arrayBars[i]);
        
        const isColorChange = animations[i].length !== 4;
        // animations.forEach(element => {
        //     console.log(element);
        // });
        
         if(isColorChange){
            const [barOneIdx,barTwoIdx] = animations[i];
           // console.log(barTwoIdx,' ',barOneIdx);
           if(dict.get(barOneIdx)===undefined){
               dict.set(barOneIdx,1);
               arrayBars[barOneIdx].backgroundColor ='turqoise';
               console.log('set color of ',barOneIdx);
           }
           else
           {
            dict.set(barOneIdx,(dict.get(barOneIdx)+1)%2);
           }
           if(dict.get(barTwoIdx)===undefined){
            dict.set(barTwoIdx,1);
           }
           else
           {
            dict.set(barTwoIdx,(dict.get(barTwoIdx)+1)%2);
           }
       //    console.log(`${barOneIdx}, ${dict.get(barOneIdx)}`)  
            
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color =  dict.get(barOneIdx) === 0 ? 'turqoise' : 'red';
            setTimeout(()=>{
                //console.log(`color for ${barOneIdx} is ${color} color for ${barTwoIdx} is ${color}`)
                console.log(`${barOneIdx} -> ${barOneStyle.backgroundColor}`);
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                
            },i*3);
            
        }
        else{
            setTimeout(()=>{
                const [barOneIdx,newHeight,barTwoIdx,newHeight2] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barTwoStyle.height = `${newHeight2}px`;
                
            },i*3)
            
        }
        }
    }


   
    
    render(){
        
        const {array} = this.state;
        return (
            <div className="array-container">
                {array.map((value,idx)=>(
                    <div 
                    className="array-bar" 
                    key={idx} 
                style={{
                    backgroundColor: 'turqoise',
                    height: `${value}px`
                }}>{value}</div>
                ))}
            <button onClick={() => this.resetArray1()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>merge Sort</button>
            
            </div>
        );
        
    }
}


function randomIntFromIntervals(min,max){
    //<button onClick={() => this.mergeSort()}>Merge Sort</button>
            
    return Math.floor(Math.random() * (max- min + 1) + min);
}

