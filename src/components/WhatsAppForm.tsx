// app/components/WhatsAppForm.tsx
"use client";

import { date, z } from "zod";
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
import { DatePickerWithRange } from "./ui/Date_Picker_Old";
import { useState } from "react";
import { DateRange } from "react-day-picker";
// import { addDays } from "date-fns";
import { DatePickerForm } from "./ui/Date_Picker";
import DateRangePickerWithInlineButtons from "./ui/Date_Picker_Clean";
import { se } from "date-fns/locale";

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
      message: "Please select a date range ss",
    }),
});

export function WhatsAppForm() {
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
  //   undefined
  // );
  // const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
  //   undefined
  // );
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
    // console.log(selectedDate.from, selectedDate.to);
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
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Book Now !!!</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+91-12345678" {...field} />
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
                <FormLabel>Date</FormLabel>
                <FormControl>
                  {/* <DateRangePickerWithInlineButtons /> */}
                  <DateRangePickerWithInlineButtons
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setSelectedDate({
                        from: value.from ?? undefined,
                        to: value.to ?? undefined,
                      }); // optional, if you want local state too
                    }}
                  />
                  {/* <DatePickerWithRange
                    date={field.value}
                    onChange={(value: any) => {
                      field.onChange(value);
                      setSelectedDate(value);
                    }}
                  /> */}
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
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Send via WhatsApp
          </Button>
        </form>
      </Form>
    </div>
  );
}
