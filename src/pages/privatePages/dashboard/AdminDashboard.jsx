import DashboardStats from "@components/DashboardStats"
import LodginBenefits from "@components/LodginBenefits"
import LodgingGuidelines from "@components/LodgingGuidelines"




const AdminDashboard = () => {
  return (
      <div className="flex flex-col gap-4">
          <DashboardStats/>
          <div className="flex flex-col lg:flex-row gap-4 w-full h-[42rem] lg:h-auto ">
            <LodgingGuidelines />
            <LodginBenefits/>
          </div>

    </div>
         
  )
}

export default AdminDashboard