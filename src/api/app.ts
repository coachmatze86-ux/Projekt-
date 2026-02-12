import express from 'express';
import { JobService } from '../services/job-service';
import { jobAlsMarkdown, jobUebersichtAlsMarkdown } from '../services/export';
import { validiereJob } from '../services/validation';
import { GastroJob } from '../models/types';

export function createApp(service: JobService): express.Express {
  const app = express();
  app.use(express.json());

  // GET /api/jobs — Alle Jobs abrufen
  app.get('/api/jobs', (_req, res) => {
    res.json(service.alleJobs());
  });

  // GET /api/jobs/:id — Einzelnen Job abrufen
  app.get('/api/jobs/:id', (req, res) => {
    const job = service.jobNachId(req.params.id);
    if (!job) {
      res.status(404).json({ fehler: `Job "${req.params.id}" nicht gefunden` });
      return;
    }
    res.json(job);
  });

  // GET /api/jobs/:id/zusammenfassung — Job-Zusammenfassung
  app.get('/api/jobs/:id/zusammenfassung', (req, res) => {
    const zusammenfassung = service.jobZusammenfassung(req.params.id);
    if (!zusammenfassung) {
      res.status(404).json({ fehler: `Job "${req.params.id}" nicht gefunden` });
      return;
    }
    res.json(zusammenfassung);
  });

  // GET /api/jobs/:id/markdown — Jobprofil als Markdown
  app.get('/api/jobs/:id/markdown', (req, res) => {
    const job = service.jobNachId(req.params.id);
    if (!job) {
      res.status(404).json({ fehler: `Job "${req.params.id}" nicht gefunden` });
      return;
    }
    const erwartungen = service.fuehrungserwartungenFuerJob(req.params.id);
    const markdown = jobAlsMarkdown(job, erwartungen);
    res.type('text/markdown').send(markdown);
  });

  // GET /api/jobs/:id/fuehrungsaufgaben — Führungsaufgaben eines Jobs
  app.get('/api/jobs/:id/fuehrungsaufgaben', (req, res) => {
    const job = service.jobNachId(req.params.id);
    if (!job) {
      res.status(404).json({ fehler: `Job "${req.params.id}" nicht gefunden` });
      return;
    }
    res.json(service.fuehrungsaufgabenFuerJob(req.params.id));
  });

  // GET /api/uebersicht — Übersicht aller Jobs als Markdown
  app.get('/api/uebersicht', (_req, res) => {
    const markdown = jobUebersichtAlsMarkdown(service.alleJobs());
    res.type('text/markdown').send(markdown);
  });

  // GET /api/filter/kategorie/:kategorie — Jobs nach Kategorie
  app.get('/api/filter/kategorie/:kategorie', (req, res) => {
    const jobs = service.jobsNachKategorie(req.params.kategorie as any);
    res.json(jobs);
  });

  // GET /api/filter/niveau/:niveau — Jobs nach Niveau
  app.get('/api/filter/niveau/:niveau', (req, res) => {
    const jobs = service.jobsNachNiveau(req.params.niveau as any);
    res.json(jobs);
  });

  // GET /api/filter/fuehrung — Nur Führungspositionen
  app.get('/api/filter/fuehrung', (_req, res) => {
    res.json(service.fuehrungsJobs());
  });

  // POST /api/validieren — Job-Daten validieren
  app.post('/api/validieren', (req, res) => {
    const job = req.body as GastroJob;
    const result = validiereJob(job);
    res.status(result.gueltig ? 200 : 422).json(result);
  });

  return app;
}
