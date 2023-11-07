export default function TableHead() {
    return (
        <thead className="border-b-[1px]">
        <tr className="text-gray-800">
          <th className="p-2 border-r-[1px] font-normal">Day</th>
          <th className="border-r-[1px] font-normal">Amount</th>
          <th className="border-r-[1px] font-normal">Description</th>
          <th className="font-normal">Label</th>
        </tr>
      </thead>
    )
}