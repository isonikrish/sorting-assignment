import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Funnel,
  User,
  Calendar,
  GripVertical,
  SquareUserRound,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { SortType } from "@/lib/types";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

function Topbar({
  sort,
  setSort,
  onApplySort,
}: {
  sort: SortType;
  setSort: React.Dispatch<React.SetStateAction<SortType>>;
  onApplySort: () => void;
}) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Individual", "Company"];

  const [sortOptions, setSortOptions] = useState([
    {
      id: "clientName",
      icon: <User size={16} />,
      label: "Client Name",
      badges: ["A-Z", "Z-A"],
    },
    {
      id: "createdAt",
      icon: <Calendar size={16} />,
      label: "Created At",
      badges: ["Newest to Oldest", "Oldest to Newest"],
    },
    {
      id: "updatedAt",
      icon: <Calendar size={16} />,
      label: "Updated At",
      badges: ["Newest to Oldest", "Oldest to Newest"],
    },
    {
      id: "clientId",
      icon: <SquareUserRound size={16} />,
      label: "Client ID",
      badges: ["A-Z", "Z-A"],
    },
  ]);

  const handleSortChange = (field: string, value: string) => {
    setSort((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearSort = () => {
    setSort({
      clientName: "",
      createdAt: "",
      updatedAt: "",
      clientId: "",
    });
  };


  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(sortOptions);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setSortOptions(items);
  };


  return (
    <div className="flex items-center justify-between px-16 py-4">
      <div>
        <ul className="flex gap-6 items-center text-[16px] font-semibold text-gray-400">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer transition ${activeTab === tab
                  ? "text-black underline underline-offset-[22px] decoration-[6px] decoration-primary"
                  : "hover:text-black"
                }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-5 text-gray-500">
          <Search className="h-5 w-5 cursor-pointer" />
          <Popover>
            <PopoverTrigger asChild>
              <ArrowUpDown className="h-5 w-5 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-[550px] p-5 shadow-lg rounded-xl">
              <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
                Sort By
              </h1>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sortOptions">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {sortOptions.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center gap-0 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-100 ${snapshot.isDragging ? "opacity-50" : ""
                                }`}
                            >
                              <div className="p-2">
                                <GripVertical className="h-4 w-4 text-gray-600" />
                              </div>
                              <div className="flex justify-between items-center p-3 rounded-md w-full">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <span className="font-semibold flex gap-2 items-center">{item.icon} {item.label}</span>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                  {item.badges.map((text) => (
                                    <Badge
                                      variant={
                                        sort[item.id as keyof SortType] === text
                                          ? "default"
                                          : "outline"
                                      }
                                      key={text}
                                      onClick={() =>
                                        handleSortChange(item.id, text)
                                      }
                                      className="cursor-pointer"
                                    >
                                      {text === "A-Z" ||
                                        text === "Newest to Oldest" ? (
                                        <ArrowUp className="h-3 w-3 mr-2 text-gray-500" />
                                      ) : text === "Z-A" ||
                                        text === "Oldest to Newest" ? (
                                        <ArrowDown className="h-3 w-3 mr-2 text-gray-500" />
                                      ) : null}
                                      {text}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <div className="flex justify-between items-center pt-4 border-t mt-6">
                <button
                  className="text-sm text-gray-500 hover:underline"
                  onClick={handleClearSort}
                >
                  Clear all
                </button>
                <Button
                  className="h-9 px-4 rounded-md bg-black text-white"
                  onClick={onApplySort}
                >
                  Apply Sort
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Funnel className="h-5 w-5 cursor-pointer" />
        </div>

        <Button className="flex gap-2 bg-primary text-white">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>
    </div>
  );
}

export default Topbar;
