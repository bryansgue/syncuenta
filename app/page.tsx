"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import PublicHeader from "@/components/PublicHeader";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";



export default function HomePage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const prices = {
    Free: billing === "monthly" ? "$0" : "$0",
    Basic: billing === "monthly" ? "$12" : "$99",
    Pro: billing === "monthly" ? "$29" : "$249",
    Business: billing === "monthly" ? "$79" : "$649",
  };

  return (
    <div 
    className="min-h-screen bg-[#f8fafc] text-gray-800 overflow-hidden">
      <PublicHeader />

      


      {/* HERO */}
      <Hero /> 


{/* HOW IT WORKS */}
<HowItWorks />





      


      {/* FEATURES */}
      <section id="features" className="py-32 bg-[#f9fafb]">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h3 className="text-5xl font-extrabold mb-6">Características clave</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-20">
            Sincroniza, publica y automatiza tu contenido como nunca antes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            <FeatureCard 
              title="Publicación con un clic"
              desc="Publica tu contenido en varias redes conectadas al mismo tiempo."
              footer="Ahorra tiempo publicando sin repetir procesos."
            />

            <FeatureCard 
              title="Integración total"
              desc="Compatibilidad con Instagram, TikTok, Facebook, LinkedIn y Threads."
              footer="Multiplataforma desde un solo panel."
            />

            <FeatureCard 
              title="Seguro y privado"
              desc="Tu información está protegida con estándares modernos."
              footer="Cumple con normas globales."
            />

          </div>
        </div>
      </section>


      {/* PRICING */}
      <PricingSection />

      


      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-blue-600 to-purple-600 text-center text-white">
        <h3 className="text-5xl font-extrabold">Miles de creadores usan Syncuenta</h3>
        <p className="text-xl mt-4 opacity-90">
          Ahorra tiempo y publica en tus redes desde un solo lugar.
        </p>

        <Link 
          href="/register"
          className="mt-10 inline-block px-12 py-5 bg-white text-blue-600 rounded-xl text-2xl font-bold shadow-xl transition transform hover:scale-[1.03]"
        >
          Comenzar gratis
        </Link>
      </section>


      {/* FOOTER */}
      <footer className="py-10 bg-gray-900 text-gray-300 text-center">
        <p>© {new Date().getFullYear()} Syncuenta. Todos los derechos reservados.</p>
        <p className="mt-2 text-sm opacity-70">support@syncuenta.com</p>
      </footer>

    </div>
  );
}



/* --- SUBCOMPONENTS ---------------------- */

function HowStep({ num, title, text }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <div className="
        w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 
        text-white flex items-center justify-center text-3xl font-bold shadow-xl
      ">
        {num}
      </div>
      <h4 className="text-2xl font-bold mt-6">{title}</h4>
      <p className="text-gray-600 mt-2 max-w-xs text-lg">{text}</p>
    </motion.div>
  );
}


function FeatureCard({ title, desc, footer }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
    >
      <h4 className="text-2xl font-bold mb-4">{title}</h4>
      <p className="text-lg text-gray-600 mb-6">{desc}</p>
      <p className="text-blue-600 font-semibold">{footer}</p>
    </motion.div>
  );
}


function PricingCard({ name, price, features, highlight }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`
        rounded-2xl p-8 shadow-lg border 
        ${highlight 
          ? "border-purple-600 shadow-purple-300 scale-[1.03] bg-white" 
          : "border-gray-200 bg-white"
        }
        transition
      `}
    >
      <h4 className="text-3xl font-bold">{name}</h4>

      <p className="
        text-4xl font-extrabold mt-4 
        bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text
      ">
        {price}
      </p>

      <ul className="text-left mt-8 space-y-3">
        {features.map((f: string, i: number) => (
          <li key={i} className="text-gray-700 flex items-start gap-2">
            ✔ <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link 
        href="/register"
        className={`
          block text-center mt-10 py-3 rounded-xl font-semibold
          ${highlight 
            ? "bg-purple-600 text-white hover:bg-purple-700" 
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"}
          transition
        `}
      >
        Probar gratis
      </Link>
    </motion.div>
  );
}

