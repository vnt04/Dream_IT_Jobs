import BestCompany from "./BestCompany";
import BlogHome from "./BlogHome";
import NewJobs from "./NewJobs";
import QuickSearch from "./QuickSearch";

function Home() {

    return (  
       <div>
           <QuickSearch/>
           <NewJobs/>
           <BestCompany/>
           <BlogHome/>
       </div> 
    );
}

export default Home;