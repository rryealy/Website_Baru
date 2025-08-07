  import TableList from "../components/Tabelist";
  import Charts from "../components/Chart";
  import LineChartHari from "../components/Line-chart";

  const Rekap = () => {

    return (
      <div className="h-screen overflow-auto">
        <div className="flex flex-col gap-5">
          <Charts />
          <LineChartHari />
          <TableList />
        </div>
      </div>
    );
  };

  export default Rekap;
