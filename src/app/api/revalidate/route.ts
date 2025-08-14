import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// This secret should be stored in an environment variable
const WEBHOOK_SECRET = process.env.STRAPI_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  // Verify the webhook secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    try {
      const body = await request.json();
      console.log("Webhook received:", body);

      // Example logic based on Strapi webhook payload
      // The exact structure of `body` depends on your Strapi webhook configuration
      const { event, model, entry } = body;

      // Revalidate paths based on the model that was updated
      switch (model) {
        case "banner":
          revalidatePath("/");
          revalidatePath("/home");
          break;
        case "room":
          revalidatePath("/room");
          revalidatePath(`/room/${entry?.documentId}`);
          break;
        case "amenity":
          revalidatePath("/");
          revalidatePath("/home");
          break;
        case "about":
          revalidatePath("/about");
          break;
        case "dinning":
          revalidatePath("/dinning");
          break;
        case "gallery":
          // Revalidate the main gallery page and paginated pages
          revalidatePath("/gallery");
          // Revalidate a range of paginated gallery pages
          // Adjust the range (1 to 20) based on your expected maximum number of pages
          for (let i = 1; i <= 20; i++) {
            revalidatePath(`/gallery/${i}`);
          }
          break;
        case "contact":
          revalidatePath("/contact");
          break;
        default:
          // Revalidate the home page and a few key paths by default
          revalidatePath("/");
          revalidatePath("/home");
      }

      // Optionally, revalidate by tag if you're using `revalidateTag` in your data fetching
      // revalidateTag(model);

      return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
      console.error("Error during revalidation:", err);
      return NextResponse.json(
        { message: "Error revalidating" },
        { status: 500 }
      );
    }
  }
}
