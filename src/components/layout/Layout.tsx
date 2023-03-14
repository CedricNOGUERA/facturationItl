
import React from 'react'
import PageTitle from './PageTitle'
import Footer from './Footer'
import Header from './Header'
import SideBar from './SideBar'
import '../../App.css';
import { Navigate, Outlet } from "react-router-dom";
import userAuthStore from "../../store/userAuthStore";
import { supabase } from '../../utils/supabaseClient'


const Layout = () => {
    const isLogged = userAuthStore((states: any) => states.isLogged)
    const [invoicesData, setInvoicesData] = React.useState<any>([]);
    const [quotesData, setQuotesData] = React.useState<any>([]);
  // const [invoicesData2, setInvoicesData2] = React.useState<any>([]);



    React.useEffect(() => {
      
      // getInvoices()
     
    }, []);


    // const getInvoices = async () => {
    //   let { data: invoices, error } = await supabase
    //     .from("invoices2")
    //     .select("*, detailBill(*)");

    //   if (invoices) {
    //     setInvoicesData(invoices);
    //   }
    //   if (error) {
    //     console.log(error);
    //   }
    // };



  return (
    <div id="layout-wrapper">
        {!isLogged && <Navigate to="/connexion" />}
      <Header />
      <SideBar />
      <div className="vertical-overlay"></div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            
            <Outlet context={[invoicesData, setInvoicesData, quotesData, setQuotesData]} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout