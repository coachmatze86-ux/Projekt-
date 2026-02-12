import {
  GastroJob,
  Fuehrungserwartung,
  Kategorie,
  Niveau,
} from '../models/types';

// ── Küchenchef / Head Chef ─────────────────────────────────

export const kuechenchef: GastroJob = {
  id: 'kuechenchef',
  titel: 'Küchenchef / Head Chef',
  beschreibung:
    'Gesamtverantwortung für die Küchenorganisation, Qualität der Speisen und Führung des Küchenteams.',
  istFuehrungsposition: true,
  niveau: Niveau.Experte,
  taetigkeitsfelder: [
    {
      id: 'tf-kl',
      name: 'Küchenleitung',
      kategorie: Kategorie.Kueche,
      beschreibung: 'Strategische und operative Führung der Küche',
      aufgaben: [
        {
          id: 'kl-1',
          bezeichnung: 'Speisekarte entwickeln',
          beschreibung: 'Saisonale Menüs konzipieren, kalkulieren und umsetzen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'kl-2',
          bezeichnung: 'Wareneinkauf steuern',
          beschreibung: 'Lieferanten auswählen, Bestellungen planen, Wareneinsatz kontrollieren',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'kl-3',
          bezeichnung: 'Qualitätskontrolle',
          beschreibung: 'Geschmack, Optik und Konsistenz aller Gerichte prüfen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
      ],
    },
    {
      id: 'tf-pf-kc',
      name: 'Personalführung Küche',
      kategorie: Kategorie.Management,
      beschreibung: 'Führung und Entwicklung des Küchenteams',
      aufgaben: [
        {
          id: 'pf-1',
          bezeichnung: 'Schichtplanung',
          beschreibung: 'Dienstpläne erstellen und Urlaubsplanung koordinieren',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'pf-2',
          bezeichnung: 'Mitarbeiterentwicklung',
          beschreibung: 'Feedback-Gespräche führen, Weiterbildungen planen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'pf-3',
          bezeichnung: 'Auszubildende anleiten',
          beschreibung: 'Ausbildungsinhalte vermitteln und praktisch begleiten',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: true,
        },
      ],
    },
    {
      id: 'tf-hyg',
      name: 'Hygiene & HACCP',
      kategorie: Kategorie.Kueche,
      beschreibung: 'Einhaltung aller Hygiene- und Sicherheitsstandards',
      aufgaben: [
        {
          id: 'hyg-1',
          bezeichnung: 'HACCP-Konzept pflegen',
          beschreibung: 'Gefahrenanalyse aktuell halten und dokumentieren',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'hyg-2',
          bezeichnung: 'Hygienekontrollen durchführen',
          beschreibung: 'Regelmäßige Kontrollen der Küchenbereiche und Dokumentation',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: false,
        },
      ],
    },
  ],
  anforderungen: [
    {
      id: 'kc-anf-1',
      bezeichnung: 'Ausbildung als Koch/Köchin',
      beschreibung: 'Abgeschlossene Berufsausbildung im Kochberuf',
      art: 'Qualifikation',
      pflicht: true,
    },
    {
      id: 'kc-anf-2',
      bezeichnung: 'Mindestens 5 Jahre Berufserfahrung',
      beschreibung: 'Mehrjährige Erfahrung in der gehobenen Gastronomie',
      art: 'Erfahrung',
      pflicht: true,
    },
    {
      id: 'kc-anf-3',
      bezeichnung: 'Führungserfahrung',
      beschreibung: 'Nachweisliche Erfahrung in der Teamführung',
      art: 'Erfahrung',
      pflicht: true,
    },
    {
      id: 'kc-anf-4',
      bezeichnung: 'Belastbarkeit',
      beschreibung: 'Ruhe und Übersicht auch in stressigen Situationen',
      art: 'SoftSkill',
      pflicht: true,
    },
    {
      id: 'kc-anf-5',
      bezeichnung: 'Kreativität',
      beschreibung: 'Innovationsfreude bei der Menüentwicklung',
      art: 'SoftSkill',
      pflicht: false,
    },
  ],
};

// ── Serviceleiter / Restaurant Manager ─────────────────────

export const serviceleiter: GastroJob = {
  id: 'serviceleiter',
  titel: 'Serviceleiter / Restaurant Manager',
  beschreibung:
    'Verantwortung für den gesamten Serviceablauf, Gästezufriedenheit und Führung des Serviceteams.',
  istFuehrungsposition: true,
  niveau: Niveau.Experte,
  taetigkeitsfelder: [
    {
      id: 'tf-sl',
      name: 'Serviceorganisation',
      kategorie: Kategorie.Service,
      beschreibung: 'Planung und Steuerung des Serviceablaufs',
      aufgaben: [
        {
          id: 'sl-1',
          bezeichnung: 'Serviceablauf koordinieren',
          beschreibung: 'Tischplan erstellen, Stationen zuweisen, Ablauf im Blick behalten',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'sl-2',
          bezeichnung: 'Reservierungsmanagement',
          beschreibung: 'Reservierungen annehmen, planen und Auslastung optimieren',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'sl-3',
          bezeichnung: 'Beschwerdemanagement',
          beschreibung: 'Gästebeschwerden professionell aufnehmen und lösen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
      ],
    },
    {
      id: 'tf-pf-sl',
      name: 'Personalführung Service',
      kategorie: Kategorie.Management,
      beschreibung: 'Führung und Schulung des Serviceteams',
      aufgaben: [
        {
          id: 'pf-sl-1',
          bezeichnung: 'Team schulen',
          beschreibung: 'Servicestandards vermitteln, Weinwissen schulen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'pf-sl-2',
          bezeichnung: 'Dienstplanung Service',
          beschreibung: 'Schichtpläne für das Serviceteam erstellen',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: true,
        },
      ],
    },
  ],
  anforderungen: [
    {
      id: 'sl-anf-1',
      bezeichnung: 'Ausbildung in der Gastronomie',
      beschreibung: 'Abgeschlossene Ausbildung als Restaurantfachmann/-frau oder vergleichbar',
      art: 'Qualifikation',
      pflicht: true,
    },
    {
      id: 'sl-anf-2',
      bezeichnung: '3 Jahre Erfahrung im Service',
      beschreibung: 'Mehrjährige Erfahrung in der gehobenen Gastronomie',
      art: 'Erfahrung',
      pflicht: true,
    },
    {
      id: 'sl-anf-3',
      bezeichnung: 'Kommunikationsstärke',
      beschreibung: 'Exzellente Kommunikation mit Gästen und Team',
      art: 'SoftSkill',
      pflicht: true,
    },
  ],
};

// ── Servicekraft ───────────────────────────────────────────

export const servicekraft: GastroJob = {
  id: 'servicekraft',
  titel: 'Servicekraft',
  beschreibung: 'Bedienung und Betreuung der Gäste im Restaurant.',
  istFuehrungsposition: false,
  niveau: Niveau.Einsteiger,
  taetigkeitsfelder: [
    {
      id: 'tf-sv',
      name: 'Gästebetreuung',
      kategorie: Kategorie.Service,
      beschreibung: 'Direkter Kontakt mit den Gästen',
      aufgaben: [
        {
          id: 'sv-1',
          bezeichnung: 'Gäste empfangen',
          beschreibung: 'Gäste begrüßen und zum Tisch begleiten',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'sv-2',
          bezeichnung: 'Bestellungen aufnehmen',
          beschreibung: 'Speise- und Getränkewünsche aufnehmen und ans System übermitteln',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'sv-3',
          bezeichnung: 'Speisen und Getränke servieren',
          beschreibung: 'Gerichte und Getränke fachgerecht servieren',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'sv-4',
          bezeichnung: 'Abrechnung',
          beschreibung: 'Rechnungen erstellen und Zahlungen abwickeln',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
      ],
    },
  ],
  anforderungen: [
    {
      id: 'sv-anf-1',
      bezeichnung: 'Freundliches Auftreten',
      beschreibung: 'Gepflegtes, freundliches und aufmerksames Auftreten',
      art: 'SoftSkill',
      pflicht: true,
    },
    {
      id: 'sv-anf-2',
      bezeichnung: 'Teamfähigkeit',
      beschreibung: 'Gute Zusammenarbeit mit Küche und Kollegen',
      art: 'SoftSkill',
      pflicht: true,
    },
  ],
};

// ── Barkeeper ──────────────────────────────────────────────

export const barkeeper: GastroJob = {
  id: 'barkeeper',
  titel: 'Barkeeper',
  beschreibung: 'Zubereitung von Getränken und Cocktails, Betreuung der Bargäste.',
  istFuehrungsposition: false,
  niveau: Niveau.Fortgeschritten,
  taetigkeitsfelder: [
    {
      id: 'tf-bar',
      name: 'Barkunde',
      kategorie: Kategorie.Bar,
      beschreibung: 'Getränkeherstellung und Barkompetenz',
      aufgaben: [
        {
          id: 'bar-1',
          bezeichnung: 'Cocktails mixen',
          beschreibung: 'Klassische und Signature-Cocktails nach Rezeptur zubereiten',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'bar-2',
          bezeichnung: 'Barbestand verwalten',
          beschreibung: 'Spirituosen, Zutaten und Zubehör bestellen und inventarisieren',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'bar-3',
          bezeichnung: 'Bargäste beraten',
          beschreibung: 'Gäste zu Getränken beraten und Empfehlungen aussprechen',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: false,
        },
      ],
    },
  ],
  anforderungen: [
    {
      id: 'bar-anf-1',
      bezeichnung: 'Barkenntnisse',
      beschreibung: 'Fundiertes Wissen über Spirituosen, Cocktails und Zubereitungstechniken',
      art: 'Qualifikation',
      pflicht: true,
    },
    {
      id: 'bar-anf-2',
      bezeichnung: 'Schnelligkeit & Genauigkeit',
      beschreibung: 'Effizientes Arbeiten auch bei hohem Gästeaufkommen',
      art: 'SoftSkill',
      pflicht: true,
    },
  ],
};

// ── Souschef / Stellvertretender Küchenchef ────────────────

export const souschef: GastroJob = {
  id: 'souschef',
  titel: 'Souschef / Stellvertretender Küchenchef',
  beschreibung:
    'Stellvertretung des Küchenchefs, eigenständige Führung einzelner Küchenbereiche und Unterstützung bei der Küchenorganisation.',
  istFuehrungsposition: true,
  niveau: Niveau.Fortgeschritten,
  taetigkeitsfelder: [
    {
      id: 'tf-sc-kueche',
      name: 'Küchenorganisation',
      kategorie: Kategorie.Kueche,
      beschreibung: 'Operative Unterstützung der Küchenleitung',
      aufgaben: [
        {
          id: 'sc-1',
          bezeichnung: 'Posten leiten',
          beschreibung: 'Eigenverantwortliche Führung eines Küchenpostens (z.B. Entremetier, Saucier)',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'sc-2',
          bezeichnung: 'Mise en Place koordinieren',
          beschreibung: 'Vorbereitung der Arbeitsstationen sicherstellen und kontrollieren',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'sc-3',
          bezeichnung: 'Küchenchef vertreten',
          beschreibung: 'Bei Abwesenheit die vollständige Küchenleitung übernehmen',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'sc-4',
          bezeichnung: 'Warenbestellung unterstützen',
          beschreibung: 'Bestandskontrolle und Bestellvorschläge erarbeiten',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: false,
        },
      ],
    },
    {
      id: 'tf-sc-team',
      name: 'Teamkoordination Küche',
      kategorie: Kategorie.Management,
      beschreibung: 'Anleitung und Unterstützung der Küchenmitarbeiter',
      aufgaben: [
        {
          id: 'sc-5',
          bezeichnung: 'Commis anleiten',
          beschreibung: 'Jungköche bei der täglichen Arbeit einweisen und unterstützen',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'sc-6',
          bezeichnung: 'Qualität am Pass prüfen',
          beschreibung: 'Gerichte vor der Ausgabe auf Standard kontrollieren',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: false,
        },
      ],
    },
  ],
  anforderungen: [
    {
      id: 'sc-anf-1',
      bezeichnung: 'Ausbildung als Koch/Köchin',
      beschreibung: 'Abgeschlossene Berufsausbildung im Kochberuf',
      art: 'Qualifikation',
      pflicht: true,
    },
    {
      id: 'sc-anf-2',
      bezeichnung: '3 Jahre Berufserfahrung',
      beschreibung: 'Mehrjährige Erfahrung als Chef de Partie oder vergleichbar',
      art: 'Erfahrung',
      pflicht: true,
    },
    {
      id: 'sc-anf-3',
      bezeichnung: 'Organisationstalent',
      beschreibung: 'Fähigkeit mehrere Abläufe gleichzeitig zu koordinieren',
      art: 'SoftSkill',
      pflicht: true,
    },
  ],
};

// ── Sommelier ──────────────────────────────────────────────

export const sommelier: GastroJob = {
  id: 'sommelier',
  titel: 'Sommelier / Weinfachberater',
  beschreibung:
    'Verantwortung für die Weinkarte, Weinberatung der Gäste und Schulung des Serviceteams im Bereich Getränke.',
  istFuehrungsposition: false,
  niveau: Niveau.Experte,
  taetigkeitsfelder: [
    {
      id: 'tf-som-wein',
      name: 'Weinmanagement',
      kategorie: Kategorie.Service,
      beschreibung: 'Auswahl, Einkauf und Präsentation des Weinangebots',
      aufgaben: [
        {
          id: 'som-1',
          bezeichnung: 'Weinkarte gestalten',
          beschreibung: 'Weinkarte zusammenstellen, saisonal anpassen und kalkulieren',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'som-2',
          bezeichnung: 'Gäste beraten',
          beschreibung: 'Individuelle Weinempfehlungen passend zu Speisen und Anlass geben',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'som-3',
          bezeichnung: 'Weineinkauf',
          beschreibung: 'Lieferanten auswählen, Verkostungen organisieren und Bestand pflegen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'som-4',
          bezeichnung: 'Weinschulungen durchführen',
          beschreibung: 'Serviceteam zu Rebsorten, Regionen und Servicestandards schulen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: false,
        },
      ],
    },
  ],
  anforderungen: [
    {
      id: 'som-anf-1',
      bezeichnung: 'Sommelier-Ausbildung',
      beschreibung: 'Zertifizierte Ausbildung als Sommelier (IHK, WSET oder vergleichbar)',
      art: 'Qualifikation',
      pflicht: true,
    },
    {
      id: 'som-anf-2',
      bezeichnung: 'Umfangreiche Weinkenntnisse',
      beschreibung: 'Tiefgehendes Wissen über internationale Weinregionen und Rebsorten',
      art: 'Qualifikation',
      pflicht: true,
    },
    {
      id: 'som-anf-3',
      bezeichnung: 'Beratungskompetenz',
      beschreibung: 'Fähigkeit, Weinwissen verständlich und begeisternd zu vermitteln',
      art: 'SoftSkill',
      pflicht: true,
    },
  ],
};

// ── Restaurantleiter ───────────────────────────────────────

export const restaurantleiter: GastroJob = {
  id: 'restaurantleiter',
  titel: 'Restaurantleiter / General Manager',
  beschreibung:
    'Gesamtverantwortung für den Restaurantbetrieb: Umsatz, Personal, Gästezufriedenheit und strategische Entwicklung.',
  istFuehrungsposition: true,
  niveau: Niveau.Experte,
  taetigkeitsfelder: [
    {
      id: 'tf-rl-betrieb',
      name: 'Betriebsführung',
      kategorie: Kategorie.Management,
      beschreibung: 'Gesamtsteuerung des operativen Restaurantbetriebs',
      aufgaben: [
        {
          id: 'rl-1',
          bezeichnung: 'Budget und Umsatz steuern',
          beschreibung: 'Monatliche Umsatz- und Kostenziele planen, überwachen und optimieren',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'rl-2',
          bezeichnung: 'Qualitätsstandards definieren',
          beschreibung: 'Service- und Produktstandards festlegen und deren Einhaltung sicherstellen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'rl-3',
          bezeichnung: 'Marketing und Außenwirkung',
          beschreibung: 'Marketingmaßnahmen planen, Social Media und Bewertungsportale betreuen',
          niveau: Niveau.Fortgeschritten,
          istFuehrungsaufgabe: true,
        },
      ],
    },
    {
      id: 'tf-rl-personal',
      name: 'Personalmanagement',
      kategorie: Kategorie.Management,
      beschreibung: 'Strategische und operative Personalführung des gesamten Teams',
      aufgaben: [
        {
          id: 'rl-4',
          bezeichnung: 'Personal einstellen',
          beschreibung: 'Stellenausschreibungen, Bewerbungsgespräche und Einstellungsentscheidungen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'rl-5',
          bezeichnung: 'Führungskräfte entwickeln',
          beschreibung: 'Küchenchef, Serviceleiter und weitere Führungskräfte coachen und fördern',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'rl-6',
          bezeichnung: 'Arbeitsrecht einhalten',
          beschreibung: 'Arbeitsverträge, Arbeitszeitgesetze und Vorschriften korrekt umsetzen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
      ],
    },
    {
      id: 'tf-rl-gaeste',
      name: 'Gästemanagement',
      kategorie: Kategorie.Service,
      beschreibung: 'Strategische Gästebindung und Zufriedenheitsmanagement',
      aufgaben: [
        {
          id: 'rl-7',
          bezeichnung: 'VIP- und Stammgästebetreuung',
          beschreibung: 'Persönliche Betreuung wichtiger Gäste, Sonderwünsche koordinieren',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
        {
          id: 'rl-8',
          bezeichnung: 'Eskalationsmanagement',
          beschreibung: 'Schwerwiegende Beschwerden und Konflikte persönlich lösen',
          niveau: Niveau.Experte,
          istFuehrungsaufgabe: true,
        },
      ],
    },
  ],
  anforderungen: [
    {
      id: 'rl-anf-1',
      bezeichnung: 'Betriebswirtschaftliche Kenntnisse',
      beschreibung: 'Studium oder Weiterbildung in Betriebswirtschaft, Hotelmanagement o.ä.',
      art: 'Qualifikation',
      pflicht: true,
    },
    {
      id: 'rl-anf-2',
      bezeichnung: '5+ Jahre Führungserfahrung in der Gastronomie',
      beschreibung: 'Nachweisliche Erfahrung in leitender Position in der Gastronomie',
      art: 'Erfahrung',
      pflicht: true,
    },
    {
      id: 'rl-anf-3',
      bezeichnung: 'Strategisches Denken',
      beschreibung: 'Fähigkeit, langfristige Konzepte zu entwickeln und umzusetzen',
      art: 'SoftSkill',
      pflicht: true,
    },
    {
      id: 'rl-anf-4',
      bezeichnung: 'Unternehmerisches Handeln',
      beschreibung: 'Eigenverantwortliches, kostenorientiertes und proaktives Arbeiten',
      art: 'SoftSkill',
      pflicht: true,
    },
  ],
};

// ── Spüler / Küchenhilfe ──────────────────────────────────

export const spueler: GastroJob = {
  id: 'spueler',
  titel: 'Spüler / Küchenhilfe',
  beschreibung:
    'Verantwortung für die Sauberkeit in der Küche, Spülbereich und Unterstützung bei einfachen Zubereitungen.',
  istFuehrungsposition: false,
  niveau: Niveau.Einsteiger,
  taetigkeitsfelder: [
    {
      id: 'tf-sp-spuel',
      name: 'Spülbereich',
      kategorie: Kategorie.Kueche,
      beschreibung: 'Reinigung von Geschirr, Besteck und Küchengeräten',
      aufgaben: [
        {
          id: 'sp-1',
          bezeichnung: 'Geschirr spülen',
          beschreibung: 'Geschirr, Gläser und Besteck maschinell und von Hand reinigen',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'sp-2',
          bezeichnung: 'Küchengeräte reinigen',
          beschreibung: 'Töpfe, Pfannen und Großgeräte reinigen und pflegen',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'sp-3',
          bezeichnung: 'Sauberkeit sicherstellen',
          beschreibung: 'Arbeitsflächen, Böden und Ablagen regelmäßig reinigen',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
      ],
    },
    {
      id: 'tf-sp-hilfe',
      name: 'Küchenhilfe',
      kategorie: Kategorie.Kueche,
      beschreibung: 'Unterstützende Tätigkeiten in der Küche',
      aufgaben: [
        {
          id: 'sp-4',
          bezeichnung: 'Zutaten vorbereiten',
          beschreibung: 'Gemüse waschen, schälen und schneiden nach Anweisung',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
        {
          id: 'sp-5',
          bezeichnung: 'Waren einräumen',
          beschreibung: 'Lieferungen annehmen und Waren fachgerecht einlagern',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
      ],
    },
  ],
  anforderungen: [
    {
      id: 'sp-anf-1',
      bezeichnung: 'Körperliche Belastbarkeit',
      beschreibung: 'Fähigkeit, längere Zeit im Stehen und bei Hitze zu arbeiten',
      art: 'SoftSkill',
      pflicht: true,
    },
    {
      id: 'sp-anf-2',
      bezeichnung: 'Zuverlässigkeit',
      beschreibung: 'Pünktlichkeit und gewissenhaftes Arbeiten',
      art: 'SoftSkill',
      pflicht: true,
    },
  ],
};

// ── Führungserwartungen ────────────────────────────────────

export const fuehrungserwartungKuechenchef: Fuehrungserwartung = {
  jobId: 'kuechenchef',
  verantwortungen: [
    'Qualitätssicherung aller Speisen und Einhaltung der Standards',
    'Budgetkontrolle und Wareneinsatzoptimierung',
    'Einhaltung aller Hygiene- und Arbeitsschutzvorschriften',
    'Ausbildung und Förderung des Küchennachwuchses',
  ],
  erwarteteVerhaltensweisen: [
    'Vorbildfunktion in Pünktlichkeit, Sauberkeit und Arbeitsmoral',
    'Konstruktives und respektvolles Feedback geben',
    'Ruhiges und strukturiertes Handeln unter Druck',
    'Offene Kommunikation mit Service und Management',
  ],
  erfolgskriterien: [
    'Gästezufriedenheit mit dem Essen > 90%',
    'Wareneinsatz innerhalb des geplanten Budgets (±5%)',
    'Mitarbeiterfluktuation im Küchenteam < 15% p.a.',
    'Erfolgreiche Bestehung aller Hygienekontrollen',
  ],
};

export const fuehrungserwartungServiceleiter: Fuehrungserwartung = {
  jobId: 'serviceleiter',
  verantwortungen: [
    'Sicherstellung eines reibungslosen Serviceablaufs',
    'Gästezufriedenheit und Stammgästepflege',
    'Umsatzverantwortung im Servicebereich',
    'Schulung des Serviceteams auf einheitliche Standards',
  ],
  erwarteteVerhaltensweisen: [
    'Professionelles und souveränes Auftreten gegenüber Gästen',
    'Empathie und Konfliktlösungskompetenz',
    'Proaktive Kommunikation mit der Küche',
    'Förderung einer positiven Teamkultur',
  ],
  erfolgskriterien: [
    'Gästebewertungen im Service > 4.5/5',
    'Durchschnittlicher Umsatz pro Gast stabil oder steigend',
    'Beschwerden werden innerhalb von 5 Minuten gelöst',
    'Vollständige Einarbeitung neuer Mitarbeiter innerhalb von 2 Wochen',
  ],
};

export const fuehrungserwartungSouschef: Fuehrungserwartung = {
  jobId: 'souschef',
  verantwortungen: [
    'Reibungsloser Ablauf am zugewiesenen Posten',
    'Vertretung des Küchenchefs bei Abwesenheit',
    'Anleitung und Kontrolle der Commis de Cuisine',
    'Einhaltung der Rezepturen und Portionsgrößen',
  ],
  erwarteteVerhaltensweisen: [
    'Hands-on-Mentalität und Teamorientierung',
    'Eigeninitiative bei Problemen am Posten',
    'Geduld und Klarheit bei der Anleitung von Nachwuchskräften',
    'Loyale Zusammenarbeit mit dem Küchenchef',
  ],
  erfolgskriterien: [
    'Reibungsloser Ablauf während der Vertretung des Küchenchefs',
    'Geringe Reklamationsquote am eigenen Posten',
    'Positive Rückmeldungen der angeleiteten Commis',
    'Termintreue bei Mise en Place',
  ],
};

export const fuehrungserwartungRestaurantleiter: Fuehrungserwartung = {
  jobId: 'restaurantleiter',
  verantwortungen: [
    'Gesamtwirtschaftliches Ergebnis des Restaurants',
    'Aufbau und Pflege eines leistungsfähigen Teams',
    'Strategische Positionierung und Weiterentwicklung des Konzepts',
    'Einhaltung aller gesetzlichen Vorgaben (Arbeitsrecht, Hygiene, Brandschutz)',
  ],
  erwarteteVerhaltensweisen: [
    'Unternehmerisches Denken und Handeln',
    'Präsenz auf der Fläche und Nahbarkeit für Gäste und Mitarbeiter',
    'Entscheidungsfreude auch in schwierigen Situationen',
    'Wertschätzende und klare Kommunikation auf allen Ebenen',
  ],
  erfolgskriterien: [
    'Erreichung der Umsatz- und Kostenziele',
    'Mitarbeiterzufriedenheit > 80% in anonymen Befragungen',
    'Online-Bewertungen durchschnittlich > 4.3/5',
    'Erfolgreiche Bestehung aller behördlichen Kontrollen',
  ],
};

// ── Alle Daten zusammengefasst ─────────────────────────────

export const alleJobs: GastroJob[] = [
  kuechenchef,
  souschef,
  serviceleiter,
  servicekraft,
  barkeeper,
  sommelier,
  restaurantleiter,
  spueler,
];

export const alleFuehrungserwartungen: Fuehrungserwartung[] = [
  fuehrungserwartungKuechenchef,
  fuehrungserwartungSouschef,
  fuehrungserwartungServiceleiter,
  fuehrungserwartungRestaurantleiter,
];
