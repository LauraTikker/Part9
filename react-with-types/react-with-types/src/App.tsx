import React from 'react';
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartOne extends Description {
    name: "Fundamentals";
    description: string;
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends Description {
    name: "Deeper type usage";
    description: string;
    exerciseSubmissionLink: string;
  }

  interface CoursePartFourth extends Description {
    name: "My new course";
  }

  interface Description extends CoursePartBase {
    description: string;
  }
  
  export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFourth;

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
          name: "Fundamentals",
          exerciseCount: 10,
          description: "This is an awesome course part"
        },
        {
          name: "Using props to pass data",
          exerciseCount: 7,
          groupProjectCount: 3
        },
        {
          name: "Deeper type usage",
          exerciseCount: 14,
          description: "Confusing description",
          exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        },
        {
          name: "My new course",
          exerciseCount: 11,
          description: "Newest course"
        }
      ];

    const numberOfExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  
    return (
      <div>
        <Header courseName={courseName} />
        <Content courseParts={courseParts}/>
        <Total numberOfExercises={numberOfExercises}/>
      </div>
    );
  };

export default App;