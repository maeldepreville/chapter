const communityReviews = [
  {
    initials: "LM",
    name: "Lina Morel",
    rating: 5,
    date: "18 août 2026",
    text: "Un roman qui avance comme une carte que l’on dessine en marchant. J’ai aimé la précision des images, la façon dont le vent devient presque un personnage, et surtout cette sensation persistante que nos souvenirs ne sont jamais aussi fixes qu’on le croit.",
  },
  {
    initials: "TR",
    name: "Théo Renaud",
    rating: 4,
    date: "12 août 2026",
    text: "Une écriture ample, parfois exigeante, mais toujours habitée. Le dernier tiers donne une profondeur inattendue à tout ce qui précédait.",
  },
  {
    initials: "IN",
    name: "Inès Naël",
    rating: 4,
    date: "3 août 2026",
    text: "J’y suis entré lentement, puis je n’ai plus voulu quitter cet univers. Une très belle réflexion sur les lieux que l’on emporte avec soi.",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="desktop-header">
        <a className="wordmark" href="#top" aria-label="Chapter, retour en haut">Chapter<span>.</span></a>
        <nav aria-label="Navigation principale">
          <a href="#journal">Journal</a>
          <a href="#about">Bibliothèque</a>
        </nav>
        <label className="header-search">
          <span className="sr-only">Rechercher un livre ou un auteur</span>
          <input type="search" placeholder="Rechercher un livre ou un auteur" />
        </label>
        <button className="account-button" type="button" aria-label="Ouvrir le compte de Maël">MD</button>
      </header>

      <header className="mobile-header">
        <a className="wordmark" href="#top">Chapter<span>.</span></a>
        <button className="account-button" type="button" aria-label="Ouvrir le compte de Maël">MD</button>
      </header>

      <main id="top">
        <section className="book-opening" aria-labelledby="book-title">
          <div className="cover-stage" aria-label="Couverture de Les Cartographies du vent">
            <div className="book-cover">
              <img src="/chapter-cover-art.png" alt="" />
              <div className="book-cover-copy">
                <span className="cover-mark">CHAPTER</span>
                <strong>Les Cartographies du vent</strong>
                <span>Camille Maret</span>
              </div>
            </div>
          </div>

          <div className="book-identity">
            <p className="eyebrow">Roman · 2021</p>
            <h1 id="book-title">Les Cartographies du vent</h1>
            <p className="author">de Camille Maret</p>
            <p className="book-lede">Une cartographe revient dans l’archipel de son enfance et découvre que les lieux oubliés continuent de déplacer ceux qui les ont quittés.</p>
            <div className="opening-actions">
              <button className="primary-action" type="button">Ajouter au journal</button>
              <button className="quiet-action" type="button">Écrire une critique</button>
            </div>
            <div className="community-rating" aria-label="Note moyenne de 4,3 sur 5">
              <span aria-hidden="true">★★★★☆</span>
              <strong>4,3</strong>
              <span>1 248 évaluations</span>
            </div>
          </div>
        </section>

        <nav className="section-nav" aria-label="Sections de l’œuvre">
          <a className="active" href="#journal">Mon journal</a>
          <a href="#about">À propos</a>
          <a href="#reviews">Critiques</a>
        </nav>

        <div className="content-column">
          <section id="journal" className="page-section journal-section" aria-labelledby="journal-title">
            <div className="section-heading">
              <p className="section-number">01</p>
              <div>
                <h2 id="journal-title">Mon journal</h2>
                <p>Votre relation avec cette œuvre, au même endroit.</p>
              </div>
            </div>

            <div className="journal-row">
              <div>
                <p className="row-label">Ma lecture</p>
                <p className="row-value">Pas encore ajoutée</p>
              </div>
              <button className="text-action" type="button">Ajouter au journal</button>
            </div>
            <div className="journal-row">
              <div>
                <p className="row-label">Ma note</p>
                <p className="row-value">Aucune pensée consignée</p>
                <p className="privacy-note">Privée · visible uniquement par vous</p>
              </div>
              <button className="text-action" type="button">Ajouter une note</button>
            </div>
            <div className="journal-row">
              <div>
                <p className="row-label">Ma critique</p>
                <p className="row-value">Vous n’avez pas encore publié de critique.</p>
              </div>
              <button className="text-action" type="button">Écrire une critique</button>
            </div>
          </section>

          <section id="about" className="page-section" aria-labelledby="about-title">
            <div className="section-heading">
              <p className="section-number">02</p>
              <div>
                <h2 id="about-title">À propos</h2>
                <p>Le récit et quelques repères essentiels.</p>
              </div>
            </div>
            <div className="about-layout">
              <div className="synopsis prose">
                <p>Après douze années loin de Néréis, Ana Vales retourne dans l’archipel pour vider la maison de sa mère. Les cartes qu’elle y retrouve ne représentent aucun territoire connu : elles semblent plutôt suivre les déplacements de la mémoire, les silences d’une famille et les routes que le vent efface chaque nuit.</p>
                <p>À mesure qu’elle reprend son ancien métier, Ana comprend que cartographier un lieu consiste parfois moins à en fixer les contours qu’à accepter ce qui nous échappe.</p>
              </div>
              <dl className="work-facts">
                <div><dt>Première publication</dt><dd>2021</dd></div>
                <div><dt>Genre</dt><dd>Roman contemporain</dd></div>
                <div><dt>Langue originale</dt><dd>Français</dd></div>
              </dl>
            </div>
          </section>

          <section id="reviews" className="page-section reviews-section" aria-labelledby="reviews-title">
            <div className="section-heading">
              <p className="section-number">03</p>
              <div>
                <h2 id="reviews-title">Critiques</h2>
                <p>Ce que les lecteurs retiennent de cette œuvre.</p>
              </div>
            </div>
            <div className="reviews-list">
              {communityReviews.map((review) => (
                <article className="review" key={review.name}>
                  <header className="review-header">
                    <span className="avatar" aria-hidden="true">{review.initials}</span>
                    <div>
                      <h3>{review.name}</h3>
                      <p>{review.date}</p>
                    </div>
                    <span className="review-stars" aria-label={`${review.rating} étoiles sur 5`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                  </header>
                  <p className="review-copy">{review.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <nav className="mobile-nav" aria-label="Navigation principale mobile">
        <a className="active" href="#journal"><span aria-hidden="true">◫</span>Journal</a>
        <a href="#top"><span aria-hidden="true">⌕</span>Recherche</a>
        <a href="#about"><span aria-hidden="true">▥</span>Bibliothèque</a>
      </nav>
    </div>
  );
}
