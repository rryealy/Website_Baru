import MonitorBP from "../components/beranda/monitorBanyakPenjualan";
import MonitorPendapatan from "../components/beranda/monitorPendapatan";

export default function Beranda (){
  return (
    <div className="h-screen overflow-hidden grid grid-cols-3 grid-rows-4 p-7 gap-5">
        <div className="row-span-2 outline outline-black flex items-center justify-evenly">
          <div className="outline outline-red-1000"> kontol</div>
        </div>
        <div className="row-span-2 outline outline-black">Penjualan per kategori</div>
        <div className="row-span-3 rounded-lg shadow-lg h-full border border-gray-300 overflow-hidden">
          <MonitorBP />
        </div>
        <div className="row-span-2 col-span-2 outline outline-black">Live Monitoring Barang Terjual</div>
        <div className="rounded-lg shadow-lg h-full border border-gray-300 overflow-hidden">
          <MonitorPendapatan />
        </div>
    </div>
  )
}


