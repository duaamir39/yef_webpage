"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CheckCircle, Repeat, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const FIXED_AMOUNTS = [1000, 2500, 5000, 10000];

const DonationSkeleton = () => (
  <Card className="shadow-xl border border-gray-200">
    <CardHeader>
      <div className="flex items-center">
        <div className="w-6 h-6 mr-2 bg-gray-300 rounded-full shimmer" />
        <div className="h-6 w-3/5 bg-gray-300 rounded shimmer" />
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 bg-gray-300 rounded-lg shimmer" />
        ))}
      </div>
      <div className="flex justify-center">
        <div className="w-full sm:w-64 h-12 bg-gray-300 rounded-lg shimmer" />
      </div>

      <Separator className="my-6" />
      <div className="flex items-center mb-2">
        <div className="w-6 h-6 mr-2 bg-gray-300 rounded-full shimmer" />
        <div className="h-6 w-1/3 bg-gray-300 rounded shimmer" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <div className="w-full sm:w-48 h-12 bg-gray-300 rounded-lg shimmer" />
        <div className="w-full sm:w-48 h-12 bg-gray-300 rounded-lg shimmer" />
      </div>
    </CardContent>

    <CardFooter className="flex flex-col items-center space-y-4">
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-64 h-12 bg-gray-300 rounded-lg shimmer" />
      </div>
      <div className="w-1/2 h-4 bg-gray-300 rounded shimmer" />
      <div className="w-1/4 h-4 bg-gray-300 rounded shimmer" />
    </CardFooter>
  </Card>
);

export default function DonatePage() {
  const { data: session, status } = useSession();

  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="h-8 w-3/4 mx-auto bg-gray-300 rounded shimmer" />
          <div className="h-6 w-1/2 mx-auto bg-gray-300 rounded shimmer" />
          <DonationSkeleton />
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/signin?callbackUrl=/donate");
  }

  const donationValue =
    selectedAmount === "custom" ? parseFloat(customAmount) || 0 : selectedAmount;

  const formatCurrency = (amount: number): string => {
    return `Rs. ${Math.floor(amount).toLocaleString("en-PK")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (donationValue <= 0 || isProcessing) return;

    setIsProcessing(true);
    setIsSuccess(false);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          amount: donationValue,
          frequency,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Something went wrong");
      }

      setIsSuccess(true);
      setCustomAmount("");
      setSelectedAmount(5000);

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      console.error("Donation error:", err);
      setErrorMessage(err.message || "Failed to process donation");
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = donationValue > 0;
  const userEmail = session?.user?.email || "N/A";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-['Inter'] fade-in">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-[#024da1]">
          Support Our Cause
        </h1>
        <p className="text-lg text-center text-gray-600">
          Your generosity fuels youth empowerment and education programs.
        </p>

        <Card className="shadow-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center text-gray-800">
              <Wallet className="w-6 h-6 mr-2 text-[#024da1]" />
              Choose Amount
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Fixed donation buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FIXED_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => setSelectedAmount(amount)}
                  className={`text-lg font-medium h-12 ${
                    selectedAmount === amount
                      ? "bg-[#024da1] hover:bg-[#024da1]/90"
                      : "hover:border-[#024da1]"
                  }`}
                >
                  {formatCurrency(amount)}
                </Button>
              ))}
            </div>

            <Button
              type="button"
              variant={selectedAmount === "custom" ? "default" : "outline"}
              onClick={() => setSelectedAmount("custom")}
              className={`w-full mx-auto block text-left text-lg font-medium h-12 ${
                selectedAmount === "custom"
                  ? "bg-[#024da1] hover:bg-[#024da1]/90"
                  : "hover:border-[#024da1]"
              }`}
            >
              Enter Custom Amount
            </Button>

            {selectedAmount === "custom" && (
              <div className="mt-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500">
                    Rs.
                  </span>
                  <Input
                    type="number"
                    placeholder="5000"
                    min={1}
                    step={1}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="pl-12 h-12"
                  />
                </div>
              </div>
            )}

            <Separator className="my-6" />

            <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-2">
              <Repeat className="w-6 h-6 mr-2 text-[#024da1]" />
              Choose Frequency
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                type="button"
                variant={frequency === "one-time" ? "default" : "outline"}
                onClick={() => setFrequency("one-time")}
                className={`w-full sm:w-48 text-lg font-medium h-12 ${
                  frequency === "one-time"
                    ? "bg-[#024da1] hover:bg-[#024da1]/90"
                    : "hover:border-[#024da1]"
                }`}
              >
                One-Time
              </Button>
              <Button
                type="button"
                variant={frequency === "monthly" ? "default" : "outline"}
                onClick={() => setFrequency("monthly")}
                className={`w-full sm:w-48 text-lg font-medium h-12 ${
                  frequency === "monthly"
                    ? "bg-[#024da1] hover:bg-[#024da1]/90"
                    : "hover:border-[#024da1]"
                }`}
              >
                Monthly
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-4">
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
              {isSuccess && (
                <div className="bg-[#eef5fd] border border-[#024da1] text-[#024da1] px-4 py-3 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-bold">
                    Thank you for your {frequency} donation of{" "}
                    {formatCurrency(donationValue)}!
                  </span>
                </div>
              )}

              {errorMessage && (
                <p className="text-red-500 font-semibold">{errorMessage}</p>
              )}

              <Button
                type="submit"
                disabled={!isFormValid || isProcessing}
                className="w-full sm:w-64 h-12 text-lg font-bold bg-[#024da1] hover:bg-[#024da1]/90"
              >
                {isProcessing
                  ? "Processing..."
                  : `Donate ${formatCurrency(donationValue)}`}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-500">
              You are signed in as:{" "}
              <span className="font-semibold text-[#024da1]">{userEmail}</span>
              <br />
              All transactions are secure and tax-deductible.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
