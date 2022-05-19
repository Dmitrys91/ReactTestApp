import React, {
  useState,
  useCallback,
  Fragment,
  useMemo,
  useRef,
} from "react";
import _ from "lodash";
import moment from "moment";
import Table from "./components/Table";
import "./App.css";

function App() {
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const fetchIdRef = useRef(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchAPIData = async ({ limit, skip, search }) => {
    try {
      setLoading(true);
      const page = skip ? (skip / 15) + 1 : 1 ;
      const response = await fetch(`https://staging-api.servgrow.com/invoices/test-page?PageNumber=${page}&PageSize=${limit}`);
      const data = await response.json();   
      setData(data.items);
      setPageCount(data.total);
      setLoading(false);
    } catch (e) {
      console.log("Error while fetching", e);
       setLoading(false);
    }
  };
  const sendInvoices = async (items) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
   };
   var response = await fetch('https://staging-api.servgrow.com/invoices/test-send', requestOptions);
   if(response.status == 200){
     alert('Selected invoices has been sent!');
   }
  }
  const fetchData = useCallback(
    ({ pageSize, pageIndex, data }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      if (fetchId === fetchIdRef.current) {
        fetchAPIData({
          limit: pageSize,
          skip: pageSize * pageIndex,
          search: searchTerm,
          invoices: data
        });
      }
    },
    [searchTerm]
  );
  const paymentStatuses = [
    'New',
    'Accepted',
    'Paid'
  ]
  function MyCell({ value }) {
    return <a>{paymentStatuses[value]}</a>
  }

  const columns = useMemo(() => [
    {
      Header: 'Invoice number',
      accessor: 'invoiceNumber',
      show: true
    },
    {
      Header: 'Status',
      accessor: 'paymentStatus',
      Cell: MyCell,
      show: true
    },
    {
      Header: "Payment Date",
      accessor: "paidDate",
      Cell: (cellInfo) => {
        return (
          <Fragment>
            {cellInfo.row.original.paidDate && moment(cellInfo.row.original.paidDate).format("Do MMM YYYY")}
          </Fragment>
        );
      },
      show: true,
    },
  ]);

  return (
    <div className="container mx-auto flex flex-col">
      <div className="flex justify-center mt-8">
        <Table
          pageCount={pageCount}
          fetchData={fetchData}
          columns={columns}
          loading={loading}
          data={data}
          sendInvoices={sendInvoices}
        />
      </div>
    </div>
  );
}

export default App;
