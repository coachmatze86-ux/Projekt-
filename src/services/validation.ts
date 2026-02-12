import {
  GastroJob,
  Fuehrungserwartung,
  Taetigkeitsfeld,
  Aufgabe,
  Anforderung,
} from '../models/types';

export interface ValidationError {
  feld: string;
  nachricht: string;
}

export interface ValidationResult {
  gueltig: boolean;
  fehler: ValidationError[];
}

/**
 * Validiert einen GastroJob auf Vollständigkeit und Konsistenz
 */
export function validiereJob(job: GastroJob): ValidationResult {
  const fehler: ValidationError[] = [];

  // Pflichtfelder prüfen
  if (!job.id || job.id.trim() === '') {
    fehler.push({ feld: 'id', nachricht: 'Job-ID darf nicht leer sein' });
  }
  if (!job.titel || job.titel.trim() === '') {
    fehler.push({ feld: 'titel', nachricht: 'Jobtitel darf nicht leer sein' });
  }
  if (!job.beschreibung || job.beschreibung.trim() === '') {
    fehler.push({ feld: 'beschreibung', nachricht: 'Beschreibung darf nicht leer sein' });
  }

  // Mindestens ein Tätigkeitsfeld
  if (!job.taetigkeitsfelder || job.taetigkeitsfelder.length === 0) {
    fehler.push({
      feld: 'taetigkeitsfelder',
      nachricht: 'Mindestens ein Tätigkeitsfeld muss definiert sein',
    });
  } else {
    job.taetigkeitsfelder.forEach((tf, i) => {
      const tfFehler = validiereTaetigkeitsfeld(tf);
      tfFehler.fehler.forEach((f) => {
        fehler.push({
          feld: `taetigkeitsfelder[${i}].${f.feld}`,
          nachricht: f.nachricht,
        });
      });
    });
  }

  // Mindestens eine Anforderung
  if (!job.anforderungen || job.anforderungen.length === 0) {
    fehler.push({
      feld: 'anforderungen',
      nachricht: 'Mindestens eine Anforderung muss definiert sein',
    });
  } else {
    job.anforderungen.forEach((anf, i) => {
      const anfFehler = validiereAnforderung(anf);
      anfFehler.fehler.forEach((f) => {
        fehler.push({
          feld: `anforderungen[${i}].${f.feld}`,
          nachricht: f.nachricht,
        });
      });
    });
  }

  // Führungsposition muss Führungsaufgaben haben
  if (job.istFuehrungsposition) {
    const hatFuehrungsaufgaben = job.taetigkeitsfelder?.some((tf) =>
      tf.aufgaben.some((a) => a.istFuehrungsaufgabe)
    );
    if (!hatFuehrungsaufgaben) {
      fehler.push({
        feld: 'istFuehrungsposition',
        nachricht: 'Führungsposition muss mindestens eine Führungsaufgabe enthalten',
      });
    }
  }

  return { gueltig: fehler.length === 0, fehler };
}

/**
 * Validiert ein Tätigkeitsfeld
 */
export function validiereTaetigkeitsfeld(tf: Taetigkeitsfeld): ValidationResult {
  const fehler: ValidationError[] = [];

  if (!tf.id || tf.id.trim() === '') {
    fehler.push({ feld: 'id', nachricht: 'Tätigkeitsfeld-ID darf nicht leer sein' });
  }
  if (!tf.name || tf.name.trim() === '') {
    fehler.push({ feld: 'name', nachricht: 'Tätigkeitsfeld-Name darf nicht leer sein' });
  }
  if (!tf.aufgaben || tf.aufgaben.length === 0) {
    fehler.push({
      feld: 'aufgaben',
      nachricht: 'Mindestens eine Aufgabe muss im Tätigkeitsfeld definiert sein',
    });
  } else {
    tf.aufgaben.forEach((a, i) => {
      const aFehler = validiereAufgabe(a);
      aFehler.fehler.forEach((f) => {
        fehler.push({
          feld: `aufgaben[${i}].${f.feld}`,
          nachricht: f.nachricht,
        });
      });
    });
  }

  return { gueltig: fehler.length === 0, fehler };
}

/**
 * Validiert eine Aufgabe
 */
export function validiereAufgabe(aufgabe: Aufgabe): ValidationResult {
  const fehler: ValidationError[] = [];

  if (!aufgabe.id || aufgabe.id.trim() === '') {
    fehler.push({ feld: 'id', nachricht: 'Aufgaben-ID darf nicht leer sein' });
  }
  if (!aufgabe.bezeichnung || aufgabe.bezeichnung.trim() === '') {
    fehler.push({ feld: 'bezeichnung', nachricht: 'Aufgabenbezeichnung darf nicht leer sein' });
  }
  if (!aufgabe.beschreibung || aufgabe.beschreibung.trim() === '') {
    fehler.push({ feld: 'beschreibung', nachricht: 'Aufgabenbeschreibung darf nicht leer sein' });
  }

  return { gueltig: fehler.length === 0, fehler };
}

/**
 * Validiert eine Anforderung
 */
export function validiereAnforderung(anf: Anforderung): ValidationResult {
  const fehler: ValidationError[] = [];

  if (!anf.id || anf.id.trim() === '') {
    fehler.push({ feld: 'id', nachricht: 'Anforderungs-ID darf nicht leer sein' });
  }
  if (!anf.bezeichnung || anf.bezeichnung.trim() === '') {
    fehler.push({ feld: 'bezeichnung', nachricht: 'Anforderungsbezeichnung darf nicht leer sein' });
  }
  const gueltigeArten = ['Qualifikation', 'Erfahrung', 'SoftSkill'];
  if (!gueltigeArten.includes(anf.art)) {
    fehler.push({
      feld: 'art',
      nachricht: `Ungültige Art "${anf.art}". Erlaubt: ${gueltigeArten.join(', ')}`,
    });
  }

  return { gueltig: fehler.length === 0, fehler };
}

/**
 * Validiert eine Führungserwartung
 */
export function validiereFuehrungserwartung(
  erwartung: Fuehrungserwartung,
  existierendeJobIds: string[]
): ValidationResult {
  const fehler: ValidationError[] = [];

  if (!erwartung.jobId || erwartung.jobId.trim() === '') {
    fehler.push({ feld: 'jobId', nachricht: 'Job-ID darf nicht leer sein' });
  } else if (!existierendeJobIds.includes(erwartung.jobId)) {
    fehler.push({
      feld: 'jobId',
      nachricht: `Job-ID "${erwartung.jobId}" verweist auf keinen existierenden Job`,
    });
  }

  if (!erwartung.verantwortungen || erwartung.verantwortungen.length === 0) {
    fehler.push({
      feld: 'verantwortungen',
      nachricht: 'Mindestens eine Verantwortung muss definiert sein',
    });
  }
  if (!erwartung.erwarteteVerhaltensweisen || erwartung.erwarteteVerhaltensweisen.length === 0) {
    fehler.push({
      feld: 'erwarteteVerhaltensweisen',
      nachricht: 'Mindestens eine erwartete Verhaltensweise muss definiert sein',
    });
  }
  if (!erwartung.erfolgskriterien || erwartung.erfolgskriterien.length === 0) {
    fehler.push({
      feld: 'erfolgskriterien',
      nachricht: 'Mindestens ein Erfolgskriterium muss definiert sein',
    });
  }

  return { gueltig: fehler.length === 0, fehler };
}
