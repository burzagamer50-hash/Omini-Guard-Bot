(function () {
  const config = window.OMNI_GUARD?.kick;
  if (!config) {
    console.error("OMNI_GUARD config not found");
    return;
  }

  // البحث عن زر الطرد عن طريق النص
  const buttons = Array.from(document.querySelectorAll("button"));
  const kickButton = buttons.find(
    btn => btn.textContent.trim() === config.buttonText
  );

  // البحث عن خانة الاسم عن طريق placeholder
  const inputs = Array.from(document.querySelectorAll("input"));
  const usernameInput = inputs.find(
    input => input.placeholder === config.usernamePlaceholder
  );

  // البحث عن خانة السبب
  const textareas = Array.from(document.querySelectorAll("textarea"));
  const reasonInput = textareas.find(
    ta => ta.placeholder === config.reasonPlaceholder
  );

  if (!kickButton || !usernameInput || !reasonInput) {
    console.error("Kick elements not found", {
      kickButton,
      usernameInput,
      reasonInput
    });
    return;
  }

  kickButton.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const reason = reasonInput.value.trim();

    if (!username) {
      alert("Please enter a username");
      return;
    }

    kickButton.disabled = true;

    try {
      const res = await fetch("https://omini-guard-bot.onrender.com/kick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          reason: reason
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Kick command sent successfully");
        usernameInput.value = "";
        reasonInput.value = "";
      } else {
        alert("Kick failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection error");
    } finally {
      kickButton.disabled = false;
    }
  });
})();
