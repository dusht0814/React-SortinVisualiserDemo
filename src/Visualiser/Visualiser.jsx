import React from 'react';
import {getMergeSortAnimations,bubbleSort} from '../sortingAlgorithms/sortingAlgorithms.js';
import './Visualiser.css';
const ANIMATION_SPEED_MS = 3;

const NUMBER_OF_ARRAY_BARS = 310;

const PRIMARY_COLOR = 'turquoise';

const SECONDARY_COLOR = 'red';

export default class Visualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }
  resetArray1(){
    const array=[101,255,401,301,201,151,141,131];
    
    this.setState({array});
}
  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 350));
    }
    this.setState({array});
  }


  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
      
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }



  
 

  bubbleSort(){
    const animations = bubbleSort(this.state.array);
    for(let i=0; i < animations.length;i++){
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx,barTwoIdx]=animations[i];
        const isColorChange = animations[i].length !==4;
        if (isColorChange) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(()=>{
            const color = barOneStyle.backgroundColor === PRIMARY_COLOR ? SECONDARY_COLOR : PRIMARY_COLOR;
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
            
        },i*ANIMATION_SPEED_MS);
        
    }
    else{
      setTimeout(() => {
        const [barOneIdx,newHeight,barTwoIdx,newHeight2] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barTwoStyle.height = `${newHeight2}px`;
 
      },i*ANIMATION_SPEED_MS);
  }
}
  }
   
    
  
  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

