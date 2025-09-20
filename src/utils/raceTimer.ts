import store from '../store';
import { HorseRacingHelper } from './horseRacingHelper';
import { TOTAL_ROUNDS } from '../constants/raceRules';

export class RaceTimer {
  private static intervalId: number | null = null;
  private static currentRound: number = 0;
  private static isWaitingForLapCompletion: boolean = false;

  static startRaceSequence() {
    if (this.intervalId !== null) {
      this.stopRaceSequence();
    }

    this.currentRound = 0;
    HorseRacingHelper.startRace();
    store.commit('raceCourse/setCurrentLap', this.currentRound);

    this.runNextRound();
  }

  static runNextRound() {
    if (this.currentRound >= TOTAL_ROUNDS) {
      this.finishRace();
      return;
    }

    store.commit('raceCourse/setCurrentLap', this.currentRound);
    this.isWaitingForLapCompletion = true;
  }

  static advanceToNextLap() {
    if (this.isWaitingForLapCompletion) {
      this.isWaitingForLapCompletion = false;
      this.currentRound++;
      this.runNextRound();
    }
  }

  static pauseRaceSequence() {
    if (this.intervalId !== null) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    HorseRacingHelper.pauseRace();
  }

  static resumeRaceSequence() {
    if (this.intervalId === null) {
      HorseRacingHelper.startRace();
      this.runNextRound();
    }
  }

  static stopRaceSequence() {
    if (this.intervalId !== null) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    this.currentRound = 0;
    HorseRacingHelper.pauseRace();
    store.commit('raceCourse/setCurrentLap', 0);
  }

  static finishRace() {
    if (this.intervalId !== null) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    HorseRacingHelper.finishRace();
    store.commit('raceCourse/setCurrentLap', TOTAL_ROUNDS);
  }

  static resetRace() {
    this.stopRaceSequence();
    HorseRacingHelper.resetRace();
  }

  static isRunning(): boolean {
    return this.intervalId !== null;
  }

  static getCurrentRound(): number {
    return this.currentRound;
  }
}
