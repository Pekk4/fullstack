interface Content {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Content[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part, index) => (
        <p key={index}>{part.name} {part.exerciseCount}</p>
      ))}
    </>
  );
};

export default Content;
