import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! //utilisable uniquement côté serveur
);

export async function GET() {
  const { data: tickets, error } = await supabase
    .from('ticket_physique')
    .select('id_ticket, type, statut')
    .eq('type', 'VVIP') // 🟢 "Standard" avec majuscule si c’est ce que tu as stocké
    .limit(500);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = await Promise.all(
    tickets.map(async (ticket) => {
      const url = `Ticket-Physique-Eliteafrika_${ticket.id_ticket}`;
      const qrDataUrl = await QRCode.toDataURL(url);
      return {
        id: ticket.id_ticket,
        type: ticket.type,
        statut: ticket.statut,
        qr: qrDataUrl,
      };
    })
  );

  return NextResponse.json(result);
}