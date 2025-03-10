
const Notes = () => {
  return (
    <div className="w-full shadow-sm bg-white p-5 rounded-sm">
        <h1 className=" text-3xl text-tertiary text-center" >Usage Instruction and Workflow</h1>
            <h1 className="text-md font-semibold">Performed Task: Option 2 </h1>
         <h1 className="font-semibold my-2">ROLES AND ACCESS LEVEL</h1>
         <p className="italic text-sm">ICT</p>
         <p className="italic text-sm">Manager</p>
         <p className="italic text-sm">Admin</p>
         <p className="italic text-sm">Employee</p>

         <h1 className="font-semibold my-2">ADDING A USER</h1>
         <p className="italic text-sm">All categories of users  can add a new user, however, you cannot assign a role greater than  your current role or access level</p>

         <p className="italic text-sm">Passwords are automicatically sent to newly registered users emails</p>

         <h1 className="font-semibold my-2">Editing A USER</h1>
         <p className="italic text-sm" >All users can convieniently edit their profiles and update their passwords, however, a user with the role or ICT or Manager, can edit other users</p>

         <h1 className="font-semibold my-2">Creating a Task</h1>
         <p className="italic text-sm mb-2" >Creating a task accepts, Task Title, Hours Worked and Task description inputes, every other attribute of a task, like the creator details and creation time, are automatically generated using the logged In user details</p>

         <p className="italic text-sm mb-2" >All Tasks created by every employee are submitted to users with Manager Roles for review</p>

         <p className="italic text-sm mb-2" >A Submitted task remains in pending state until it is approved or rejected by a manager</p>

         <p className="italic text-sm mb-2" >Managers have an option to provide Comment for Approving or Rejecting a task submitted by an EMployee</p>

         <p className="italic text-sm mb-2" >An Employee can only update a task with a pending status within 24 hours of submission</p>

         <p className="italic text-sm mb-2" >An Employee can only delete a task of it is still in Pending approval status</p>

         <h1 className="font-semibold my-2">EXPORTING A TASK (PDF and Excel)</h1>
         <p className="italic text-sm">A manager, ICT or Admin can export all tasks, and Daily tasks to excel or PDF</p>
         <p className="italic text-sm">Individual tasks can be exported to excel or PDF</p>
         <p className="italic text-sm">Departmental Heads receive automated copy of daily tasks of his departments as submitted by employees in that department</p>

         <p className="italic text-sm">Task Table can be filtered by department, Employee Names, creation date range</p>

         <p className="italic text-sm">Daily Tasks are exported every 6 pm Nigerian time</p>
      
      
         <h1 className="font-semibold my-2">DASHBOARDS</h1>
         <p className="italic text-sm">ICT Dashboard</p>
         <p className="italic text-sm">Manager Dashboard</p>
         <p className="italic text-sm">Admin Dashboard</p>
         <p className="italic text-sm">Employee Dashboard</p>

         <h1 className="font-semibold my-2">IMPROVEMENTS TO BE MADE</h1>
         <p className="italic text-sm">UI can greatly be improved</p>
         <p className="italic text-sm">Notification was not completed due to time</p>
         <p className="italic text-sm">Notification was not completed due to time</p>

       


        
       
    </div>
  )
}

export default Notes