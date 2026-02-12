import {
  validiereJob,
  validiereTaetigkeitsfeld,
  validiereAufgabe,
  validiereAnforderung,
  validiereFuehrungserwartung,
} from './validation';
import { GastroJob, Fuehrungserwartung, Kategorie, Niveau } from '../models/types';
import { alleJobs, alleFuehrungserwartungen } from '../data/beispiel-jobs';

// ── Hilfsfunktion für gültigen Minimal-Job ─────────────────

function gueltigerJob(overrides: Partial<GastroJob> = {}): GastroJob {
  return {
    id: 'test-job',
    titel: 'Testjob',
    beschreibung: 'Ein Testjob',
    istFuehrungsposition: false,
    niveau: Niveau.Einsteiger,
    taetigkeitsfelder: [
      {
        id: 'tf-1',
        name: 'Testfeld',
        kategorie: Kategorie.Kueche,
        beschreibung: 'Testbeschreibung',
        aufgaben: [
          {
            id: 'a-1',
            bezeichnung: 'Testaufgabe',
            beschreibung: 'Testbeschreibung',
            niveau: Niveau.Einsteiger,
            istFuehrungsaufgabe: false,
          },
        ],
      },
    ],
    anforderungen: [
      {
        id: 'anf-1',
        bezeichnung: 'Testanforderung',
        beschreibung: 'Testbeschreibung',
        art: 'SoftSkill',
        pflicht: true,
      },
    ],
    ...overrides,
  };
}

// ── Tests ──────────────────────────────────────────────────

describe('validiereJob', () => {
  it('akzeptiert einen vollständigen Job', () => {
    const result = validiereJob(gueltigerJob());
    expect(result.gueltig).toBe(true);
    expect(result.fehler).toHaveLength(0);
  });

  it('lehnt leere ID ab', () => {
    const result = validiereJob(gueltigerJob({ id: '' }));
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld === 'id')).toBe(true);
  });

  it('lehnt leeren Titel ab', () => {
    const result = validiereJob(gueltigerJob({ titel: '  ' }));
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld === 'titel')).toBe(true);
  });

  it('lehnt leere Beschreibung ab', () => {
    const result = validiereJob(gueltigerJob({ beschreibung: '' }));
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld === 'beschreibung')).toBe(true);
  });

  it('lehnt Job ohne Tätigkeitsfelder ab', () => {
    const result = validiereJob(gueltigerJob({ taetigkeitsfelder: [] }));
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld === 'taetigkeitsfelder')).toBe(true);
  });

  it('lehnt Job ohne Anforderungen ab', () => {
    const result = validiereJob(gueltigerJob({ anforderungen: [] }));
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld === 'anforderungen')).toBe(true);
  });

  it('lehnt Führungsposition ohne Führungsaufgaben ab', () => {
    const result = validiereJob(gueltigerJob({ istFuehrungsposition: true }));
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld === 'istFuehrungsposition')).toBe(true);
  });

  it('akzeptiert Führungsposition mit Führungsaufgaben', () => {
    const job = gueltigerJob({
      istFuehrungsposition: true,
      taetigkeitsfelder: [
        {
          id: 'tf-1',
          name: 'Führung',
          kategorie: Kategorie.Management,
          beschreibung: 'Führen',
          aufgaben: [
            {
              id: 'a-1',
              bezeichnung: 'Team leiten',
              beschreibung: 'Team leiten',
              niveau: Niveau.Experte,
              istFuehrungsaufgabe: true,
            },
          ],
        },
      ],
    });
    const result = validiereJob(job);
    expect(result.gueltig).toBe(true);
  });

  it('propagiert Fehler aus verschachtelten Tätigkeitsfeldern', () => {
    const job = gueltigerJob({
      taetigkeitsfelder: [
        {
          id: '',
          name: '',
          kategorie: Kategorie.Kueche,
          beschreibung: '',
          aufgaben: [
            {
              id: 'a-1',
              bezeichnung: 'Ok',
              beschreibung: 'Ok',
              niveau: Niveau.Einsteiger,
              istFuehrungsaufgabe: false,
            },
          ],
        },
      ],
    });
    const result = validiereJob(job);
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld.startsWith('taetigkeitsfelder[0]'))).toBe(true);
  });

  it('sammelt mehrere Fehler gleichzeitig', () => {
    const job = gueltigerJob({ id: '', titel: '', beschreibung: '' });
    const result = validiereJob(job);
    expect(result.fehler.length).toBeGreaterThanOrEqual(3);
  });
});

