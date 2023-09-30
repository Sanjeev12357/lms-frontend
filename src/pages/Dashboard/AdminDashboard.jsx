import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import {Chart as ChartJS, ArcElement , Tooltip, Legend , CategoryScale, LinearScale, BarElement , Title} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentrecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatsSlice";
import { deleteCourses } from "../../Redux/Slices/CourseSlice";
import { Bar, Pie } from "react-chartjs-2";
import {FaUsers} from "react-icons/Fa"
import {FcSalesPerformance} from "react-icons/Fc";
import {GiMoneyStack} from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);


function AdminDashboard(){

    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {allUsersCount,subscribedCount}=useSelector((state)=>state.stat);
    const {allPayments,finalMonths,MonthlySalesRecord}=useSelector((state)=>state.razorpay);



    const userData={
        labels:["registered user","Enrolled User"],
        datasets:[
            {
                label:"User Details",
                data:[allUsersCount,subscribedCount],
                backgroundColor:["yellow","green"],
                borderWidth:1,
                borderColor:["yellow","green"],
            },
            {
                label:"User Details",
                data:[10,15],
                backgroundColor:["yellow","green"],
                borderWidth:1,
                borderColor:["yellow","green"],
            },

        ]
    };

    const salesData={
        labels:["jan","feb","mar","Apr","may","jun","jul","aug","Sep","Oct","Nov","Dec"],
        fontColor:"White",
        datasets:[
            {
            label:"Sales/month",
            data:MonthlySalesRecord,
            backgroundColor:["rgb(255,99,132)"],
            borderColor:["white"],
            borderWidth:2
            }
        ]
    }
    const myCourses=useSelector((state)=>state?.course?.courseList);
    async function onCourseDelete(id){
        if(window.confirm("are you sure you want to delete the course")){
            const res=await dispatch(deleteCourses(id));
            
            if(res?.payload){
                await dispatch(getAllCourses());
            }
        }
    }

    useEffect(()=>{
        (
            async()=>{
                await dispatch(getAllCourses());
                await dispatch(getStatsData());
                await dispatch(getPaymentrecord());
            }
        )()
    },[])


    console.log(myCourses);
    return (
    <HomeLayout>
        <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
            <h1 className="text-center text-5xl font-semibold text-yellow-500">
                AdminDashboard
            </h1>
            <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                    <div className="w-80 h-80">
                        <Pie data={userData}/>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-lg">
                            <div className="flex flex-col items-center ">
                                <p className="font-semibold"> Registered Users</p>
                                <h3 className="text-4xl font-bold">{isNaN(allUsersCount) ? 'N/A' : allUsersCount}</h3>

                            </div>
                            <FaUsers className="text-yellow-500 text-5xl "/>
                        </div>
                        <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-lg">
                        <div className="flex flex-col items-center ">
                            <p className="font-semibold"> Subscribed Users</p>
                            <h3 className="text-4xl font-bold">{isNaN(subscribedCount) ? 'N/A' : subscribedCount}</h3>

                        </div>
                        <FaUsers className="text-green-500 text-5xl "/>
                    </div>
                    </div>


                </div>

                <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                    <div className="h-80 w-full relative">
                        <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
                    </div>
                    <div className="grid grid-cols-2 gap-5 ">
                    <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-lg">
                    <div className="flex flex-col items-center ">
                        <p className="font-semibold"> Subscription Count </p>
                        <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                    </div>
                    <FcSalesPerformance className="text-yellow-500 text-5xl "/>
                </div>
                <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-lg">
                    <div className="flex flex-col items-center ">
                        <p className="font-semibold"> Total Revenue </p>
                        // <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                    </div>
                    <GiMoneyStack className="text-green-500 text-5xl "/>
                </div>

                    </div>
                </div>
            </div>

        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10 ">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-center text-3xl font-semibold">Courses Overview</h1>
                <button 
                onClick={()=>{
                    navigate("/courses/createCourse")
                    
                }}
                className="w-fit bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md py-2 px-4 font-semibold text-lg"
                >
                Create New Course</button>
            </div>
            

            <table className="table overflow-x-scroll">
                <thead>
                    <tr>
                        <th>s No</th>
                        <th>Course title</th>
                        <th>Course Category</th>
                        <th>Instructor</th>
                        <th>total Lectures</th>
                        <th>Descritption</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {myCourses?.map((course, idx) => {
                    return (
                        <tr key={course._id}>
                            <td>{idx + 1}</td>
                            <td>{course?.title}</td>
                            <td>{course?.category}</td>
                            <td>{course?.createdBy}</td>
                            <td>{course?.numberOfLectures}</td>
                            <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                <textarea 
                                value={course?.description}
                                readOnly
                                className="w-80 h-auto bg-transparent resize-none"
                                ></textarea>
                                
                            </td>
                            <td className="flex items-center gap-4">
                                <button 
                                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                onClick={()=>navigate("/course/displaylectures",{state:{...course}})}
                                >
                                <BsCollectionPlayFill/>
                                </button>
                                <button 
                                className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                onClick={()=>onCourseDelete(course?._id)}
                                >
                                <BsTrash/>
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            
            </table>

        </div>
        </div>

    </HomeLayout>
    )
}
export default AdminDashboard;