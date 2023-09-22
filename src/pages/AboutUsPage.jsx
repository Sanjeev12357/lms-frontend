import CarouselSlide from "../Components/CarouselSlide";
import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../assets/images/aboutMainImage.png";
import { Educators } from "../Constants/CelebrityData";


function AboutUS(){

    
    return (
       <HomeLayout>
        <div className="pl-20 pt-20 flex flex-col text-white">
            <div className="flex items-center gap-5 mx-10">
                <section className="w-1/2 sapce-y-10">
                    <h1 className="text-5xl text-yellow-500 font-semibold" >
                        Affordable and quality education
                    </h1>
                    <p className="text-xl text-gray-200">
                    Our goal is to provide afforadable and quality education to the world .
                    We are providing the platform for inspiring teachers and students to
                     share their skills, creativity and knowledge to each other to empower and contribute 
                     in the growth and wellness of mankind</p>
                </section>
                <div className="w-1/2">
                    <img 
                    id="text1"
                    style={{
                        filter:"drop-shadow(0px 10px 10px rgb(0,0,0)"
                    }}
                    alt="our main image"
                    className="drop-shadow-2xl"
                    src={aboutMainImage}/>
                </div>

            </div>
            <div className="carousel w-1/2 my-16 m-auto ">
                
                    {Educators && Educators.map(educator=><CarouselSlide {...educator} 
                        key={educator.slideNumber} 
                        totalSlides={educator.length}/>)}
                
               
                
            </div>
        </div>
       </HomeLayout>
    )
}
export default AboutUS;