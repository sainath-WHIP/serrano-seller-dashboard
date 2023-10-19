import Layout from "../components/Layout";
import Cards from "../components/cards";

function Dashboard() {
  return (
    <Layout>
      <div className="">
        <h1 className="text-black font-semibold text-lg mb-3 ">Dashboard</h1>
      </div>
      <Cards/>
      <div>
        <h1></h1>
      </div>
    </Layout>
  );
}

export default Dashboard;
