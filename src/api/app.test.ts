import request from 'supertest';
import { createApp } from './app';
import { JobService } from '../services/job-service';
import { alleJobs, alleFuehrungserwartungen, kuechenchef } from '../data/beispiel-jobs';
import { Kategorie, Niveau } from '../models/types';

const service = new JobService(alleJobs, alleFuehrungserwartungen);
const app = createApp(service);

describe('GET /api/jobs', () => {
  it('gibt alle Jobs zurück', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(8);
  });

  it('gibt JSON zurück', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.headers['content-type']).toMatch(/json/);
  });
});

describe('GET /api/jobs/:id', () => {
  it('gibt einzelnen Job zurück', async () => {
    const res = await request(app).get('/api/jobs/kuechenchef');
    expect(res.status).toBe(200);
    expect(res.body.titel).toBe('Küchenchef / Head Chef');
    expect(res.body.istFuehrungsposition).toBe(true);
  });

  it('gibt 404 bei unbekanntem Job', async () => {
    const res = await request(app).get('/api/jobs/unbekannt');
    expect(res.status).toBe(404);
    expect(res.body.fehler).toContain('unbekannt');
  });
});

describe('GET /api/jobs/:id/zusammenfassung', () => {
  it('gibt Zusammenfassung zurück', async () => {
    const res = await request(app).get('/api/jobs/kuechenchef/zusammenfassung');
    expect(res.status).toBe(200);
    expect(res.body.titel).toBe('Küchenchef / Head Chef');
    expect(res.body.anzahlTaetigkeitsfelder).toBe(3);
    expect(res.body.anzahlAufgaben).toBe(8);
    expect(res.body.fuehrungserwartungen).not.toBeNull();
  });

  it('gibt 404 bei unbekanntem Job', async () => {
    const res = await request(app).get('/api/jobs/unbekannt/zusammenfassung');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/jobs/:id/markdown', () => {
  it('gibt Markdown-Profil zurück', async () => {
    const res = await request(app).get('/api/jobs/kuechenchef/markdown');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/markdown/);
    expect(res.text).toContain('# Küchenchef / Head Chef');
    expect(res.text).toContain('## Tätigkeitsfelder');
  });

  it('enthält Führungserwartungen für Führungspositionen', async () => {
    const res = await request(app).get('/api/jobs/kuechenchef/markdown');
    expect(res.text).toContain('## Erwartungen an die Führungskraft');
  });

  it('gibt 404 bei unbekanntem Job', async () => {
    const res = await request(app).get('/api/jobs/unbekannt/markdown');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/jobs/:id/fuehrungsaufgaben', () => {
  it('gibt Führungsaufgaben des Küchenchefs zurück', async () => {
    const res = await request(app).get('/api/jobs/kuechenchef/fuehrungsaufgaben');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.every((a: any) => a.istFuehrungsaufgabe === true)).toBe(true);
  });

  it('gibt leeres Array für Servicekraft', async () => {
    const res = await request(app).get('/api/jobs/servicekraft/fuehrungsaufgaben');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it('gibt 404 bei unbekanntem Job', async () => {
    const res = await request(app).get('/api/jobs/unbekannt/fuehrungsaufgaben');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/uebersicht', () => {
  it('gibt Markdown-Übersicht zurück', async () => {
    const res = await request(app).get('/api/uebersicht');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/markdown/);
    expect(res.text).toContain('# Gastronomie-Jobs Übersicht');
    expect(res.text).toContain('8 Positionen');
  });
});

describe('GET /api/filter/kategorie/:kategorie', () => {
  it('filtert nach Küche', async () => {
    const res = await request(app).get('/api/filter/kategorie/Küche');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('gibt leeres Array bei unbelegter Kategorie', async () => {
    const res = await request(app).get('/api/filter/kategorie/Housekeeping');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});

describe('GET /api/filter/niveau/:niveau', () => {
  it('filtert nach Experte', async () => {
    const res = await request(app).get('/api/filter/niveau/Experte');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.every((j: any) => j.niveau === 'Experte')).toBe(true);
  });
});

describe('GET /api/filter/fuehrung', () => {
  it('gibt nur Führungspositionen zurück', async () => {
    const res = await request(app).get('/api/filter/fuehrung');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
    expect(res.body.every((j: any) => j.istFuehrungsposition === true)).toBe(true);
  });
});

describe('POST /api/validieren', () => {
  it('akzeptiert gültige Job-Daten', async () => {
    const res = await request(app).post('/api/validieren').send(kuechenchef);
    expect(res.status).toBe(200);
    expect(res.body.gueltig).toBe(true);
    expect(res.body.fehler).toHaveLength(0);
  });

  it('lehnt ungültige Job-Daten ab mit 422', async () => {
    const res = await request(app).post('/api/validieren').send({
      id: '',
      titel: '',
      beschreibung: '',
      istFuehrungsposition: false,
      niveau: 'Einsteiger',
      taetigkeitsfelder: [],
      anforderungen: [],
    });
    expect(res.status).toBe(422);
    expect(res.body.gueltig).toBe(false);
    expect(res.body.fehler.length).toBeGreaterThan(0);
  });
});
