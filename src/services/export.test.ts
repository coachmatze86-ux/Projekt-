import { jobAlsMarkdown, jobUebersichtAlsMarkdown } from './export';
import { GastroJob, Fuehrungserwartung, Kategorie, Niveau } from '../models/types';
import {
  kuechenchef,
  servicekraft,
  spueler,
  alleJobs,
  fuehrungserwartungKuechenchef,
} from '../data/beispiel-jobs';

describe('jobAlsMarkdown', () => {
  it('enthält den Jobtitel als H1-Überschrift', () => {
    const md = jobAlsMarkdown(kuechenchef);
    expect(md).toContain('# Küchenchef / Head Chef');
  });

  it('enthält die Jobbeschreibung', () => {
    const md = jobAlsMarkdown(kuechenchef);
    expect(md).toContain('Gesamtverantwortung für die Küchenorganisation');
  });

  it('enthält Überblick-Tabelle mit Niveau und Führung', () => {
    const md = jobAlsMarkdown(kuechenchef);
    expect(md).toContain('| **Niveau** | Experte |');
    expect(md).toContain('| **Führungsposition** | Ja |');
  });

  it('zeigt Nein für Nicht-Führungspositionen', () => {
    const md = jobAlsMarkdown(servicekraft);
    expect(md).toContain('| **Führungsposition** | Nein |');
  });

  it('enthält Tätigkeitsfelder als H3-Überschriften', () => {
    const md = jobAlsMarkdown(kuechenchef);
    expect(md).toContain('### Küchenleitung (Küche)');
    expect(md).toContain('### Personalführung Küche (Management)');
    expect(md).toContain('### Hygiene & HACCP (Küche)');
  });

  it('enthält Aufgaben-Tabelle mit allen Spalten', () => {
    const md = jobAlsMarkdown(kuechenchef);
    expect(md).toContain('| Aufgabe | Beschreibung | Niveau | Führung |');
    expect(md).toContain('Speisekarte entwickeln');
    expect(md).toContain('Ja |');
  });

  it('enthält Pflichtanforderungen', () => {
    const md = jobAlsMarkdown(kuechenchef);
    expect(md).toContain('### Pflichtanforderungen');
    expect(md).toContain('**Ausbildung als Koch/Köchin** (Qualifikation)');
  });

  it('enthält wünschenswerte Anforderungen', () => {
    const md = jobAlsMarkdown(kuechenchef);
    expect(md).toContain('### Wünschenswert');
    expect(md).toContain('**Kreativität** (SoftSkill)');
  });

  it('zeigt keine Wünschenswert-Sektion wenn alle Pflicht sind', () => {
    const md = jobAlsMarkdown(servicekraft);
    expect(md).not.toContain('### Wünschenswert');
  });

  it('enthält keine Führungserwartungen wenn nicht übergeben', () => {
    const md = jobAlsMarkdown(kuechenchef);
    expect(md).not.toContain('## Erwartungen an die Führungskraft');
  });

  it('enthält Führungserwartungen wenn übergeben', () => {
    const md = jobAlsMarkdown(kuechenchef, fuehrungserwartungKuechenchef);
    expect(md).toContain('## Erwartungen an die Führungskraft');
    expect(md).toContain('### Verantwortungen');
    expect(md).toContain('Qualitätssicherung aller Speisen');
    expect(md).toContain('### Erwartete Verhaltensweisen');
    expect(md).toContain('Vorbildfunktion in Pünktlichkeit');
    expect(md).toContain('### Erfolgskriterien');
    expect(md).toContain('Gästezufriedenheit mit dem Essen > 90%');
  });

  it('zählt Aufgaben korrekt im Überblick', () => {
    const md = jobAlsMarkdown(spueler);
    expect(md).toContain('| **Aufgaben gesamt** | 5 |');
  });

  it('erzeugt gültiges Markdown (keine doppelten Leerzeilen)', () => {
    const md = jobAlsMarkdown(kuechenchef, fuehrungserwartungKuechenchef);
    expect(md).not.toContain('\n\n\n');
  });
});

describe('jobUebersichtAlsMarkdown', () => {
  it('enthält H1-Überschrift', () => {
    const md = jobUebersichtAlsMarkdown(alleJobs);
    expect(md).toContain('# Gastronomie-Jobs Übersicht');
  });

  it('zeigt die Gesamtanzahl der Positionen', () => {
    const md = jobUebersichtAlsMarkdown(alleJobs);
    expect(md).toContain(`**${alleJobs.length} Positionen**`);
  });

  it('listet alle Jobs in der Tabelle', () => {
    const md = jobUebersichtAlsMarkdown(alleJobs);
    alleJobs.forEach((j) => {
      expect(md).toContain(j.titel);
    });
  });

  it('enthält Tabellen-Header mit allen Spalten', () => {
    const md = jobUebersichtAlsMarkdown(alleJobs);
    expect(md).toContain('| Position | Niveau | Führung | Tätigkeitsfelder | Aufgaben |');
  });

  it('zeigt korrekte Aufgabenzahl für Spüler', () => {
    const md = jobUebersichtAlsMarkdown([spueler]);
    expect(md).toContain('| Spüler / Küchenhilfe | Einsteiger | Nein | 2 | 5 |');
  });

  it('funktioniert mit leerer Liste', () => {
    const md = jobUebersichtAlsMarkdown([]);
    expect(md).toContain('**0 Positionen**');
  });
});
