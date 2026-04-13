import CustomButton from "@/components/ui/button";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <main className="space-y-16 md:space-y-24 pb-24">
      {/* 1. Dynamic Hero Section */}
      <section className="relative min-h-[500px] md:h-[650px] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder-images.jpg"
            className="w-full h-full object-cover opacity-50"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 space-y-6 md:space-y-8 max-w-4xl">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
            New Season 2024
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-[0.9]">
            Style that <br />
            <span className="text-primary italic">Empowers</span> You.
          </h1>
          <p className="text-slate-400 text-base md:text-xl max-w-xl leading-relaxed">
            Experience the perfect blend of luxury and functionality. Our new
            collection is designed for those who never settle.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <CustomButton
              size="lg"
              className="w-full sm:w-auto rounded-full px-10 py-6 md:py-7 text-base md:text-lg shadow-2xl shadow-primary/40"
            >
              Shop Collection
            </CustomButton>
            <CustomButton
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto rounded-full px-10 py-6 md:py-7 text-base md:text-lg border-white/20 text-primary hover:bg-slate-200"
            >
              View Lookbook
            </CustomButton>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="container mx-auto px-6 space-y-10 md:space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Explore Categories
            </h2>
            <p className="text-sm md:text-base text-muted">Find exactly what you're looking for.</p>
          </div>
          <Link
            to="/products"
            className="text-primary font-bold hover:underline mb-1 md:mb-2 text-sm md:text-base"
          >
            View all
          </Link>
        </div>
      </section>

      {/* 4. Promotional Banner */}
      <section className="container mx-auto px-6">
        <div className="relative rounded-3xl md:rounded-[3rem] overflow-hidden bg-primary p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 text-white text-center lg:text-left">
          <div className="space-y-6 max-w-xl w-full">
            <h2 className="text-3xl md:text-6xl font-black leading-none">
              GET 20% OFF YOUR FIRST ORDER
            </h2>
            <p className="text-primary-foreground/80 text-base md:text-lg">
              Use code:{" "}
              <span className="bg-white/20 px-3 py-1 rounded-lg font-mono font-bold text-white tracking-widest leading-[0.5]">
                HELLOWORLD2026
              </span>
            </p>
            <CustomButton
              variant="secondary"
              className="w-full sm:w-auto bg-white text-primary border-none hover:bg-slate-100 rounded-full px-8 py-6 font-bold uppercase"
            >
              Claim Discount
            </CustomButton>
          </div>
          <div className="relative w-48 md:w-64 lg:max-w-md aspect-square bg-white/10 rounded-full flex items-center justify-center backdrop-blur-3xl border border-white/20">
            <span className="text-6xl md:text-[8rem] lg:text-[12rem] animate-bounce">🎁</span>
          </div>
        </div>
      </section>
    </main>
  );
}