describe('validiereTaetigkeitsfeld', () => {
  it('akzeptiert vollständiges Tätigkeitsfeld', () => {
    const result = validiereTaetigkeitsfeld({
      id: 'tf-1',
      name: 'Testfeld',
      kategorie: Kategorie.Kueche,
      beschreibung: 'Beschreibung',
      aufgaben: [
        {
          id: 'a-1',
          bezeichnung: 'Aufgabe',
          beschreibung: 'Beschreibung',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
      ],
    });
    expect(result.gueltig).toBe(true);
  });

  it('lehnt leere ID ab', () => {
    const result = validiereTaetigkeitsfeld({
      id: '',
      name: 'Test',
      kategorie: Kategorie.Kueche,
      beschreibung: 'Test',
      aufgaben: [
        {
          id: 'a-1',
          bezeichnung: 'Aufgabe',
          beschreibung: 'Test',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
      ],
    });
    expect(result.gueltig).toBe(false);
  });

  it('lehnt Tätigkeitsfeld ohne Aufgaben ab', () => {
    const result = validiereTaetigkeitsfeld({
      id: 'tf-1',
      name: 'Testfeld',
      kategorie: Kategorie.Kueche,
      beschreibung: 'Beschreibung',
      aufgaben: [],
    });
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld === 'aufgaben')).toBe(true);
  });

  it('propagiert Fehler aus verschachtelten Aufgaben', () => {
    const result = validiereTaetigkeitsfeld({
      id: 'tf-1',
      name: 'Testfeld',
      kategorie: Kategorie.Kueche,
      beschreibung: 'Beschreibung',
      aufgaben: [
        {
          id: '',
          bezeichnung: '',
          beschreibung: '',
          niveau: Niveau.Einsteiger,
          istFuehrungsaufgabe: false,
        },
      ],
    });
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld.startsWith('aufgaben[0]'))).toBe(true);
  });
});

describe('validiereAufgabe', () => {
  it('akzeptiert vollständige Aufgabe', () => {
    const result = validiereAufgabe({
      id: 'a-1',
      bezeichnung: 'Kochen',
      beschreibung: 'Speisen zubereiten',
      niveau: Niveau.Einsteiger,
      istFuehrungsaufgabe: false,
    });
    expect(result.gueltig).toBe(true);
  });

  it('lehnt leere Felder ab', () => {
    const result = validiereAufgabe({
      id: '',
      bezeichnung: '',
      beschreibung: '',
      niveau: Niveau.Einsteiger,
      istFuehrungsaufgabe: false,
    });
    expect(result.gueltig).toBe(false);
    expect(result.fehler).toHaveLength(3);
  });
});

describe('validiereAnforderung', () => {
  it('akzeptiert gültige Anforderung', () => {
    const result = validiereAnforderung({
      id: 'anf-1',
      bezeichnung: 'Ausbildung',
      beschreibung: 'Ausbildung als Koch',
      art: 'Qualifikation',
      pflicht: true,
    });
    expect(result.gueltig).toBe(true);
  });

  it('akzeptiert alle gültigen Arten', () => {
    for (const art of ['Qualifikation', 'Erfahrung', 'SoftSkill'] as const) {
      const result = validiereAnforderung({
        id: 'anf-1',
        bezeichnung: 'Test',
        beschreibung: 'Test',
        art,
        pflicht: false,
      });
      expect(result.gueltig).toBe(true);
    }
  });

  it('lehnt ungültige Art ab', () => {
    const result = validiereAnforderung({
      id: 'anf-1',
      bezeichnung: 'Test',
      beschreibung: 'Test',
      art: 'Ungueltig' as any,
      pflicht: false,
    });
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld === 'art')).toBe(true);
  });
});

describe('validiereFuehrungserwartung', () => {
  const jobIds = ['job1', 'job2'];

  it('akzeptiert gültige Führungserwartung', () => {
    const result = validiereFuehrungserwartung(
      {
        jobId: 'job1',
        verantwortungen: ['Verantwortung 1'],
        erwarteteVerhaltensweisen: ['Verhalten 1'],
        erfolgskriterien: ['Kriterium 1'],
      },
      jobIds
    );
    expect(result.gueltig).toBe(true);
  });

  it('lehnt unbekannte Job-ID ab', () => {
    const result = validiereFuehrungserwartung(
      {
        jobId: 'unbekannt',
        verantwortungen: ['V'],
        erwarteteVerhaltensweisen: ['V'],
        erfolgskriterien: ['K'],
      },
      jobIds
    );
    expect(result.gueltig).toBe(false);
    expect(result.fehler.some((f) => f.feld === 'jobId')).toBe(true);
  });

  it('lehnt leere Job-ID ab', () => {
    const result = validiereFuehrungserwartung(
      {
        jobId: '',
        verantwortungen: ['V'],
        erwarteteVerhaltensweisen: ['V'],
        erfolgskriterien: ['K'],
      },
      jobIds
    );
    expect(result.gueltig).toBe(false);
  });

  it('lehnt leere Listen ab', () => {
    const result = validiereFuehrungserwartung(
      {
        jobId: 'job1',
        verantwortungen: [],
        erwarteteVerhaltensweisen: [],
        erfolgskriterien: [],
      },
      jobIds
    );
    expect(result.gueltig).toBe(false);
    expect(result.fehler).toHaveLength(3);
  });
});

describe('Validierung der Beispieldaten', () => {
  it('alle Beispiel-Jobs sind gültig', () => {
    alleJobs.forEach((job) => {
      const result = validiereJob(job);
      expect(result.gueltig).toBe(true);
    });
  });

  it('alle Führungserwartungen sind gültig', () => {
    const jobIds = alleJobs.map((j) => j.id);
    alleFuehrungserwartungen.forEach((e) => {
      const result = validiereFuehrungserwartung(e, jobIds);
      expect(result.gueltig).toBe(true);
    });
  });
});
