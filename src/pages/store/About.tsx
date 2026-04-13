import CustomButton from "@/components/ui/button";

export default function About() {
  return (
    <main className="space-y-24 pb-24">
      {/* 1. Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center px-6 overflow-hidden bg-slate-900">
        <img src="/placeholder-images.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="About Hero" />
        <div className="relative z-10 max-w-3xl space-y-6">
           <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">We build the future of e-commerce.</h1>
           <p className="text-slate-300 text-lg md:text-xl">Providing authentic products with a premium shopping experience since 2024.</p>
           <CustomButton size="lg" className="rounded-full px-10">Join Our Story</CustomButton>
        </div>
      </section>

      {/* 2. Philosophy Section */}
      <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
           <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Philosophy</span>
           <h2 className="text-4xl font-extrabold text-foreground">Quality is not an option, it's a promise.</h2>
           <p className="text-muted text-lg leading-relaxed">
             We started with a simple idea: everyone deserves access to genuine, high-quality products without the premium price tag. Over the years, we have built relationships with the world's most trusted manufacturers to bring you only the best.
           </p>
           <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                 <p className="text-3xl font-extrabold text-primary">10K+</p>
                 <p className="text-sm font-bold text-muted uppercase">Happy Users</p>
              </div>
              <div>
                 <p className="text-3xl font-extrabold text-primary">500+</p>
                 <p className="text-sm font-bold text-muted uppercase">Premium Brands</p>
              </div>
           </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700">
           <img src="/placeholder-images.jpg" alt="Team" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="container mx-auto px-6 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
           <h2 className="text-4xl font-extrabold text-foreground">Why choose Antigravity?</h2>
           <p className="text-muted">We combine technology with human touch to deliver excellence.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Eco-Friendly", desc: "Our packaging is 100% recyclable.", icon: "🌱" },
             { title: "Global Support", desc: "24/7 dedicated support team.", icon: "🌍" },
             { title: "Fast Shipping", desc: "Delivery within 24-48 hours.", icon: "⚡" },
           ].map((val, idx) => (
             <div key={idx} className="p-10 border border-border rounded-3xl bg-white hover:border-primary transition-colors text-center space-y-4 shadow-sm">
                <span className="text-5xl block">{val.icon}</span>
                <h3 className="text-xl font-extrabold text-foreground">{val.title}</h3>
                <p className="text-muted leading-relaxed">{val.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </main>
  );
}
