import { revalidatePath } from 'next/cache';
import { NextResponse } from "next/server";

interface StrapiWebhookEvent {
  model: string;
  entry: {
    slug?: string;
    id?: number;
    [key: string]: any;
  };
  secret?: string;
  [key: string]: any;
}

// Revalidate pages per model
function revalidateByModel(model: string, slug?: string) {
  switch (model) {
    case "post":
      if (slug) revalidatePath(`/posts/${slug}`);
      revalidatePath(`/`);
      break;

    case "category":
      if (slug) revalidatePath(`/category/${slug}`);
      revalidatePath(`/categories`);
      break;

    case "tag":
      if (slug) revalidatePath(`/tag/${slug}`);
      revalidatePath(`/tags`);
      break;

    case "author":
      if (slug) revalidatePath(`/author/${slug}`);
      revalidatePath(`/authors`);
      break;

    default:
      console.warn(`[Webhook] Unknown model: ${model}`);
  }
}

export async function POST(req: Request) {
  try {
    // Parse body
    const body = (await req.json()) as StrapiWebhookEvent;

    // Verify secret
    const secret = process.env.REVALIDATE_SECRET;
    if (secret && body.secret !== secret) {
      return NextResponse.json(
        { ok: false, message: "Invalid secret" },
        { status: 401 }
      );
    }

    // Ensure model & entry exist
    if (!body.model || !body.entry) {
      return NextResponse.json(
        { ok: false, message: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    // Extract slug
    const slug = body.entry.slug;

    // Execute revalidation
    revalidateByModel(body.model, slug);

    // Return success
    return NextResponse.json({
      ok: true,
      message: "Revalidated successfully",
      model: body.model,
      slug: slug || null,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
