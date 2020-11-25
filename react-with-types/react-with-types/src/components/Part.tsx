import React from 'react';
import { CoursePart } from '../App';

interface PartProps {
    coursePart: CoursePart;
}

const Part: React.FC<PartProps> = (props) => {
    const part = props.coursePart;

    switch (part.name) {
        case 'Fundamentals' || 'My new course':
           return (
            <div>
              <p>{part.name} {part.exerciseCount} {part.description}</p>
            </div>
          ); 

        case 'Using props to pass data': {
            return (
             <div>
               <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
             </div>
           ); 
         }
         case 'Deeper type usage': {
            return (
             <div>
               <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
             </div>
           ); 
         }
         case 'My new course':
           return (
            <div>
              <p>{part.name} {part.exerciseCount} {part.description}</p>
            </div>
          ); 
         default: assertNever(part);
    }

    return null;
  };

export default Part;

export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };