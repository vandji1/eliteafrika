'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Download, ArrowRight, Package, ShieldCheck } from 'lucide-react';

export default function SuccessPage() {
  const transactionDetails = {
    id: "EA-88293-TX",
    amount: "45.000 FCFA",
    date: "17 Déc. 2025",
    method: "Mobile Money / Carte"
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        {/* Animation de l'icône de succès */}
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center"
          >
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
              <Check className="text-white" size={40} strokeWidth={3} />
            </div>
          </motion.div>
        </div>

        {/* Texte principal */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-slate-900 mb-3"
          >
            Achat Confirmé !
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            Merci pour votre confiance. Votre commande est en cours de préparation par l&apos;équipe EliteAfrika.
          </motion.p>
        </div>

        {/* Carte Récapitulative */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-8"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
            <Package className="text-emerald-600" size={20} />
            <span className="font-bold text-slate-800">Détails de la transaction</span>
          </div>

          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <span className="text-slate-500">Référence</span>
            <span className="text-right font-semibold text-slate-900">{transactionDetails.id}</span>
            
            <span className="text-slate-500">Date</span>
            <span className="text-right font-semibold text-slate-900">{transactionDetails.date}</span>
            
            <span className="text-slate-500">Montant total</span>
            <span className="text-right font-bold text-emerald-600 text-lg">{transactionDetails.amount}</span>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all active:scale-95">
            <Download size={18} />
            Reçu PDF
          </button>
          
          <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all active:scale-95">
            Suivre l&apos;achat
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Note de sécurité */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs italic">
          <ShieldCheck size={14} />
          Paiement sécurisé par EliteAfrika Gateway
        </div>
      </div>
    </div>
  );
}