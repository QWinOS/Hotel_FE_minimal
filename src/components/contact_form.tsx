// pages/contact.js
import { useState } from "react";
import { WhatsAppForm } from "./WhatsAppForm";

export default function ContactForm() {
  <WhatsAppForm />;
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     message: "",
  //     number: "",
  //   });
  //   const [successMessage, setSuccessMessage] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");

  //   const handleChange = (e: any) => {
  //     const { name, value } = e.target;
  //     console.log(`Field changed: ${name} = ${value}`);
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleSubmit = async (e: any) => {
  //     e.preventDefault();
  //     try {
  //       const res = await fetch("/api/contact", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(formData),
  //       });
  //       console.log(res);

  //       const { name, email, message } = formData;
  //       // 🔥 BOLD formatting using asterisks (*)
  //       const whatsappMessage = `*Name:* ${name}\n *Email:* ${email}\n *Message:* ${message}`;

  //       // 🧾 Encode the message for URL safety
  //       const encodedMessage = encodeURIComponent(whatsappMessage);
  //       const whatsappURL = `https://wa.me/916291222796?text= ${whatsappMessage}`;

  //       console.log("WhatsApp URL:", whatsappURL);
  //       window.location.href = whatsappURL; // Redirects to WhatsApp

  //       if (res.ok) {
  //         setSuccessMessage("Message sent successfully!");
  //         setErrorMessage("");
  //         setFormData({ name: "", email: "", message: "", number: "" });
  //       } else {
  //         throw new Error("Failed to send message.");
  //       }
  //     } catch (error: any) {
  //       setErrorMessage(error.message);
  //       setSuccessMessage("");
  //     }
  //   };

  //   return (
  //     <div style={{ padding: "2rem" }}>
  //       <h1>Contact Us</h1>
  //       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
  //       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
  //       <form onSubmit={handleSubmit}>
  //         <div>
  //           <label>
  //             Name:
  //             <input
  //               type="text"
  //               name="name"
  //               value={formData.name}
  //               onChange={handleChange}
  //               required
  //             />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             Email:
  //             <input
  //               type="email"
  //               name="email"
  //               value={formData.email}
  //               onChange={handleChange}
  //               required
  //             />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             Contact No:
  //             <input
  //               type="number"
  //               name="number"
  //               value={formData.number}
  //               onChange={handleChange}
  //               required
  //             />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             Additional Details:
  //             <textarea
  //               name="message"
  //               value={formData.message}
  //               onChange={handleChange}
  //               required
  //             />
  //           </label>
  //         </div>
  //         <button type="submit">Submit</button>
  //       </form>
  //     </div>
  //   );
}
