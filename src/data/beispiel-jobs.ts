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

// ── Alle Daten zusammengefasst ─────────────────────────────

export const alleJobs: GastroJob[] = [
  kuechenchef,
  serviceleiter,
  servicekraft,
  barkeeper,
];

export const alleFuehrungserwartungen: Fuehrungserwartung[] = [
  fuehrungserwartungKuechenchef,
  fuehrungserwartungServiceleiter,
];
