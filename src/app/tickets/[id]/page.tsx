import { supabase } from '../../../../supabase';
import QRCode from 'qrcode';
import React from 'react';

export const metadata = { 
  title: "Tickets - EliteAfrika | Accès à vos événements",
  description: "Consultez tous vos tickets achetés pour les événements sur eliteafrika.com. Téléchargez-les, affichez-les, ou présentez-les à l'entrée.",
  openGraph: {
    title: "Mes Tickets - eliteafrika.com",
    description: "Accédez à vos tickets d’événements sur eliteafrika.com et présentez-les facilement à l’entrée.",
    url: "https://eliteafrika.com/tickets",
    siteName: "eliteafrika.com",
    images: [
      {
        url: "https://eliteafrika.com/web-app-manifest-512x512.png",
        width: 1200,
        height: 630,
        alt: "Tickets Eliteafrika",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mes Tickets - eliteafrika.com",
    description: "Consultez et affichez vos tickets achetés sur eliteafrika.com.",
    images: ["https://eliteafrika.com/web-app-manifest-512x512.png"],
    creator: "@EliteAfrikaApp",
  },
};


type PageParams = Promise<{ id: string }>;

const Page = async ({ params }: { params: PageParams }) => {
  const { id } = await params; // 비동기로 변환


  const { data: ticket, error: ticketError } = await supabase
    .from('tickets')
    .select('*, ticket_types(event_id, price, name)')
    .eq('id', id)
    .single();

  if (ticketError || !ticket) {
    return (
      <div className="p-10 font-sans text-start">
        <h2 className="text-2xl font-semibold text-red-600">Ticket invalide ou introuvable</h2>
        <p className="mt-2">Vérifiez que le lien est correct ou contactez le support.</p>
      </div>
    );
  }

  if (!ticket.ticket_types || !ticket.ticket_types.event_id) {
    return (
      <div className="p-10 font-sans text-start">
        <h2 className="text-2xl font-semibold text-red-600">Ticket invalide ou mal configuré</h2>
        <p className="mt-2">Ce ticket ne semble pas être associé à un événement valide.</p>
      </div>
    );
  }

  const { data: eventData, error: eventError } = await supabase
    .from('events')
    .select('title')
    .eq('id', ticket.ticket_types.event_id)
    .single();

  if (eventError || !eventData) {
    return (
      <div className="p-10 font-sans text-start">
        <h2 className="text-2xl font-semibold text-red-600">Événement associé introuvable</h2>
        <p className="mt-2">Ce ticket semble ne pas être relié à un événement valide.</p>
      </div>
    );
  }

  const eventTitle = eventData.title;

  const qrCodeUrl = await QRCode.toDataURL(`EliteAfrika_${ticket.id}`);

  return (
    <div className="flex items-center justify-center min-h-screen py-0 font-sans ">
    <div className="w-full max-w-sm overflow-hidden bg-white rounded-md shadow-md">
      <div className="px-6 py-4 text-center border-b border-gray-200 border-dotted">
        <h2 className="text-xl font-bold tracking-tight text-gray-800 uppercase">{eventTitle}</h2>
        <p className="mt-1 text-sm text-gray-600">TICKET D&lsquo;ENTRÉE</p>
      </div>
      <div className="p-6">
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">ID:</span>
            <span>{ticket.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">email:</span>
            <span>{ticket.firstname} {ticket.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Type:</span>
            <span>{ticket.ticket_types.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Prix:</span>
            <span>{ticket.ticket_types.price} Fcfa</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Statut:</span>
            <span className={`font-medium ${ticket.statut === true ? 'text-green-600' : 'text-red-600'}`}>
                {ticket.statut === true ? 'Valide' : 'Invalide'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Usage:</span>
            <span className={`font-medium ${ticket.used === true ? 'text-red-600' : 'text-green-600'}`}>
                {ticket.used === true ? 'Utilisé' : 'Non utilisé'}
            </span>
          </div>
        </div>
  
        <div className="flex justify-center mt-6">
          <img
            src={qrCodeUrl}
            alt="QR Code du ticket"
            className="w-32 h-32 p-1 border border-gray-300 "
          />
        </div>
  
        <p className="mt-4 text-xs text-center text-gray-500">
          Veuillez présenter ce ticket à l&lsquo;entrée.
        </p>
      </div>
      <div className="py-3 text-xs text-center text-gray-400 border-t border-gray-200">
        Merci de votre participation !
      </div>
    </div>
  </div>
  );
}
export default Page;