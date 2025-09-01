// app/page.tsx
"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="w-full bg-slate-950 shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <img src="/logo_pieces24_alpha.png" alt="Pieces24 Logo" className="h-12 w-auto" />
          <nav className="space-x-6">
            <a href="#features" className="hover:text-red-600 text-amber-50 transition-colors font-medium hidden">Fonctionnalités</a> 
            <a href="#contact" className="hover:text-red-600 text-amber-50 transition-colors font-medium hidden">Obtenir un devis</a>
            <a href="#contact" className="hover:text-red-600 text-amber-50 transition-colors font-medium hidden ">Temoingnages</a>
            <a href="#contact" className="hover:text-red-600 text-amber-50 transition-colors font-medium hidden ">Contact</a>
            <Link href="/pieces24">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Voir les pièces
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32">
        <h2 className="text-5xl sm:text-6xl font-bold text-red-600 mb-6">Trouvez vos pièces auto rapidement</h2>
        <p className="text-gray-700 text-lg sm:text-xl mb-8 max-w-2xl">
          Pieces24 vous permet de sélectionner votre marque, modèle et année pour accéder aux pièces dont vous avez besoin, simplement et rapidement.
        </p>
        <Link href="/pieces24">
          <button className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-red-700 transition-colors">
            Découvrir les pièces
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-red-600 mb-3">Large sélection</h3>
            <p className="text-gray-700">
              Des milliers de pièces pour toutes les marques et modèles, toutes les années.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-red-600 mb-3">Navigation facile</h3>
            <p className="text-gray-700">
              Sélectionnez votre voiture étape par étape et trouvez rapidement les pièces dont vous avez besoin.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-red-600 mb-3">Prix compétitifs</h3>
            <p className="text-gray-700">
              Comparez et choisissez les pièces au meilleur prix, sans compromis sur la qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-600 py-20 px-6 text-center text-white">
        <h3 className="text-3xl sm:text-4xl font-bold mb-6">Prêt à trouver vos pièces ?</h3>
        <p className="text-lg sm:text-xl mb-6 max-w-xl mx-auto">
          Commencez dès maintenant et découvrez notre large sélection de pièces pour votre voiture.
        </p>
        <Link href="/pieces24">
          <button className="bg-white text-red-600 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors">
            Explorer les pièces
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white py-10 px-6 mt-0 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-red-600 font-bold text-lg mb-2">Contactez-nous</h4>
          <p className="text-gray-700 mb-4">support@pieces24.com</p>
          <p className="text-gray-500 text-sm">&copy; 2025 Pieces24. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
