import { createApp } from './app';
import { JobService } from '../services/job-service';
import { alleJobs, alleFuehrungserwartungen } from '../data/beispiel-jobs';

const service = new JobService(alleJobs, alleFuehrungserwartungen);
const app = createApp(service);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Gastro-Job-Framework API läuft auf Port ${PORT}`);
  console.log(`Endpunkte:`);
  console.log(`  GET  /api/jobs                        — Alle Jobs`);
  console.log(`  GET  /api/jobs/:id                    — Einzelner Job`);
  console.log(`  GET  /api/jobs/:id/zusammenfassung     — Zusammenfassung`);
  console.log(`  GET  /api/jobs/:id/markdown            — Profil als Markdown`);
  console.log(`  GET  /api/jobs/:id/fuehrungsaufgaben   — Führungsaufgaben`);
  console.log(`  GET  /api/uebersicht                  — Übersicht (Markdown)`);
  console.log(`  GET  /api/filter/kategorie/:kategorie  — Nach Kategorie`);
  console.log(`  GET  /api/filter/niveau/:niveau        — Nach Niveau`);
  console.log(`  GET  /api/filter/fuehrung              — Führungspositionen`);
  console.log(`  POST /api/validieren                   — Job validieren`);
});
