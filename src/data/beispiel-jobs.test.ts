import {
  alleJobs,
  alleFuehrungserwartungen,
  kuechenchef,
  souschef,
  serviceleiter,
  servicekraft,
  barkeeper,
  sommelier,
  restaurantleiter,
  spueler,
} from './beispiel-jobs';
import { JobService } from '../services/job-service';
import { Kategorie, Niveau } from '../models/types';

describe('Beispieldaten', () => {
  describe('Datenintegrität', () => {
    it('enthält 8 definierte Jobs', () => {
      expect(alleJobs).toHaveLength(8);
    });

    it('enthält 4 Führungserwartungen', () => {
      expect(alleFuehrungserwartungen).toHaveLength(4);
    });

    it('alle Jobs haben eindeutige IDs', () => {
      const ids = alleJobs.map((j) => j.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('alle Tätigkeitsfelder haben eindeutige IDs', () => {
      const tfIds = alleJobs.flatMap((j) =>
        j.taetigkeitsfelder.map((t) => t.id)
      );
      expect(new Set(tfIds).size).toBe(tfIds.length);
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

    it('jeder Job hat mindestens ein Tätigkeitsfeld', () => {
      alleJobs.forEach((j) => {
        expect(j.taetigkeitsfelder.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('jeder Job hat mindestens eine Anforderung', () => {
      alleJobs.forEach((j) => {
        expect(j.anforderungen.length).toBeGreaterThanOrEqual(1);
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

  describe('Souschef', () => {
    it('ist eine Führungsposition auf Fortgeschritten-Niveau', () => {
      expect(souschef.istFuehrungsposition).toBe(true);
      expect(souschef.niveau).toBe(Niveau.Fortgeschritten);
    });

    it('hat Küche- und Management-Tätigkeitsfelder', () => {
      const kategorien = souschef.taetigkeitsfelder.map((t) => t.kategorie);
      expect(kategorien).toContain(Kategorie.Kueche);
      expect(kategorien).toContain(Kategorie.Management);
    });

    it('enthält Führungsaufgaben wie Posten leiten und Vertretung', () => {
      const fuehrung = souschef.taetigkeitsfelder.flatMap((t) =>
        t.aufgaben.filter((a) => a.istFuehrungsaufgabe)
      );
      expect(fuehrung.length).toBeGreaterThanOrEqual(2);
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

  describe('Sommelier', () => {
    it('ist keine Führungsposition', () => {
      expect(sommelier.istFuehrungsposition).toBe(false);
    });

    it('ist auf Experten-Niveau', () => {
      expect(sommelier.niveau).toBe(Niveau.Experte);
    });

    it('gehört zur Service-Kategorie', () => {
      const kategorien = sommelier.taetigkeitsfelder.map((t) => t.kategorie);
      expect(kategorien).toContain(Kategorie.Service);
    });

    it('hat Weinmanagement-Aufgaben', () => {
      const aufgaben = sommelier.taetigkeitsfelder.flatMap((t) =>
        t.aufgaben.map((a) => a.bezeichnung)
      );
      expect(aufgaben).toContain('Weinkarte gestalten');
      expect(aufgaben).toContain('Gäste beraten');
    });
  });

  describe('Restaurantleiter', () => {
    it('ist eine Führungsposition auf Experten-Niveau', () => {
      expect(restaurantleiter.istFuehrungsposition).toBe(true);
      expect(restaurantleiter.niveau).toBe(Niveau.Experte);
    });

    it('hat 3 Tätigkeitsfelder: Betrieb, Personal, Gäste', () => {
      expect(restaurantleiter.taetigkeitsfelder).toHaveLength(3);
      const namen = restaurantleiter.taetigkeitsfelder.map((t) => t.name);
      expect(namen).toContain('Betriebsführung');
      expect(namen).toContain('Personalmanagement');
      expect(namen).toContain('Gästemanagement');
    });

    it('hat überwiegend Führungsaufgaben', () => {
      const alle = restaurantleiter.taetigkeitsfelder.flatMap((t) => t.aufgaben);
      const fuehrung = alle.filter((a) => a.istFuehrungsaufgabe);
      expect(fuehrung.length).toBe(alle.length);
    });
  });

  describe('Spüler / Küchenhilfe', () => {
    it('ist keine Führungsposition', () => {
      expect(spueler.istFuehrungsposition).toBe(false);
    });

    it('ist auf Einsteiger-Niveau', () => {
      expect(spueler.niveau).toBe(Niveau.Einsteiger);
    });

    it('gehört zur Küche-Kategorie', () => {
      const kategorien = spueler.taetigkeitsfelder.map((t) => t.kategorie);
      expect(kategorien.every((k) => k === Kategorie.Kueche)).toBe(true);
    });

    it('hat keine Führungsaufgaben', () => {
      const fuehrung = spueler.taetigkeitsfelder.flatMap((t) =>
        t.aufgaben.filter((a) => a.istFuehrungsaufgabe)
      );
      expect(fuehrung).toHaveLength(0);
    });
  });
});

describe('JobService mit Beispieldaten', () => {
  const service = new JobService(alleJobs, alleFuehrungserwartungen);

  it('findet 4 Führungspositionen', () => {
    const fuehrung = service.fuehrungsJobs();
    expect(fuehrung).toHaveLength(4);
    const titel = fuehrung.map((j) => j.id);
    expect(titel).toContain('kuechenchef');
    expect(titel).toContain('souschef');
    expect(titel).toContain('serviceleiter');
    expect(titel).toContain('restaurantleiter');
  });

  it('findet Jobs in jeder belegten Kategorie', () => {
    expect(service.jobsNachKategorie(Kategorie.Kueche).length).toBeGreaterThan(0);
    expect(service.jobsNachKategorie(Kategorie.Service).length).toBeGreaterThan(0);
    expect(service.jobsNachKategorie(Kategorie.Bar).length).toBeGreaterThan(0);
    expect(service.jobsNachKategorie(Kategorie.Management).length).toBeGreaterThan(0);
  });

  it('findet keine Housekeeping-Jobs (noch nicht angelegt)', () => {
    expect(service.jobsNachKategorie(Kategorie.Housekeeping)).toHaveLength(0);
  });

  it('findet Jobs auf jedem Niveau', () => {
    expect(service.jobsNachNiveau(Niveau.Einsteiger).length).toBeGreaterThan(0);
    expect(service.jobsNachNiveau(Niveau.Fortgeschritten).length).toBeGreaterThan(0);
    expect(service.jobsNachNiveau(Niveau.Experte).length).toBeGreaterThan(0);
  });

  it('Zusammenfassung Küchenchef enthält alle Details', () => {
    const z = service.jobZusammenfassung('kuechenchef');
    expect(z).not.toBeNull();
    expect(z!.titel).toBe('Küchenchef / Head Chef');
    expect(z!.anzahlTaetigkeitsfelder).toBe(3);
    expect(z!.anzahlAufgaben).toBe(8);
    expect(z!.fuehrungserwartungen).not.toBeNull();
  });

  it('Zusammenfassung Restaurantleiter zeigt umfassendes Profil', () => {
    const z = service.jobZusammenfassung('restaurantleiter');
    expect(z).not.toBeNull();
    expect(z!.anzahlTaetigkeitsfelder).toBe(3);
    expect(z!.anzahlAufgaben).toBe(8);
    expect(z!.pflichtanforderungen).toHaveLength(4);
  });
});
