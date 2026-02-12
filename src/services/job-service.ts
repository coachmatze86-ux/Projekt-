import {
  GastroJob,
  Taetigkeitsfeld,
  Aufgabe,
  Fuehrungserwartung,
  Kategorie,
  Niveau,
} from '../models/types';

/**
 * Service für die Verwaltung und Abfrage von Gastronomie-Jobs
 */
export class JobService {
  private jobs: GastroJob[] = [];
  private fuehrungserwartungen: Fuehrungserwartung[] = [];

  constructor(jobs: GastroJob[] = [], erwartungen: Fuehrungserwartung[] = []) {
    this.jobs = jobs;
    this.fuehrungserwartungen = erwartungen;
  }

  /** Alle Jobs abrufen */
  alleJobs(): GastroJob[] {
    return this.jobs;
  }

  /** Job anhand der ID finden */
  jobNachId(id: string): GastroJob | undefined {
    return this.jobs.find((j) => j.id === id);
  }

  /** Jobs nach Kategorie filtern */
  jobsNachKategorie(kategorie: Kategorie): GastroJob[] {
    return this.jobs.filter((j) =>
      j.taetigkeitsfelder.some((t) => t.kategorie === kategorie)
    );
  }

  /** Jobs nach Niveau filtern */
  jobsNachNiveau(niveau: Niveau): GastroJob[] {
    return this.jobs.filter((j) => j.niveau === niveau);
  }

  /** Nur Führungspositionen */
  fuehrungsJobs(): GastroJob[] {
    return this.jobs.filter((j) => j.istFuehrungsposition);
  }

  /** Alle Führungsaufgaben eines Jobs extrahieren */
  fuehrungsaufgabenFuerJob(jobId: string): Aufgabe[] {
    const job = this.jobNachId(jobId);
    if (!job) return [];

    return job.taetigkeitsfelder.flatMap((t) =>
      t.aufgaben.filter((a) => a.istFuehrungsaufgabe)
    );
  }

  /** Alle Tätigkeitsfelder eines Jobs */
  taetigkeitsfelderFuerJob(jobId: string): Taetigkeitsfeld[] {
    const job = this.jobNachId(jobId);
    return job ? job.taetigkeitsfelder : [];
  }

  /** Führungserwartungen für einen Job abrufen */
  fuehrungserwartungenFuerJob(jobId: string): Fuehrungserwartung | undefined {
    return this.fuehrungserwartungen.find((e) => e.jobId === jobId);
  }

  /** Pflichtanforderungen eines Jobs */
  pflichtanforderungen(jobId: string): string[] {
    const job = this.jobNachId(jobId);
    if (!job) return [];

    return job.anforderungen
      .filter((a) => a.pflicht)
      .map((a) => a.bezeichnung);
  }

  /** Zusammenfassung eines Jobs als strukturiertes Objekt */
  jobZusammenfassung(jobId: string) {
    const job = this.jobNachId(jobId);
    if (!job) return null;

    const erwartungen = this.fuehrungserwartungenFuerJob(jobId);

    return {
      titel: job.titel,
      niveau: job.niveau,
      istFuehrungsposition: job.istFuehrungsposition,
      anzahlTaetigkeitsfelder: job.taetigkeitsfelder.length,
      anzahlAufgaben: job.taetigkeitsfelder.reduce(
        (sum, t) => sum + t.aufgaben.length,
        0
      ),
      pflichtanforderungen: this.pflichtanforderungen(jobId),
      fuehrungserwartungen: erwartungen ?? null,
    };
  }
}
