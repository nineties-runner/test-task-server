import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";

import FiltersTab from "../FiltersTab";

type ListItem = {
  status: string;
  tags: string;
  name: string;
  id: string;
  type: string;
};

export const Monitoring = () => {
  const [data, setData] = useState<ListItem[]>([]);
  const [nameQuery, setNameQuery] = useState<string>("");
  const [tagsQuery, setTagsQuery] = useState<string>("");
  const [typeQuery, setTypeQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageAmount, setPageAmount] = useState<number>(1);
  const [types, setTypes] = useState<string[]>([]);
  const [tabOpen, setTabOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async (): Promise<ListItem[]> => {
    const res = await axios.get(
      "https://650ab32fdfd73d1fab08b9d1.mockapi.io/api/servers/servers"
    );
    return res.data;
  };

  const updateSearchAttributes = (
    {
      name = searchParams.get("name"),
      tags = searchParams.get("tags"),
      type = searchParams.get("type"),
    },
    res: ListItem[]
  ) => {
    const typesSet = new Set<string>();
    res.map((item) => typesSet.add(item.type));
    setTypes(Array.from(typesSet));
    res = name
      ? res.filter((item) =>
          item.name.toLocaleLowerCase().includes(name.toLowerCase())
        )
      : res;
    res = tags
      ? res.filter((item) =>
          item.tags.toLowerCase().includes(tags.toLowerCase())
        )
      : res;
    res = type ? res.filter((item) => item.type === type) : res;
    setPageAmount(Math.ceil(res.length / 10));
    setPage(
      page >= Math.ceil(res.length / 10) ? Math.ceil(res.length / 10) : page
    );
    res = res.slice((page - 1) * 10, page * 10);
    setData(res);
  };

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      updateSearchAttributes({}, data);
    })();
  }, [searchParams, page]);

  return (
    <main className="flex flex-col w-full p-4">
      <div className="flex">
        <input
          className="w-96 h-12 p-4 pl-8 border-none mb-2 bg-slate-200 rounded-l-full focus:outline-none"
          type="text"
          value={nameQuery}
          placeholder=""
          onChange={(e) => setNameQuery(e.target.value)}
        />
        <input
          type="button"
          value="🔎"
          className="p-2 w-12 h-12 bg-slate-900 rounded-r-full pr-3 cursor-pointer hover:bg-blue-400 transition-all duration-150"
          onClick={() => {
            searchParams.set("name", nameQuery);
            searchParams.set("tags", tagsQuery);
            searchParams.set("type", typeQuery);
            setSearchParams(searchParams);
          }}
        />
        <div
          className="flex flex-col text-lg text-slate-600 transition-all select-none p-4 border-2 active:bg-slate-300 active:text-slate-900 font-bold justify-center align-middle h-12 cursor-pointer ml-4 rounded-full"
          onClick={() => setTabOpen(tabOpen ? false : true)}
        >
          ⚙️ Filters
        </div>
        {tabOpen && (
          <>
            <input
              type="text"
              value={tagsQuery}
              placeholder="Tags"
              className="flex flex-col text-lg text-slate-600 transition-all select-none p-4 border-2 w-96 active:bg-slate-300 active:text-slate-900 font-bold justify-center align-middle h-12 ml-4 rounded-full"
              onChange={(e) => setTagsQuery(e.target.value)}
            />
            <select
              value={typeQuery}
              className="text-slate-600 transition-all select-none border-2 w-96 active:bg-slate-300 active:text-slate-900 font-bold justify-center align-middle ml-4 rounded-full h-12 pl-4"
              onChange={(e) => {
                setTypeQuery(e.target.value);
                console.log("changed");
              }}
            >
              <option value="">None</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <table className="border border-collapse w-full">
        <thead>
          <th className="text-lg font-bold text-center">ID</th>
          <th className="text-lg font-bold text-center">Status</th>
          <th className="text-lg font-bold text-center">Type</th>
          <th className="text-lg font-bold text-center">Name</th>
          <th className="text-lg font-bold text-center">Tags</th>
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-slate-200">
          {data.length > 0 &&
            data.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="text-center p-2">{item.id}</td>
                  <td className="text-center p-2">{item.status}</td>
                  <td className="text-center p-2">{item.type}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 flex gap-1 text-xs text-white">
                    {item.tags
                      .toLowerCase()
                      .replaceAll(RegExp(/([,])/g), "")
                      .split(" ")
                      .map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="rounded-md p-2 flex justify-center align-middle h-fit break-words bg-blue-400 cursor-pointer hover:bg-blue-600"
                            onClick={() => {
                              setTagsQuery(
                                tagsQuery.length
                                  ? tagsQuery.trimEnd() + ` ${item}`
                                  : item
                              );
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {pageAmount && (
        <div className="flex mt-4 gap-4 justify-center align-middle">
          {Array(pageAmount)
            .fill("okay")
            .map((item, index) => (
              <div
                key={index}
                className={
                  `bg-slate-200 w-8 h-8 flex justify-center align-middle rounded-full text-lg font-bold cursor-pointer text-white transition-all hover:text-green-500 ` +
                  (page == index + 1 && `bg-blue-700`)
                }
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </div>
            ))}
        </div>
      )}
    </main>
  );
};
