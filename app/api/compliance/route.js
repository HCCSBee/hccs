import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const RISK_COLORS = { LOW: "#16a34a", MEDIUM: "#d97706", HIGH: "#dc2626" };
const RISK_LABELS = { LOW: "Low Risk", MEDIUM: "Medium Risk", HIGH: "High Risk" };

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

async function generateCompliancePDF(body) {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const results    = body.results || {};
  const riskLevel  = results.riskLevel  || "UNKNOWN";
  const totalScore = results.totalScore ?? 0;
  const primaryRisk = results.primaryRisk || "N/A";
  const alerts  = results.alerts  || [];
  const answers = results.answers || [];
  const riskHex   = RISK_COLORS[riskLevel] || "#1e293b";
  const riskLabel = RISK_LABELS[riskLevel]  || riskLevel;
  const dateStr   = new Date().toLocaleDateString("en-SG");

  const PAGE_W = 595, PAGE_H = 842, M = 50;
  const textW = PAGE_W - M * 2;
  const colLabel = 140;

  function addPage() {
    const p = pdfDoc.addPage([PAGE_W, PAGE_H]);
    // footer
    p.drawText(`HCCS Compliance Scan Report  |  Generated ${dateStr}`, {
      x: M, y: 20, size: 7, font: fontRegular, color: hexToRgb("#94a3b8"),
    });
    return { page: p, y: PAGE_H - M };
  }

  function drawText(ctx, text, x, yRef, opts = {}) {
    const size  = opts.size  || 10;
    const font  = opts.bold  ? fontBold : fontRegular;
    const color = hexToRgb(opts.color || "#1e293b");
    const maxW  = opts.maxW  || textW;

    // word-wrap
    const words = String(text).split(" ");
    let line = "";
    let curY = yRef;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) > maxW && line) {
        ctx.drawText(line, { x, y: curY - size, size, font, color });
        curY -= size + 3;
        line = word;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.drawText(line, { x, y: curY - size, size, font, color });
      curY -= size + 3;
    }
    return curY; // new y after text
  }

  function drawHRule(page, y, color = "#e2e8f0") {
    page.drawLine({
      start: { x: M, y }, end: { x: PAGE_W - M, y },
      thickness: 0.5, color: hexToRgb(color),
    });
  }

  // ─── PAGE 1 ───────────────────────────────────────────────────────────────
  let { page, y } = addPage();

  // Header banner
  page.drawRectangle({ x: 0, y: PAGE_H - 80, width: PAGE_W, height: 80, color: hexToRgb("#065f46") });
  page.drawText("HR Compliance Scan Report", { x: M, y: PAGE_H - 40, size: 18, font: fontBold, color: hexToRgb("#ffffff") });
  page.drawText("Human Capital Consulting Singapore (HCCS)", { x: M, y: PAGE_H - 60, size: 9, font: fontRegular, color: hexToRgb("#6ee7b7") });
  y = PAGE_H - 100;

  // Company Details heading
  y = drawText({ drawText: (t, o) => page.drawText(t, o) }, "Company Details", M, y, { bold: true, size: 12 });
  y -= 4;
  drawHRule(page, y);
  y -= 12;

  const details = [
    ["Company",  body.company_name   || "—"],
    ["Contact",  body.contact_name   || "—"],
    ["Email",    body.business_email || "—"],
    ["Phone",    body.contact_number || "—"],
    ["Industry", body.industry       || "—"],
  ];
  for (const [label, value] of details) {
    page.drawText(label, { x: M, y, size: 10, font: fontRegular, color: hexToRgb("#64748b") });
    page.drawText(String(value), { x: M + colLabel, y, size: 10, font: fontBold, color: hexToRgb("#1e293b") });
    y -= 18;
  }

  // Risk Summary heading
  y -= 10;
  y = drawText({ drawText: (t, o) => page.drawText(t, o) }, "Risk Assessment Summary", M, y, { bold: true, size: 12 });
  y -= 4;
  drawHRule(page, y);
  y -= 12;

  const summaryRows = [
    ["Total Score",       String(totalScore), "#1e293b"],
    ["Risk Level",        riskLabel,          riskHex],
    ["Primary Risk Area", primaryRisk,        "#1e293b"],
  ];
  for (const [label, value, color] of summaryRows) {
    page.drawText(label, { x: M, y, size: 10, font: fontRegular, color: hexToRgb("#64748b") });
    page.drawText(String(value), { x: M + colLabel, y, size: 10, font: fontBold, color: hexToRgb(color) });
    y -= 18;
  }

  // Alerts
  if (alerts.length > 0) {
    y -= 10;
    y = drawText({ drawText: (t, o) => page.drawText(t, o) }, "Risk Alerts", M, y, { bold: true, size: 12 });
    y -= 4;
    drawHRule(page, y);
    y -= 12;
    for (const alert of alerts) {
      const alertLine = `! ${alert}`;
      // simple wrap
      const charsPerLine = Math.floor(textW / 5.5);
      for (let pos = 0; pos < alertLine.length; pos += charsPerLine) {
        page.drawText(alertLine.slice(pos, pos + charsPerLine), { x: M, y, size: 9, font: fontRegular, color: hexToRgb("#92400e") });
        y -= 14;
      }
      y -= 4;
    }
  }

  // ─── PAGE 2 — Q&A Breakdown ───────────────────────────────────────────────
  ({ page, y } = addPage());
  y = PAGE_H - M;
  y = drawText({ drawText: (t, o) => page.drawText(t, o) }, "Question-by-Question Breakdown", M, y, { bold: true, size: 13 });
  y -= 6;
  drawHRule(page, y);
  y -= 14;

  for (const a of answers) {
    if (y < 120) {
      ({ page, y } = addPage());
      y = PAGE_H - M;
    }
    // Category label
    page.drawText(`Q${a.question_number}  |  ${String(a.category).toUpperCase()}`, { x: M, y, size: 8, font: fontBold, color: hexToRgb("#94a3b8") });
    y -= 13;

    // Question (simple line wrap at 80 chars approx)
    const qText = String(a.question);
    const charsPerLine = 90;
    for (let pos = 0; pos < qText.length; pos += charsPerLine) {
      if (y < 80) { ({ page, y } = addPage()); y = PAGE_H - M; }
      page.drawText(qText.slice(pos, pos + charsPerLine), { x: M, y, size: 9, font: fontRegular, color: hexToRgb("#1e293b") });
      y -= 13;
    }

    const ansColor = a.score === 0 ? "#16a34a" : a.score === 1 ? "#d97706" : "#dc2626";
    page.drawText(`Answer: ${a.selected}`, { x: M, y, size: 9, font: fontBold, color: hexToRgb(ansColor) });
    y -= 22;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

function buildEmailHtml(body) {
  const results   = body.results   || {};
  const riskLevel = results.riskLevel  || "UNKNOWN";
  const totalScore = results.totalScore ?? 0;
  const primaryRisk = results.primaryRisk || "N/A";
  const alerts  = results.alerts  || [];

  const riskHex   = RISK_COLORS[riskLevel] || "#1e293b";
  const riskLabel = RISK_LABELS[riskLevel]  || riskLevel;

  const alertRows = alerts.map(
    (a) => `<li style="padding:6px 0;font-size:13px;color:#92400e;">&#9888; ${a}</li>`
  ).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:580px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

  <!-- Header -->
  <tr>
    <td style="background:#065f46;padding:28px 32px;">
      <p style="margin:0;font-size:11px;color:#6ee7b7;letter-spacing:1px;text-transform:uppercase;">HCCS</p>
      <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff;font-weight:700;">Your Compliance Scan Results</h1>
    </td>
  </tr>

  <!-- Greeting -->
  <tr>
    <td style="padding:28px 32px 16px;">
      <p style="margin:0;font-size:15px;color:#374151;">Hi <strong>${body.contact_name || "there"}</strong>,</p>
      <p style="margin:12px 0 0;font-size:14px;color:#6b7280;line-height:1.6;">
        Thank you for completing the HCCS HR Compliance Scan. Your personalised report is attached as a PDF.
        Here is a summary of your results:
      </p>
    </td>
  </tr>

  <!-- Risk Score Banner -->
  <tr>
    <td style="padding:0 32px 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid ${riskHex};border-radius:10px;overflow:hidden;">
        <tr>
          <td style="padding:16px 20px;background:#f9fafb;border-right:1px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Total Score</p>
            <p style="margin:4px 0 0;font-size:28px;font-weight:700;color:#111827;">${totalScore}</p>
          </td>
          <td style="padding:16px 20px;background:#f9fafb;">
            <p style="margin:0;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Risk Level</p>
            <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:${riskHex};">${riskLabel}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding:12px 20px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#6b7280;">Primary Risk Area: <strong style="color:#111827;">${primaryRisk}</strong></p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  ${alertRows ? `<!-- Alerts -->
  <tr>
    <td style="padding:0 32px 20px;">
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:14px 16px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.5px;">Risk Alerts</p>
        <ul style="margin:0;padding-left:18px;">${alertRows}</ul>
      </div>
    </td>
  </tr>` : ""}

  <!-- Company details -->
  <tr>
    <td style="padding:0 32px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:13px;">
        ${body.company_name ? `<tr style="background:#f9fafb;"><td style="padding:10px 14px;color:#6b7280;width:40%;border-bottom:1px solid #e5e7eb;">Company</td><td style="padding:10px 14px;color:#111827;font-weight:600;border-bottom:1px solid #e5e7eb;">${body.company_name}</td></tr>` : ""}
        ${body.industry ? `<tr><td style="padding:10px 14px;color:#6b7280;width:40%;border-bottom:1px solid #e5e7eb;">Industry</td><td style="padding:10px 14px;color:#111827;border-bottom:1px solid #e5e7eb;">${body.industry}</td></tr>` : ""}
      </table>
    </td>
  </tr>

  <!-- PDF note -->
  <tr>
    <td style="padding:0 32px 24px;">
      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
        Your full report with a question-by-question breakdown is attached as a <strong>PDF</strong>.
        Our team may follow up with tailored recommendations based on your results.
      </p>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="padding:0 32px 28px;">
      <a href="https://hccs.sg/consultation" style="display:inline-block;background:#065f46;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;">
        Book a Free Expert Review
      </a>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f9fafb;padding:18px 32px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;">
        This report was generated by the HCCS HR Compliance Scan tool and is for guidance only — not legal advice.<br/>
        If this was not you, please disregard this email.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(req) {
  const body = await req.json();

  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Server is not configured." }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await supabase.from("compliance_scan").insert({
    company_name:       body.company_name       ?? null,
    contact_name:       body.contact_name       ?? null,
    business_email:     body.business_email     ?? null,
    contact_number:     body.contact_number     ?? null,
    industry:           body.industry           ?? null,
    employess:          body.employess          ?? null,
    has_foreign_workers: body.has_foreign_workers ?? 0,
    results:            body.results,
  });

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

  if (EMAIL_ADDRESS && EMAIL_PASSWORD && body.business_email) {
    try {
      const pdfBuffer = await generateCompliancePDF(body);
      const html = buildEmailHtml(body);

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user: EMAIL_ADDRESS, pass: EMAIL_PASSWORD },
      });

      await transporter.sendMail({
        from: `"HCCS" <${EMAIL_ADDRESS}>`,
        to: body.business_email,
        subject: "Your HCCS HR Compliance Scan Report",
        text: `Hi ${body.contact_name || "there"},\n\nThank you for completing the HCCS HR Compliance Scan.\n\nRisk Level: ${body.results?.riskLevel || "N/A"}\nTotal Score: ${body.results?.totalScore ?? 0}\nPrimary Risk: ${body.results?.primaryRisk || "N/A"}\n\nYour full report is attached as a PDF.\n\nTo book a free expert review, visit: https://hccs.sg/consultation\n\nHCCS Team`,
        html,
        attachments: [
          {
            filename: "HCCS-Compliance-Report.pdf",
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });
    } catch (emailErr) {
      console.error("Email/PDF error:", emailErr);
      // Non-fatal — submission already saved
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
