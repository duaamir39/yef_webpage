'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface Cause {
  id: number;
  title: string;
  description: string;
  image: string;
}

const CausesSection = () => {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const res = await fetch("/api/causes");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data: any = await res.json();

        // Safety check: ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from API");
        }

        // Map and sanitize each item
        const sanitized: Cause[] = data.map((item: any) => ({
          id: item?.id ?? 0,
          title: item?.title ?? "No Title",
          description: item?.description ?? "No Description",
          image: item?.image ?? "/placeholder-image.jpg",
        }));

        setCauses(sanitized);
      } catch (err: any) {
        console.error("Error fetching causes:", err);
        setError(err.message || "Failed to fetch causes");
      } finally {
        setLoading(false);
      }
    };

    fetchCauses();
  }, []);

  return (
    <div className="py-8 px-3 bg-white shadow-inner" style={{ boxShadow: "0 -4px 12px rgba(0,0,0,0.1)" }}>
      <h2 className="text-2xl font-bold text-center text-black mb-6">
        Our Causes
      </h2>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex justify-center">
              <Card className="h-[450px] w-full max-w-sm flex flex-col overflow-hidden transition-all duration-300"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
                <Skeleton className="w-full h-[300px]" />
                <CardContent className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="flex justify-center mt-4">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          {causes.length > 0 ? (
            causes.map((item) => (
              <div key={item.id} className="flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card
                    className="h-[450px] w-full max-w-sm flex flex-col overflow-hidden transition-all duration-300"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "8px" }}
                  >
                    <div className="w-full h-[300px] relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-t-md"
                      />
                    </div>
                    <CardContent className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4 w-full">No causes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CausesSection;