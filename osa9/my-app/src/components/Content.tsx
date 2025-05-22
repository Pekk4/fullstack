import Part from "./Part";

import type { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part, index) => (
        <div key={index}>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <Part part={part} />
        </div>
      ))}
    </>
  );
};

export default Content;
