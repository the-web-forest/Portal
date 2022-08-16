export default class Vibrate {
  static vibrate(ms: number) {
    if (navigator && navigator.vibrate) {
      navigator.vibrate(ms);
    }
  }
}
