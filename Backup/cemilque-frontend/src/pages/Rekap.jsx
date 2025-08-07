import { BiPlusCircle } from "react-icons/bi";
import TableList from "../components/Tabelist";
import Charts from "../components/Chart";

const Rekap = () => {
  return (
    <>
    <div className= "pl-10 pt-10 pb-5 mb-4 flex items-center">
        <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-2 w-64"
        />
        <button className="ml-1 bg-green-500 text-white px-3 py-2 rounded"> + </button>
    </div>
    <div className="flex flex-col gap-5 ">
      <Charts />
      <TableList />
    </div>
    </>
  );
}

export default Rekap
