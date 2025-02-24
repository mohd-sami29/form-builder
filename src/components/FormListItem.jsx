import { Link } from 'react-router-dom';

function FormListItem({ form }) {
  return (
    <div className="border p-4 my-2 flex justify-between">
      <span>{form.title}</span>
      <Link to={`/forms/${form.id}`} className="bg-blue-500 text-white px-4 py-2">
        View
      </Link>
    </div>
  );
}

export default FormListItem;
