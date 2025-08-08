import Image from "next/image";

const colors = {
  primaryGradient: "from-white-700 via-white-600 to-orange-500",
  primaryText: "text-white-900",
  primaryBgLight: "from-white-50 via-orange-50 to-indigo-100",
  primaryBtnBg: "bg-indigo-400",
  primaryBtnHoverBg: "hover:bg-indigo-300",
  primaryBtnText: "text-white-900",
  secondaryBtnBorder: "border-indigo-400",
  secondaryBtnText: "text-indigo-400",
  secondaryBtnHoverBg: "hover:bg-white-400",
  secondaryBtnHoverText: "hover:text-white-900",
  ctaBgGradient: "from-indigo-400 to-white-600",
  footerBg: "bg-white-900",
  footerText: "text-white",
};

export default function Home() {
  return (
    <main
      className={`min-h-screen font-sans bg-gradient-to-br bg-clip-text text-transparent ${colors.primaryGradient}`}
    >
      {/* HEADER */}
      <header
        className={`flex justify-between items-center px-8 py-6 max-w-7xl mx-auto text-white`}
      >
        <h1 className="text-3xl font-extrabold tracking-wide">EliteAfrika</h1>
        <nav className="hidden md:flex gap-8 font-semibold text-lg">
          <a
            href="#features"
            className="hover:underline hover:text-indigo-300 transition"
          >
            Fonctionnalités
          </a>
          <a
            href="#artists"
            className="hover:underline hover:text-indigo-300 transition"
          >
            Artistes
          </a>
          <a
            href="#download"
            className="hover:underline hover:text-indigo-300 transition"
          >
            Télécharger
          </a>
        </nav>
        <a
          href="#download"
          className={`${colors.primaryBtnBg} ${colors.primaryBtnText} font-bold px-5 py-2 rounded-full shadow-lg ${colors.primaryBtnHoverBg} transition`}
        >
          Télécharger l&apos;app
        </a>
      </header>

      {/* HERO */}
      <section
        className={`flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto gap-10 text-white`}
      >
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-5xl font-extrabold leading-tight drop-shadow-lg">
            Achetez vos billets et découvrez des œuvres digitales uniques
          </h2>
          <p className="text-xl max-w-xl drop-shadow-md">
            EliteAfrika connecte les passionnés aux meilleurs événements et œuvres artistiques digitales
            d’Afrique.
          </p>
          <div className="flex gap-6">
            <a
              href="#download"
              className={`${colors.primaryBtnBg} ${colors.primaryBtnText} px-8 py-3 rounded-full font-semibold shadow-lg ${colors.primaryBtnHoverBg} transition`}
            >
              Télécharger l&apos;app
            </a>
            <a
              href="#features"
              className={`border-2 ${colors.secondaryBtnBorder} ${colors.secondaryBtnText} px-8 py-3 rounded-full font-semibold ${colors.secondaryBtnHoverBg} ${colors.secondaryBtnHoverText} transition`}
            >
              En savoir plus
            </a>
          </div>
        </div>

        <div className="md:w-1/2">
          <Image
            src="/shopping.jpg"
            alt="Image événement musical africain"
            width={600}
            height={600}
            className="rounded-3xl shadow-2xl"
            priority
          />
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section
        id="features"
        className={`bg-gradient-to-tr ${colors.primaryBgLight} py-20 px-8`}
      >
        <h3
          className={`text-4xl font-extrabold text-center ${colors.primaryText} mb-16`}
        >
          Pourquoi choisir EliteAfrika ?
        </h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Achat de tickets facile",
              desc: "Réservez vos places en quelques clics, où que vous soyez.",
              img: "https://static.vecteezy.com/system/resources/thumbnails/048/451/880/small_2x/event-ticket-template-design-white-and-blue-vector.jpg",
            },
            {
              title: "Œuvres digitales uniques",
              desc: "Découvrez et collectionnez les créations numériques des artistes africains.",
              img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=60",
            },
            {
              title: "Paiement sécurisé",
              desc: "Vos transactions sont simples, rapides et protégées à 100%.",
              img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&q=60",
            },
          ].map(({ title, desc, img }, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <Image
                src={img}
                alt={title}
                width={400}
                height={250}
                className="object-cover w-full h-56"
              />
              <div className={`${colors.primaryText} p-6`}>
                <h4 className="text-2xl font-bold mb-3">{title}</h4>
                <p className="text-gray-700">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION ARTISTES */}
      <section
        id="artists"
        className={`py-20 px-8 max-w-4xl mx-auto text-center ${colors.primaryText}`}
      >
        <h3 className="text-4xl font-extrabold mb-8">
          Soutenir les talents africains
        </h3>
        <p className="text-lg leading-relaxed">
          EliteAfrika est un espace dédié aux créateurs pour exposer, vendre et faire rayonner leur art à
          travers le monde.
          Rejoignez la communauté et faites partie de la révolution culturelle digitale africaine.
        </p>
      </section>

      {/* CTA */}
      <section
        id="download"
        className={`bg-gradient-to-r ${colors.ctaBgGradient} py-20 text-center text-white`}
      >
        <h3 className="text-4xl font-extrabold mb-4 drop-shadow-md">
          Téléchargez EliteAfrika maintenant
        </h3>
        <p className="mb-8 max-w-xl mx-auto drop-shadow-sm">
          Rejoignez la communauté et vivez la culture africaine autrement grâce à notre application mobile intuitive.
        </p>
        <a
          href="#"
          className="bg-slate-900 text-white-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-indigo-100 hover:text-slate-600 transition"
        >
          Télécharger
        </a>
      </section>

      {/* FOOTER */}
      <footer
        className={`${colors.footerBg} ${colors.footerText} py-8 text-center text-sm`}
      >
        <p>
          © {new Date().getFullYear()} EliteAfrika. Tous droits réservés. <br />
          Développé par{' '}
          <a
            href="https://oumiservice.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-300 transition"
          >
            Oumiservice
          </a>
        </p>
      </footer>

    </main>
  );
}
