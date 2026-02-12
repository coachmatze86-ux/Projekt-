import { GastroJob, Fuehrungserwartung, Taetigkeitsfeld } from '../models/types';

/**
 * Exportiert ein vollständiges Jobprofil als Markdown
 */
export function jobAlsMarkdown(
  job: GastroJob,
  fuehrungserwartung?: Fuehrungserwartung
): string {
  const zeilen: string[] = [];

  // Titel und Beschreibung
  zeilen.push(`# ${job.titel}`);
  zeilen.push('');
  zeilen.push(job.beschreibung);
  zeilen.push('');

  // Meta-Infos
  zeilen.push('## Überblick');
  zeilen.push('');
  zeilen.push(`| Eigenschaft | Wert |`);
  zeilen.push(`|---|---|`);
  zeilen.push(`| **Niveau** | ${job.niveau} |`);
  zeilen.push(`| **Führungsposition** | ${job.istFuehrungsposition ? 'Ja' : 'Nein'} |`);
  zeilen.push(
    `| **Tätigkeitsfelder** | ${job.taetigkeitsfelder.length} |`
  );
  const anzahlAufgaben = job.taetigkeitsfelder.reduce(
    (sum, tf) => sum + tf.aufgaben.length,
    0
  );
  zeilen.push(`| **Aufgaben gesamt** | ${anzahlAufgaben} |`);
  zeilen.push('');

  // Tätigkeitsfelder
  zeilen.push('## Tätigkeitsfelder');
  zeilen.push('');
  job.taetigkeitsfelder.forEach((tf) => {
    zeilen.push(...taetigkeitsfeldAlsMarkdown(tf));
  });

  // Anforderungen
  zeilen.push('## Anforderungen');
  zeilen.push('');

  const pflicht = job.anforderungen.filter((a) => a.pflicht);
  const optional = job.anforderungen.filter((a) => !a.pflicht);

  if (pflicht.length > 0) {
    zeilen.push('### Pflichtanforderungen');
    zeilen.push('');
    pflicht.forEach((a) => {
      zeilen.push(`- **${a.bezeichnung}** (${a.art}) — ${a.beschreibung}`);
    });
    zeilen.push('');
  }

  if (optional.length > 0) {
    zeilen.push('### Wünschenswert');
    zeilen.push('');
    optional.forEach((a) => {
      zeilen.push(`- **${a.bezeichnung}** (${a.art}) — ${a.beschreibung}`);
    });
    zeilen.push('');
  }

  // Führungserwartungen
  if (fuehrungserwartung) {
    zeilen.push('## Erwartungen an die Führungskraft');
    zeilen.push('');

    zeilen.push('### Verantwortungen');
    zeilen.push('');
    fuehrungserwartung.verantwortungen.forEach((v) => {
      zeilen.push(`- ${v}`);
    });
    zeilen.push('');

    zeilen.push('### Erwartete Verhaltensweisen');
    zeilen.push('');
    fuehrungserwartung.erwarteteVerhaltensweisen.forEach((v) => {
      zeilen.push(`- ${v}`);
    });
    zeilen.push('');

    zeilen.push('### Erfolgskriterien');
    zeilen.push('');
    fuehrungserwartung.erfolgskriterien.forEach((k) => {
      zeilen.push(`- ${k}`);
    });
    zeilen.push('');
  }

  return zeilen.join('\n');
}

function taetigkeitsfeldAlsMarkdown(tf: Taetigkeitsfeld): string[] {
  const zeilen: string[] = [];

  zeilen.push(`### ${tf.name} (${tf.kategorie})`);
  zeilen.push('');
  zeilen.push(tf.beschreibung);
  zeilen.push('');
  zeilen.push('| Aufgabe | Beschreibung | Niveau | Führung |');
  zeilen.push('|---|---|---|---|');
  tf.aufgaben.forEach((a) => {
    zeilen.push(
      `| ${a.bezeichnung} | ${a.beschreibung} | ${a.niveau} | ${a.istFuehrungsaufgabe ? 'Ja' : 'Nein'} |`
    );
  });
  zeilen.push('');

  return zeilen;
}

/**
 * Exportiert eine Übersichtsliste aller Jobs als Markdown
 */
export function jobUebersichtAlsMarkdown(jobs: GastroJob[]): string {
  const zeilen: string[] = [];

  zeilen.push('# Gastronomie-Jobs Übersicht');
  zeilen.push('');
  zeilen.push(`Insgesamt **${jobs.length} Positionen** definiert.`);
  zeilen.push('');
  zeilen.push('| Position | Niveau | Führung | Tätigkeitsfelder | Aufgaben |');
  zeilen.push('|---|---|---|---|---|');
  jobs.forEach((j) => {
    const aufgaben = j.taetigkeitsfelder.reduce(
      (sum, tf) => sum + tf.aufgaben.length,
      0
    );
    zeilen.push(
      `| ${j.titel} | ${j.niveau} | ${j.istFuehrungsposition ? 'Ja' : 'Nein'} | ${j.taetigkeitsfelder.length} | ${aufgaben} |`
    );
  });
  zeilen.push('');

  return zeilen.join('\n');
}
