import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const numbers = body.numbers.split(",");
  const template = body.template;

  const token = "EAAigZC26sBFABQ0iesYRo0D1GSZBLWaxQDXlDhB27F1nZATRaew34YAoWvyx699j9KX8VxMHEG0YcXXtgw2ZBbkLX5JZCMdWovvltNXpLWG9JXPRhoqnjYxfAfZAANzyJJZCZB2TBbRS8HqhvIi3Dd7aXMkkiZBFEDSd8HjL8JtSje3LfeUT7BXJAwSaX8yTDWEFrZBhiefk6TS7yw7jgrZCTOqE6qs5MO6aqnM2BsBq34aSMYJVFLpt2zZAIkZC7ezQ34G0F0Box6dmRGZBhtpZAQ7rQZCcALPC4ZBU8Fzr4MQZDZD";
  const phone_number_id = "918219681384493";

  for (const num of numbers) {

    await fetch(
      `https://graph.facebook.com/v19.0/${918219681384493}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: num.trim(),
          type: "template",
          template: {
            name: template,
            language: {
              code: "mr"
            }
          }
        }),
      }
    );
  }

  return NextResponse.json({
    message: "WhatsApp Campaign Sent Successfully"
  });
}