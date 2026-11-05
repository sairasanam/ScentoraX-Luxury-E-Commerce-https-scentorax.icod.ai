export default function About() {
  return (
    <div className="min-h-screen pt-20" data-icod-id="src_pages_about_tsx_599e">
      {/* Hero */}
      <section
        className="relative flex min-h-[50vh] items-center justify-center overflow-hidden"
        data-icod-id="src_pages_about_tsx_fa37">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#12081f] via-[#0a0a0a] to-background"
          data-icod-id="src_pages_about_tsx_7796" />
        <div
          className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-8"
          data-icod-id="src_pages_about_tsx_64de">
          <p
            className="heading-luxury text-xs tracking-[0.3em] text-primary"
            data-icod-id="src_pages_about_tsx_07bb">Our Story</p>
          <h1
            className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl"
            data-icod-id="src_pages_about_tsx_78a8">
            Born from Pakistan&apos;s<br data-icod-id="src_pages_about_tsx_a34a" />Rich Fragrance Heritage
          </h1>
        </div>
      </section>
      {/* Brand Story */}
      <section
        className="mx-auto max-w-3xl px-4 py-20 md:px-8"
        data-icod-id="src_pages_about_tsx_ade0">
        <div
          className="space-y-6 leading-relaxed text-muted-foreground"
          data-icod-id="src_pages_about_tsx_77ab">
          <p className="text-lg" data-icod-id="src_pages_about_tsx_5e47">
            ScentoraX was founded on a simple belief: that Pakistan&apos;s olfactory heritage deserves a global stage. 
            For centuries, the subcontinent has been home to some of the world&apos;s most exquisite fragrance traditions — 
            from the attar makers of Lucknow to the rose gardens of Taif, from the saffron fields of Kashmir to the 
            oud forests of Southeast Asia.
          </p>
          <p data-icod-id="src_pages_about_tsx_a943">
            We bridge this ancient artistry with contemporary perfumery. Each ScentoraX fragrance is composed by 
            master perfumers who understand both the science of modern fragrance chemistry and the poetry of 
            traditional Eastern scent-making. The result is a collection that feels simultaneously timeless and new.
          </p>
          <p data-icod-id="src_pages_about_tsx_11b4">
            Our name itself tells our story: <strong className="text-foreground" data-icod-id="src_pages_about_tsx_c818">Scentora</strong> evokes the sensory richness 
            of fragrance, while <strong className="text-foreground" data-icod-id="src_pages_about_tsx_8c58">X</strong> represents the unknown, the signature, the personal mark 
            that each wearer leaves behind. Because fragrance is never just about smelling good — it is about 
            leaving an impression that lingers long after you have left the room.
          </p>
        </div>
      </section>
      {/* Values */}
      <section
        className="border-y border-border/40 bg-card/30 py-20"
        data-icod-id="src_pages_about_tsx_9e06">
        <div
          className="mx-auto max-w-7xl px-4 md:px-8"
          data-icod-id="src_pages_about_tsx_691f">
          <div className="mb-12 text-center" data-icod-id="src_pages_about_tsx_6475">
            <p
              className="heading-luxury text-xs tracking-[0.3em] text-primary"
              data-icod-id="src_pages_about_tsx_cda3">Philosophy</p>
            <h2
              className="mt-2 font-serif text-3xl font-bold text-foreground"
              data-icod-id="src_pages_about_tsx_a31b">What Guides Us</h2>
          </div>
          <div
            className="grid gap-8 md:grid-cols-3"
            data-icod-id="src_pages_about_tsx_668c">
            {[
              { title: 'Heritage', desc: 'Every fragrance honors the rich perfumery traditions of South Asia, using ingredients and techniques passed down through generations.' },
              { title: 'Craftsmanship', desc: 'We source the finest raw materials — Cambodian oud, Taif roses, Kashmiri saffron — and compose each fragrance with meticulous attention to detail.' },
              { title: 'Individuality', desc: 'Fragrance is deeply personal. Our collections are designed not to follow trends, but to help you discover and express your own unique signature.' },
            ].map((value) => (
              <div
                key={value.title}
                className="space-y-3"
                data-icod-id={`src_pages_about_tsx_c8e0_${value.title}`}>
                <h3
                  className="heading-luxury text-sm font-bold text-primary"
                  data-icod-id={`src_pages_about_tsx_000c_${value.title}`}>{value.title}</h3>
                <p
                  className="text-sm leading-relaxed text-muted-foreground"
                  data-icod-id={`src_pages_about_tsx_24ee_${value.title}`}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Craftsmanship */}
      <section
        className="mx-auto max-w-3xl px-4 py-20 md:px-8"
        data-icod-id="src_pages_about_tsx_47c1">
        <div className="text-center" data-icod-id="src_pages_about_tsx_27d3">
          <p
            className="heading-luxury text-xs tracking-[0.3em] text-primary"
            data-icod-id="src_pages_about_tsx_e7c0">The Process</p>
          <h2
            className="mt-4 font-serif text-3xl font-bold text-foreground"
            data-icod-id="src_pages_about_tsx_3d74">From Ingredient to Signature</h2>
          <p
            className="mt-6 leading-relaxed text-muted-foreground"
            data-icod-id="src_pages_about_tsx_1213">
            Our process begins at the source. We travel to the origins of our ingredients — the agarwood forests 
            where oud resin forms over decades, the mountain meadows where wildflowers bloom for only weeks each year, 
            the spice markets where cardamom and saffron change hands as they have for millennia. Each ingredient is 
            selected for purity, potency, and provenance. Then, in our atelier, these raw materials are transformed 
            into liquid art through a process that honours both precision and intuition.
          </p>
        </div>
      </section>
      {/* CTA */}
      <section
        className="bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 py-20 text-center"
        data-icod-id="src_pages_about_tsx_b85c">
        <h2
          className="font-serif text-3xl font-bold text-foreground"
          data-icod-id="src_pages_about_tsx_c4aa">Ready to Leave Your Signature?</h2>
        <p
          className="mt-3 text-muted-foreground"
          data-icod-id="src_pages_about_tsx_9697">Explore our complete collection of luxury Pakistani fragrances.</p>
        <a
          href="/shop"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-luxury"
          data-icod-id="src_pages_about_tsx_6f3f">
          Discover Collection
        </a>
      </section>
    </div>
  );
}
