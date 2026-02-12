import {
  alleJobs,
  alleFuehrungserwartungen,
  kuechenchef,
  serviceleiter,
  servicekraft,
  barkeeper,
} from './beispiel-jobs';
import { JobService } from '../services/job-service';
import { Kategorie, Niveau } from '../models/types';

describe('Beispieldaten', () => {
  describe('Datenintegrität', () => {
    it('enthält 4 definierte Jobs', () => {
      expect(alleJobs).toHaveLength(4);
    });

    it('alle Jobs haben eindeutige IDs', () => {
      const ids = alleJobs.map((j) => j.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('alle Aufgaben haben eindeutige IDs', () => {
      const aufgabenIds = alleJobs.flatMap((j) =>
        j.taetigkeitsfelder.flatMap((t) => t.aufgaben.map((a) => a.id))
      );
      expect(new Set(aufgabenIds).size).toBe(aufgabenIds.length);
    });

    it('alle Anforderungen haben eindeutige IDs', () => {
      const anforderungIds = alleJobs.flatMap((j) =>
        j.anforderungen.map((a) => a.id)
      );
      expect(new Set(anforderungIds).size).toBe(anforderungIds.length);
    });

    it('Führungserwartungen verweisen auf existierende Jobs', () => {
      const jobIds = new Set(alleJobs.map((j) => j.id));
      alleFuehrungserwartungen.forEach((e) => {
        expect(jobIds.has(e.jobId)).toBe(true);
      });
    });

    it('nur Führungspositionen haben Führungserwartungen', () => {
      alleFuehrungserwartungen.forEach((e) => {
        const job = alleJobs.find((j) => j.id === e.jobId);
        expect(job?.istFuehrungsposition).toBe(true);
      });
    });
  });

  describe('Küchenchef', () => {
    it('ist eine Führungsposition auf Experten-Niveau', () => {
      expect(kuechenchef.istFuehrungsposition).toBe(true);
      expect(kuechenchef.niveau).toBe(Niveau.Experte);
    });

    it('hat 3 Tätigkeitsfelder', () => {
      expect(kuechenchef.taetigkeitsfelder).toHaveLength(3);
    });

    it('umfasst Küche und Management Kategorien', () => {
      const kategorien = kuechenchef.taetigkeitsfelder.map((t) => t.kategorie);
      expect(kategorien).toContain(Kategorie.Kueche);
      expect(kategorien).toContain(Kategorie.Management);
    });

    it('hat Pflichtanforderungen für Ausbildung und Erfahrung', () => {
      const pflicht = kuechenchef.anforderungen.filter((a) => a.pflicht);
      expect(pflicht.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Serviceleiter', () => {
    it('ist eine Führungsposition', () => {
      expect(serviceleiter.istFuehrungsposition).toBe(true);
    });

    it('hat Service- und Management-Tätigkeitsfelder', () => {
      const kategorien = serviceleiter.taetigkeitsfelder.map((t) => t.kategorie);
      expect(kategorien).toContain(Kategorie.Service);
      expect(kategorien).toContain(Kategorie.Management);
    });
  });

  describe('Servicekraft', () => {
    it('ist keine Führungsposition', () => {
      expect(servicekraft.istFuehrungsposition).toBe(false);
    });

    it('ist auf Einsteiger-Niveau', () => {
      expect(servicekraft.niveau).toBe(Niveau.Einsteiger);
    });

    it('hat keine Führungsaufgaben', () => {
      const fuehrungsaufgaben = servicekraft.taetigkeitsfelder.flatMap((t) =>
        t.aufgaben.filter((a) => a.istFuehrungsaufgabe)
      );
      expect(fuehrungsaufgaben).toHaveLength(0);
    });
  });

  describe('Barkeeper', () => {
    it('gehört zur Bar-Kategorie', () => {
      const kategorien = barkeeper.taetigkeitsfelder.map((t) => t.kategorie);
      expect(kategorien).toContain(Kategorie.Bar);
    });

    it('ist auf Fortgeschritten-Niveau', () => {
      expect(barkeeper.niveau).toBe(Niveau.Fortgeschritten);
    });
  });
});

describe('JobService mit Beispieldaten', () => {
  const service = new JobService(alleJobs, alleFuehrungserwartungen);

  it('findet 2 Führungspositionen', () => {
    expect(service.fuehrungsJobs()).toHaveLength(2);
  });

  it('findet Jobs in jeder belegten Kategorie', () => {
    expect(service.jobsNachKategorie(Kategorie.Kueche).length).toBeGreaterThan(0);
    expect(service.jobsNachKategorie(Kategorie.Service).length).toBeGreaterThan(0);
    expect(service.jobsNachKategorie(Kategorie.Bar).length).toBeGreaterThan(0);
    expect(service.jobsNachKategorie(Kategorie.Management).length).toBeGreaterThan(0);
  });

  it('Zusammenfassung Küchenchef enthält alle Details', () => {
    const z = service.jobZusammenfassung('kuechenchef');
    expect(z).not.toBeNull();
    expect(z!.titel).toBe('Küchenchef / Head Chef');
    expect(z!.anzahlTaetigkeitsfelder).toBe(3);
    expect(z!.anzahlAufgaben).toBe(8);
    expect(z!.fuehrungserwartungen).not.toBeNull();
  });
});
