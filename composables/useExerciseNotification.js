const STORAGE_KEY = 'exerciseNotificationsPreference';

function getPreference() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v || 'ask';
  } catch (_) {
    return 'ask';
  }
}

function setPreference(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch (_) {}
}

export function useExerciseNotification() {
  function isSupported() {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  function shouldPrompt() {
    if (!isSupported()) return false;
    const pref = getPreference();
    return Notification.permission === 'default' && pref !== 'disabled';
  }

  async function requestAndSavePermission() {
    if (!isSupported()) return 'unsupported';
    try {
      const res = await Notification.requestPermission();
      if (res === 'granted') setPreference('enabled');
      else setPreference('disabled');
      return res;
    } catch (_) {
      setPreference('disabled');
      return 'denied';
    }
  }

  function disableByUserChoice() {
    setPreference('disabled');
  }

  function canNotifyNow() {
    return isSupported() && Notification.permission === 'granted';
  }

  return {
    shouldPrompt,
    requestAndSavePermission,
    disableByUserChoice,
    canNotifyNow,
  };
}
