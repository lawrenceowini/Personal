const TO_EMAIL = "lawrenceowini17@gmail.com";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are all required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (!process.env.RESEND_API_KEY) {
    // Not configured yet -- fail clearly instead of pretending it worked.
    return res.status(500).json({
      error:
        "The contact form isn't set up yet. Please email directly instead.",
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: TO_EMAIL,
        reply_to: email,
        subject: `New message from ${name} via portfolio site`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Resend API error ${response.status}: ${body}`);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return res.status(500).json({
      error:
        "Something went wrong sending your message. Please try emailing directly.",
    });
  }
}
