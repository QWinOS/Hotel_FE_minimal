// app/components/WhatsAppForm.tsx
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DateRangePickerWithInlineButtons from "./ui/Date_Picker_Clean";

// 🔍 Validation schema
// console log this zod schema to see the structure
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),

  message: z.string().min(10, "Message must be at least 10 characters"),
  selectedDate: z
    .object({
      from: z.string().min(1, "Please select a starting date"),

      to: z.string().min(1, "Please select an ending date"),
    })
    .refine((data) => data.from || data.to, {
      // console.log("Date from: ", data.from, "Date to: ", data.to);
      message: "Please select a date range",
    }),
});

export function WhatsAppForm() {
  const [selectedDate, setSelectedDate] = useState<{
    from: string | undefined;
    to: string | undefined;
  }>({
    from: "",
    to: "",
  });
  console.log(
    "Selected Date WhatsAppForm : FROM -> " + selectedDate?.from,
    "TO-> " + selectedDate?.to
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      selectedDate: {
        from: selectedDate?.from,
        to: selectedDate?.to,
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, phone, message, selectedDate } = values;
    console.log(
      "Selected Date WhatsAppForm : FROM -> " + selectedDate.from,
      "TO-> " + selectedDate.to
    );
    let dateString = "";
    if (selectedDate.from && selectedDate.to) {
      dateString = `\n *Date:* ${selectedDate.from} - ${selectedDate.to}`;
    } else if (selectedDate.to) {
      dateString = `\n *Date:* ${new Date(
        selectedDate.to
      ).toLocaleDateString()} - ${new Date(
        selectedDate.to
      ).toLocaleDateString()}`;
    } else if (selectedDate.from) {
      dateString = `\n *Date:* ${new Date(
        selectedDate.from
      ).toLocaleDateString()}`;
    }

    const whatsappMessage = `*Name:* ${name}\n *Email:* ${email}\n *Phone:* ${phone}\n *Message:* ${message}${dateString}`;
    const whatsappURL = `https://wa.me/916291222796?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 bg-gradient-to-br from-[#f8fafc] to-[#e3e7ed] backdrop-blur-xl rounded-2xl shadow-2xl border border-[#e3e7ed]">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#232946] font-serif tracking-tight">
        Book Now Instantly
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4B3221] font-semibold text-base">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-lg border border-[#e3e7ed] bg-white/95 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B3221]/30 focus:border-[#4B3221] transition-all duration-200 text-[#232946]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4B3221] font-semibold text-base">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 rounded-lg border border-[#e3e7ed] bg-white/95 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B3221]/30 focus:border-[#4B3221] transition-all duration-200 text-[#232946]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4B3221] font-semibold text-base">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+91-12345678"
                    className="w-full px-4 py-2 rounded-lg border border-[#e3e7ed] bg-white/95 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B3221]/30 focus:border-[#4B3221] transition-all duration-200 text-[#232946]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selectedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4B3221] font-semibold text-base">
                  Date
                </FormLabel>
                <FormControl>
                  <div className="rounded-lg bg-white/95 border border-[#e3e7ed] p-2">
                    <DateRangePickerWithInlineButtons
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        setSelectedDate({
                          from: value.from ?? undefined,
                          to: value.to ?? undefined,
                        });
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4B3221] font-semibold text-base">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message..."
                    className="w-full px-4 py-2 rounded-lg border border-[#e3e7ed] bg-white/95 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B3221]/30 focus:border-[#4B3221] transition-all duration-200 text-[#232946] min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4B3221] to-[#232946] hover:from-[#232946] hover:to-[#4B3221] text-white font-semibold py-2 rounded-lg shadow transition-all duration-200 text-lg tracking-wide"
          >
            Send via WhatsApp
          </Button>
        </form>
      </Form>
    </div>
  );
}
