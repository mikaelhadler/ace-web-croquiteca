import { Route, columns } from "./croquiteca/columns";
import { DataTable } from "./croquiteca/data-table";
import data from "../scripts/data.json";

async function getData(): Promise<Route[]> {
  console.log(data);
  
  return data
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
