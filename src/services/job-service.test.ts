import { JobService } from './job-service';
import {
  GastroJob,
  Fuehrungserwartung,
  Kategorie,
  Niveau,
} from '../models/types';

// ── Testdaten ──────────────────────────────────────────────

const testAufgaben = {
  speisekarteErstellen: {
    id: 'a1',
    bezeichnung: 'Speisekarte erstellen',
    beschreibung: 'Saisonale Speisekarte planen und kalkulieren',
    niveau: Niveau.Experte,
    istFuehrungsaufgabe: true,
  },
  gerichteZubereiten: {
    id: 'a2',
    bezeichnung: 'Gerichte zubereiten',
    beschreibung: 'Speisen nach Rezeptur zubereiten und anrichten',
    niveau: Niveau.Fortgeschritten,
    istFuehrungsaufgabe: false,
  },
  gaesteBetreuen: {
    id: 'a3',
    bezeichnung: 'Gäste betreuen',
    beschreibung: 'Gäste empfangen, beraten und Bestellungen aufnehmen',
    niveau: Niveau.Einsteiger,
    istFuehrungsaufgabe: false,
  },
  teamFuehren: {
    id: 'a4',
    bezeichnung: 'Team führen',
    beschreibung: 'Schichtplanung, Mitarbeitergespräche, Einarbeitung',
    niveau: Niveau.Experte,
    istFuehrungsaufgabe: true,
  },
};

const testTaetigkeitsfelder = {
  kuechenleitung: {
    id: 'tf1',
    name: 'Küchenleitung',
    kategorie: Kategorie.Kueche,
    beschreibung: 'Führung und Organisation der Küche',
    aufgaben: [testAufgaben.speisekarteErstellen, testAufgaben.gerichteZubereiten],
  },
  serviceBereich: {
    id: 'tf2',
    name: 'Servicebereich',
    kategorie: Kategorie.Service,
    beschreibung: 'Gästebetreuung und Serviceablauf',
    aufgaben: [testAufgaben.gaesteBetreuen],
  },
  personalfuehrung: {
    id: 'tf3',
    name: 'Personalführung',
    kategorie: Kategorie.Management,
    beschreibung: 'Führung und Entwicklung des Teams',
    aufgaben: [testAufgaben.teamFuehren],
  },
};

const kuechenchef: GastroJob = {
  id: 'job1',
  titel: 'Küchenchef',
  beschreibung: 'Leitung der gesamten Küche',
  istFuehrungsposition: true,
  niveau: Niveau.Experte,
  taetigkeitsfelder: [testTaetigkeitsfelder.kuechenleitung, testTaetigkeitsfelder.personalfuehrung],
  anforderungen: [
    {
      id: 'anf1',
      bezeichnung: 'Ausbildung als Koch',
      beschreibung: 'Abgeschlossene Berufsausbildung als Koch/Köchin',
      art: 'Qualifikation',
      pflicht: true,
    },
    {
      id: 'anf2',
      bezeichnung: '5 Jahre Berufserfahrung',
      beschreibung: 'Mindestens 5 Jahre Erfahrung in der gehobenen Gastronomie',
      art: 'Erfahrung',
      pflicht: true,
    },
    {
      id: 'anf3',
      bezeichnung: 'Kreativität',
      beschreibung: 'Kreativität bei der Entwicklung neuer Gerichte',
      art: 'SoftSkill',
      pflicht: false,
    },
  ],
};

const servicekraft: GastroJob = {
  id: 'job2',
  titel: 'Servicekraft',
  beschreibung: 'Bedienung und Betreuung der Gäste',
  istFuehrungsposition: false,
  niveau: Niveau.Einsteiger,
  taetigkeitsfelder: [testTaetigkeitsfelder.serviceBereich],
  anforderungen: [
    {
      id: 'anf4',
      bezeichnung: 'Freundliches Auftreten',
      beschreibung: 'Gepflegtes und freundliches Auftreten gegenüber Gästen',
      art: 'SoftSkill',
      pflicht: true,
    },
  ],
};

const testErwartungen: Fuehrungserwartung = {
  jobId: 'job1',
  verantwortungen: [
    'Qualitätssicherung aller Speisen',
    'Einhaltung der Hygienevorschriften',
    'Wareneinkauf und Budgetkontrolle',
  ],
  erwarteteVerhaltensweisen: [
    'Vorbildfunktion im Team',
    'Konstruktives Feedback geben',
    'Ruhiges Handeln unter Druck',
  ],
  erfolgskriterien: [
    'Gästezufriedenheit > 90%',
    'Wareneinsatz im Budgetrahmen',
    'Mitarbeiterfluktuation < 15%',
  ],
};

// ── Tests ──────────────────────────────────────────────────

