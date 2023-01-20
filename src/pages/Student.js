import { useParams } from "react-router-dom";

function Student() {
  const { name } = useParams();

  return (
    <div>
      <h1 className="student">Student {name}</h1>
      <p>Hier komt het profiel van 1 student</p>
    </div>
  );
}

export default Student;
