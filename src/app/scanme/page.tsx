'use client';

import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { FiInfo } from "react-icons/fi";

export default function PageScan() {
    const [lastCode, setLastCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleScan = async (codes: IDetectedBarcode[]) => {
        const code = codes[0]?.rawValue;

        if (!code || code === lastCode) return;
        setLastCode(code);
        setIsLoading(true);

        try {
            // 🔍 Extraction du ticketId depuis :
            // - "TICKET_abc123"
            // - ou "https://fandrop.io/verif/abc123"
            let ticketId: string | null = null;

            if (code.includes('EliteAfrika')) {
                const match = code.match(/EliteAfrika_([a-zA-Z0-9-]+)/);
                ticketId = match ? match[1] : null;
            } else if (code.includes('_')) {
                ticketId = code.split('_').pop() || null;
            } else {
                ticketId = code; // fallback: utilise directement le code
            }

            console.log('Ticket ID extrait :', ticketId);

            if (!ticketId) {
                showError('QR code invalide.');
                return;
            }

            const res = await fetch(`/api/scan?ticketId=${ticketId}`, {
                method: 'GET',
            });

            const data = await res.json();
            console.log('Réponse du scan :', data);

            if (res.ok) {
                showSuccess(`✅ ${data.message}`);
            } else {
                showError(`❌ ${data.error || 'Ticket invalide'}`);
            }
        } catch (error) {
            console.error('Erreur de scan :', error);
            showError('❌ Erreur réseau lors de la vérification.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetScan = () => {
        setLastCode(null);
    };

    const showSuccess = (message: string) => {
        Swal.fire({
            icon: 'success',
            title: 'Accès validé ✅',
            text: message,
            confirmButtonText: 'OK',
        }).then(() => {
            resetScan();
        });
    };

    const showError = (message: string) => {
        Swal.fire({
            icon: 'error',
            title: 'Accès refusé ❌',
            text: message,
            confirmButtonText: 'OK',
        }).then(() => {
            resetScan();
        });
    };

    return (
        <div className="relative p-4">
            <h2 className="mb-4 text-xl font-bold text-center">Scanner un ticket EliteAfrika</h2>

            <div className="relative max-w-md mx-auto overflow-hidden border shadow-lg rounded-xl">
                <Scanner
                    onScan={handleScan}
                    onError={(err) => console.error('Erreur caméra :', err)}
                    formats={['qr_code']}
                    sound={true}
                    allowMultiple={false}
                    scanDelay={800}
                />
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-blue-600 pointer-events-none bg-white/90">
                        <FiInfo className="w-6 h-6 mb-2 animate-spin" />
                        Vérification du ticket...
                    </div>
                )}
            </div>

            <div className="max-w-md mx-auto mt-4 text-lg text-center text-gray-600">
                <p>- Dirigez la caméra vers le QR code du ticket.</p>
                <p>- Assurez-vous que l&apos;éclairage est suffisant pour une lecture optimale.</p>
                <p>- Autorisez l&apos;accès à la caméra si demandé par le navigateur.</p>
            </div>
        </div>
    );
}
