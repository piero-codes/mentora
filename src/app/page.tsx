"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockBooks } from "@/data/mockData";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = mockBooks.filter((book) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Library</h1>
          <p className="text-muted-foreground text-sm">
            Discover and revisit your reading highlights
          </p>
        </div>
        <Button className="bg-black text-white hover:bg-neutral-800 cursor-pointer">
          + Add Book
        </Button>
      </div>
      <div className="mb-6 max-w-md">
        <Input
          placeholder="Search books by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="flex flex-col">
            <Image
              src={"/book-cover.png"}
              alt={book.title}
              width={200}
              height={300}
              className="rounded-lg cursor-pointer shadow-[0_8px_24px_0_rgba(0,0,0,0.25)]"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col mt-2 max-w-[200px] cursor-pointer">
                  <h3 className="text-md font-bold truncate">{book.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {book.author}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs text-center">
                <div className="font-bold">{book.title}</div>
                <div className="text-muted-foreground">{book.author}</div>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
}
