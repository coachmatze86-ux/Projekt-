/**
 * Anforderungsniveau für Aufgaben und Positionen
 */
export enum Niveau {
  Einsteiger = 'Einsteiger',
  Fortgeschritten = 'Fortgeschritten',
  Experte = 'Experte',
}

/**
 * Kategorie eines Tätigkeitsfelds
 */
export enum Kategorie {
  Kueche = 'Küche',
  Service = 'Service',
  Bar = 'Bar',
  Management = 'Management',
  Housekeeping = 'Housekeeping',
}

/**
 * Eine konkrete Aufgabe innerhalb eines Tätigkeitsfelds
 */
export interface Aufgabe {
  /** Eindeutige ID */
  id: string;
  /** Bezeichnung der Aufgabe */
  bezeichnung: string;
  /** Detaillierte Beschreibung */
  beschreibung: string;
  /** Erforderliches Niveau */
  niveau: Niveau;
  /** Ist dies eine Führungsaufgabe? */
  istFuehrungsaufgabe: boolean;
}

/**
 * Anforderung an eine Position (Qualifikation, Erfahrung, Soft Skill)
 */
export interface Anforderung {
  /** Eindeutige ID */
  id: string;
  /** Bezeichnung der Anforderung */
  bezeichnung: string;
  /** Beschreibung */
  beschreibung: string;
  /** Art der Anforderung */
  art: 'Qualifikation' | 'Erfahrung' | 'SoftSkill';
  /** Ist dies verpflichtend? */
  pflicht: boolean;
}

/**
 * Ein Tätigkeitsfeld gruppiert zusammengehörige Aufgaben
 */
export interface Taetigkeitsfeld {
  /** Eindeutige ID */
  id: string;
  /** Name des Tätigkeitsfelds */
  name: string;
  /** Kategorie */
  kategorie: Kategorie;
  /** Beschreibung des Felds */
  beschreibung: string;
  /** Zugeordnete Aufgaben */
  aufgaben: Aufgabe[];
}

/**
 * Ein Gastronomie-Job mit allen zugeordneten Feldern
 */
export interface GastroJob {
  /** Eindeutige ID */
  id: string;
  /** Jobtitel */
  titel: string;
  /** Beschreibung der Position */
  beschreibung: string;
  /** Ist dies eine Führungsposition? */
  istFuehrungsposition: boolean;
  /** Erforderliches Mindest-Niveau */
  niveau: Niveau;
  /** Zugeordnete Tätigkeitsfelder */
  taetigkeitsfelder: Taetigkeitsfeld[];
  /** Anforderungen an den Stelleninhaber */
  anforderungen: Anforderung[];
}

/**
 * Erwartungen an eine Führungskraft
 */
export interface Fuehrungserwartung {
  /** Zugehöriger Job */
  jobId: string;
  /** Führungsverantwortungen */
  verantwortungen: string[];
  /** Erwartetes Verhalten */
  erwarteteVerhaltensweisen: string[];
  /** Kennzahlen / Erfolgskriterien */
  erfolgskriterien: string[];
}
