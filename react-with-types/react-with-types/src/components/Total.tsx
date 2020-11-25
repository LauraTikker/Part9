import React from 'react';

interface TotalProps {
    numberOfExercises: number;
}

const Total: React.FC<TotalProps> = (props) => {
    return (
      <div>
        <p>
          Number of exercises {props.numberOfExercises}
        </p>
      </div>
    );
  };

export default Total;