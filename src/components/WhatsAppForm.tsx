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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleSubmitAction } from "@/actions/handle-submit.action";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  members: z.string(),
  message: z.string().min(2, "Message must be at least 2 characters"),
  selectedDate: z
    .object({
      from: z.string().min(1, "Please select a starting date"),
      to: z.string().min(1, "Please select an ending date"),
    })
    .refine((data) => data.from || data.to, {
      message: "Please select a date range",
    }),
});

export function WhatsAppForm({ roomType }: { roomType: string }) {
  const [selectedDate, setSelectedDate] = useState<{
    from: string | undefined;
    to: string | undefined;
  }>({
    from: "",
    to: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      members: "1",
      message: "",
      selectedDate: {
        from: selectedDate?.from,
        to: selectedDate?.to,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { name, email, phone, members, message, selectedDate } = values;
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

    const whatsapp_No = process.env.NEXT_PUBLIC_WHATSAPP_NO;
    // Escape WhatsApp markdown characters in the message content
    const escapedMessage = message
      .replace(/\*/g, "\\*") // Escape asterisks for bold
      .replace(/_/g, "\\_") // Escape underscores for italics
      .replace(/~/g, "\\~"); // Escape tildes for strikethrough

    const whatsappMessage = `*Name:* ${name}\n *Email:* ${email}\n *Phone:* ${phone}\n *Room Type:* ${roomType}\n *No. of Members:* ${members}\n *Message:* ${escapedMessage}${dateString}`;
    const whatsappURL = `https://wa.me/91${whatsapp_No}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    try {
      const returnedUrl = await handleSubmitAction(
        name,
        email,
        phone,
        members,
        roomType,
        escapedMessage,
        selectedDate
      );
      if (returnedUrl === true) {
        toast.success(
          "Thank you email sent successfully! We will get back to you soon."
        );
        setTimeout(() => {
          window.open(whatsappURL, "_blank");
        }, 1500);
      } else {
        toast.error("Failed to send email. Please try via WhatsApp.");
        setTimeout(() => {
          window.open(whatsappURL, "_blank");
        }, 1000);
      }
    } catch (error) {
      console.error("Error in onSubmit: ", error);
      toast.error("Failed to send inquiry. Please try via WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-900/90">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-md border border-slate-300/70 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/80 focus:border-ring transition-all duration-200 text-slate-900"
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
              <FormLabel className="text-sm font-medium text-slate-900/90">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-md border border-slate-300/70 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/80 focus:border-ring transition-all duration-200 text-slate-900"
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
              <FormLabel className="text-sm font-medium text-slate-900/90">
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="9444211333"
                  className="w-full px-4 py-3 rounded-md border border-slate-300/70 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/80 focus:border-ring transition-all duration-200 text-slate-900"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="members"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-900/90">
                No. of Members
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full px-4 py-3 rounded-md border border-slate-300/70 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/80 focus:border-ring transition-all duration-200 text-slate-900">
                    <SelectValue placeholder="Select the number of members" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="selectedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-900/90">
                Date
              </FormLabel>
              <FormControl>
                <div className="rounded-md bg-white/70 border border-slate-300/70 p-2">
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
              <FormLabel className="text-sm font-medium text-slate-900/90">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-md border border-slate-300/70 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/80 focus:border-ring transition-all duration-200 min-h-[100px] text-slate-900"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#023047] hover:bg-[#023e5a] text-white font-semibold py-3 rounded-md shadow-sm hover:shadow-md transform hover:-translate-y-px transition-all duration-300 text-base tracking-wide"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send via WhatsApp"}
        </Button>
      </form>
    </Form>
  );
}
