import { paths } from "@routes/paths";
import { Link } from "react-router-dom";

const LodgingGuidelines = ({ option1}) => {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 overflow-y-auto">
      <h3 className=" text-center text-accent text-secondary text-lg font-semibold mb-4 underline tracking-[2px]">
        Important Information
      </h3>
      {option1 ? (
        <p className="mb-6 text-[14px]">
          You can only edit submitted tasks within 24 hours of submission.
          <br />
          Approved or Rejected tasks can no longer be edited
          <br />
          You can only delete a task pending task
        </p>
      ) : (
         <div className=" w-full text-3xl text-center">Please Read <Link className="text-blue-500 hover:underline" to={paths.Notes}>Notes</Link> to Understand the workflow and usage Instructions</div>
       
      )}
    </div>
  );
};

export default LodgingGuidelines;
