"use client";
import Topbar from "@/components/Topbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clients } from "@/lib/utils";
import { Table2 } from "lucide-react";
import { useState } from 'react';

export default function Home() {
  const [sort, setSort] = useState({
    clientName: "",
    createdAt: "",
    updatedAt: "",
    clientId: "",
  });

  const [sortedClients, setSortedClients] = useState(clients);

  const handleApplySort = () => {
    let sorted = [...clients];

    sorted.sort((a, b) => {
      if (sort.createdAt) {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (sort.createdAt === "Newest to Oldest") {
          if (dateA !== dateB) return dateB - dateA;
        } else {
          if (dateA !== dateB) return dateA - dateB;
        }
      }

      if (sort.updatedAt) {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();

        if (sort.updatedAt === "Newest to Oldest") {
          if (dateA !== dateB) return dateB - dateA;
        } else {
          if (dateA !== dateB) return dateA - dateB;
        }
      }

      if (sort.clientName) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA !== nameB) {
          return sort.clientName === "A-Z" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        }
      }
      if (sort.clientId) {
        if (a.id !== b.id) {
          return sort.clientId === "A-Z" ? a.id - b.id : b.id - a.id;
        }
      }

      return 0;
    });

    setSortedClients(sorted);
  };

  return (
    <div>
      <Topbar setSort={setSort} sort={sort} onApplySort={handleApplySort} />
      <div className="mx-10">
        <Table className="border rounded-lg text-sm">
          <TableHeader className="bg-muted/70 border-b ">
            <TableRow>
              <TableHead className="text-center">
                <Table2 size={17}/>
              </TableHead>
              {[
                "Client ID",
                "Client Name",
                "Client Type",
                "Email",
                "Status",
                "Created At",
                "Updated At",
                "Updated By",
              ].map((header) => (
                <TableHead key={header} className="text-center font-semibold text-gray-500 text-[14px]">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedClients.map((client, index) => (
              <TableRow className="hover:bg-muted/50 transition border-b" key={index}>
                {/* Empty cell for icon */}
                <TableCell></TableCell>

                {/* Client data rows */}
                <TableCell className="text-primary font-semibold text-blue-500 text-center">{client.id}</TableCell>
                <TableCell className="text-center">{client.name}</TableCell>
                <TableCell className="text-center">{client.type}</TableCell>
                <TableCell className="text-center">{client.email}</TableCell>
                <TableCell className="text-center">
                  <span className={client.status === "Active" ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium" : client.status === "Inactive" ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium" : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium"}>
                    {client.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">{client.createdAt}</TableCell>
                <TableCell className="text-center">{client.updatedAt}</TableCell>
                <TableCell className="text-center">{client.updatedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
