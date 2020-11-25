import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

interface ContentProps {
    courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => {
    const courseParts = props.courseParts;

    return (
      <div>
        {courseParts.map(course => {
            return (
                <Part key={course.name} coursePart={course}></Part>
            )
        })}
      </div>
    );
  };

export default Content;