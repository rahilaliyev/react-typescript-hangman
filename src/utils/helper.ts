export function showNotificationFunc(setState: (value: boolean) => void) {
  setState(true);
  setTimeout(() => {
    setState(false);
  }, 2000);
}

export function checkWin(correct: string[], wrong: string[], word: string | undefined) {
  let status = "win";

  word?.split("")?.forEach(el => {
    if (!correct.includes(el)) {
      status = "";
    }

    if (wrong.length === 6) {
      status = "lose";
    }
  });

  return status;
}
