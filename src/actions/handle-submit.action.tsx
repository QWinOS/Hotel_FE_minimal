export async function handleSubmitAction(
  name: string,
  email: string,
  phone: string,
  members: string,
  roomType: string,
  message: string,
  selectedDate: { from: string; to: string }
): Promise<boolean> {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        members,
        roomType,
        message,
        selectedDate,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return true;
  } catch (error) {
    console.error("Error in handleSubmitAction: ", error);
    return false;
  }
}