describe('JobService', () => {
  let service: JobService;

  beforeEach(() => {
    service = new JobService([kuechenchef, servicekraft], [testErwartungen]);
  });

  describe('alleJobs', () => {
    it('gibt alle registrierten Jobs zurück', () => {
      const jobs = service.alleJobs();
      expect(jobs).toHaveLength(2);
    });

    it('gibt leeres Array zurück wenn keine Jobs vorhanden', () => {
      const leererService = new JobService();
      expect(leererService.alleJobs()).toEqual([]);
    });
  });

  describe('jobNachId', () => {
    it('findet einen Job anhand seiner ID', () => {
      const job = service.jobNachId('job1');
      expect(job).toBeDefined();
      expect(job!.titel).toBe('Küchenchef');
    });

    it('gibt undefined zurück bei unbekannter ID', () => {
      expect(service.jobNachId('unbekannt')).toBeUndefined();
    });
  });

  describe('jobsNachKategorie', () => {
    it('filtert Jobs nach Küche-Kategorie', () => {
      const jobs = service.jobsNachKategorie(Kategorie.Kueche);
      expect(jobs).toHaveLength(1);
      expect(jobs[0].titel).toBe('Küchenchef');
    });

    it('filtert Jobs nach Service-Kategorie', () => {
      const jobs = service.jobsNachKategorie(Kategorie.Service);
      expect(jobs).toHaveLength(1);
      expect(jobs[0].titel).toBe('Servicekraft');
    });

    it('gibt leeres Array bei Kategorie ohne Jobs', () => {
      const jobs = service.jobsNachKategorie(Kategorie.Bar);
      expect(jobs).toHaveLength(0);
    });
  });

  describe('jobsNachNiveau', () => {
    it('filtert Experten-Jobs', () => {
      const jobs = service.jobsNachNiveau(Niveau.Experte);
      expect(jobs).toHaveLength(1);
      expect(jobs[0].titel).toBe('Küchenchef');
    });

    it('filtert Einsteiger-Jobs', () => {
      const jobs = service.jobsNachNiveau(Niveau.Einsteiger);
      expect(jobs).toHaveLength(1);
      expect(jobs[0].titel).toBe('Servicekraft');
    });
  });

  describe('fuehrungsJobs', () => {
    it('gibt nur Führungspositionen zurück', () => {
      const jobs = service.fuehrungsJobs();
      expect(jobs).toHaveLength(1);
      expect(jobs[0].istFuehrungsposition).toBe(true);
      expect(jobs[0].titel).toBe('Küchenchef');
    });
  });

  describe('fuehrungsaufgabenFuerJob', () => {
    it('extrahiert Führungsaufgaben des Küchenchefs', () => {
      const aufgaben = service.fuehrungsaufgabenFuerJob('job1');
      expect(aufgaben).toHaveLength(2);
      expect(aufgaben.every((a) => a.istFuehrungsaufgabe)).toBe(true);
    });

    it('gibt leeres Array für Nicht-Führungsjob', () => {
      const aufgaben = service.fuehrungsaufgabenFuerJob('job2');
      expect(aufgaben).toHaveLength(0);
    });

    it('gibt leeres Array für unbekannte Job-ID', () => {
      const aufgaben = service.fuehrungsaufgabenFuerJob('unbekannt');
      expect(aufgaben).toEqual([]);
    });
  });

  describe('taetigkeitsfelderFuerJob', () => {
    it('gibt alle Tätigkeitsfelder eines Jobs zurück', () => {
      const felder = service.taetigkeitsfelderFuerJob('job1');
      expect(felder).toHaveLength(2);
      expect(felder.map((f) => f.name)).toEqual(['Küchenleitung', 'Personalführung']);
    });

    it('gibt leeres Array bei unbekanntem Job', () => {
      expect(service.taetigkeitsfelderFuerJob('unbekannt')).toEqual([]);
    });
  });

  describe('fuehrungserwartungenFuerJob', () => {
    it('gibt Führungserwartungen für Küchenchef zurück', () => {
      const erwartungen = service.fuehrungserwartungenFuerJob('job1');
      expect(erwartungen).toBeDefined();
      expect(erwartungen!.verantwortungen).toHaveLength(3);
      expect(erwartungen!.erwarteteVerhaltensweisen).toContain('Vorbildfunktion im Team');
      expect(erwartungen!.erfolgskriterien).toContain('Gästezufriedenheit > 90%');
    });

    it('gibt undefined für Job ohne Führungserwartungen', () => {
      expect(service.fuehrungserwartungenFuerJob('job2')).toBeUndefined();
    });
  });

  describe('pflichtanforderungen', () => {
    it('gibt Pflichtanforderungen des Küchenchefs zurück', () => {
      const pflicht = service.pflichtanforderungen('job1');
      expect(pflicht).toHaveLength(2);
      expect(pflicht).toContain('Ausbildung als Koch');
      expect(pflicht).toContain('5 Jahre Berufserfahrung');
    });

    it('enthält keine optionalen Anforderungen', () => {
      const pflicht = service.pflichtanforderungen('job1');
      expect(pflicht).not.toContain('Kreativität');
    });

    it('gibt leeres Array bei unbekanntem Job', () => {
      expect(service.pflichtanforderungen('unbekannt')).toEqual([]);
    });
  });

  describe('jobZusammenfassung', () => {
    it('erstellt vollständige Zusammenfassung für Küchenchef', () => {
      const zusammenfassung = service.jobZusammenfassung('job1');
      expect(zusammenfassung).not.toBeNull();
      expect(zusammenfassung).toEqual({
        titel: 'Küchenchef',
        niveau: Niveau.Experte,
        istFuehrungsposition: true,
        anzahlTaetigkeitsfelder: 2,
        anzahlAufgaben: 3,
        pflichtanforderungen: ['Ausbildung als Koch', '5 Jahre Berufserfahrung'],
        fuehrungserwartungen: testErwartungen,
      });
    });

    it('erstellt Zusammenfassung ohne Führungserwartungen für Servicekraft', () => {
      const zusammenfassung = service.jobZusammenfassung('job2');
      expect(zusammenfassung).not.toBeNull();
      expect(zusammenfassung!.istFuehrungsposition).toBe(false);
      expect(zusammenfassung!.fuehrungserwartungen).toBeNull();
    });

    it('gibt null bei unbekanntem Job', () => {
      expect(service.jobZusammenfassung('unbekannt')).toBeNull();
    });
  });
});
