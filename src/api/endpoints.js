export const endpoints = {
    login: "api/secure/login",
    logout: "api/secure/logout",
    ForgetPassword: '/api/secure/forgot-password',
    ResetPassword: '/api/secure/reset-password',
    verifyOtp: '/api/secure/verify-otp',
    validateAuth: "/api/secure/validate",

    // Tasks
    createTask: "/api/task/create",
    getAllTasks: "/api/task/getAll",
    approveTask: "/api/task/approve",
    updateTask: "/api/task/update",
    deleteTask: "/api/task/delete",
    getTaskDetails: "/api/task/getOne",
    downloadPdfFile: "/api/task/export-pdf",
    downloadExcelFile: "/api/task/export-excel",
    exportTodayTasksToExcel:"/api/task/excel/export-today-task",
    exportAllTasksToExcel:"/api/task/excel/all",
    exportAllTaskToPDF:"/api/task/exportPdf/all-tasks",
    exportAllTodayTaskToPDF:"/api/task/exportPdf/all-today-tasks",
   
    // Users
    CreateUser: "/api/user/create",
    getAllUsers: "/api/user/getAll",
    getUserDetails: "/api/user/getUser",
    UpdateUser: "/api/user/update",
    UpdateUserPassword: "/api/user/update-password",
    deleteUser: "/api/user/delete"
  };
  