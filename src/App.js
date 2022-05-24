import React, {
  useState,
  useCallback,
  Fragment,
  useRef,
} from "react";
import _ from "lodash";
import moment from "moment";
import Table from "./components/Table";
import "./App.css";
import invoiceService from "./services/invoiceService"
import PaymentDescription from "./components/Table/paymentDescription"

function App() {
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const fetchIdRef = useRef(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm] = useState("");

  const getInvoices = async ({ limit, skip, searchTerm }) => {
    try {
      setLoading(true);  
      const data = await invoiceService.get(skip, limit)
      setData(data.items);
      setPageCount(data.total);
      setLoading(false);
    } catch (e) {
      console.log("Error while fetching", e);
       setLoading(false);
    }
  };

  const sendInvoices = async () => {
    await invoiceService.post();
  }

  const fetchData = useCallback(async ({ pageSize, pageIndex, data }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      if (fetchId === fetchIdRef.current) {
        await getInvoices({
          limit: pageSize,
          skip: pageSize * pageIndex,
          invoices: data
        });
      }
    },[searchTerm]
  );

  const columns = [
    {
      Header: 'Invoice number',
      accessor: 'invoiceNumber',
      show: true
    },
    {
      Header: 'Status',
      accessor: 'paymentStatus',
      Cell: PaymentDescription,
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
  ];

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
