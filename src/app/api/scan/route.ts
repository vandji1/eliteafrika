import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../supabase';

export async function GET(req: NextRequest) {
  const ticketId = req.nextUrl.searchParams.get('ticketId');

  if (!ticketId || typeof ticketId !== 'string') {
    return NextResponse.json(
      { error: 'Ticket ID manquant ou invalide' },
      { status: 400 }
    );
  }

  // Détecter si l'ID est un UUID (virtuel)
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    ticketId
  );

  console.log(
    `🔍 Scan du ticket [${ticketId}] → Type détecté : ${
      isUUID ? 'virtuel (UUID)' : 'papier (physique)'
    }`
  );

  try {
    if (isUUID) {
      // 🎫 Ticket virtuel → table "tickets"
      const { data: ticket, error: selectError } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', ticketId)
        .eq('statut', true) // ⚡ booléen (si ta colonne est bien un bool)
        .eq('used', false)
        .maybeSingle();

      if (selectError) {
        return NextResponse.json({ error: selectError.message }, { status: 500 });
      }
      if (!ticket) {
        return NextResponse.json(
          { error: 'Ticket virtuel non trouvé ou déjà utilisé.' },
          { status: 404 }
        );
      }

      const { data: updated, error: updateError } = await supabase
        .from('tickets')
        .update({ used: true })
        .eq('id', ticketId)
        .select('*')
        .maybeSingle();

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({
        message: 'Ticket virtuel validé avec succès ✅',
        ticket: updated,
        type: 'virtuel',
      });
    } else {
      // 🧾 Ticket papier → table "ticket_physique"
      const { data: ticket, error: selectError } = await supabase
        .from('ticket_physique')
        .select('*')
        .eq('id_ticket', ticketId)
        .eq('statut', 'valide') // ⚡ texte si ta colonne est text
        .eq('used', false)
        .maybeSingle();

      if (selectError) {
        return NextResponse.json({ error: selectError.message }, { status: 500 });
      }
      if (!ticket) {
        return NextResponse.json(
          { error: 'Ticket papier non trouvé ou déjà utilisé.' },
          { status: 404 }
        );
      }

      const { data: updated, error: updateError } = await supabase
        .from('ticket_physique')
        .update({ used: true })
        .eq('id_ticket', ticketId)
        .select('*')
        .maybeSingle();

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({
        message: 'Ticket papier validé avec succès ✅',
        ticket: updated,
        type: 'papier',
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('❌ Erreur serveur :', message);
    return NextResponse.json(
      { error: 'Erreur serveur interne', details: message },
      { status: 500 }
    );
  }
}
