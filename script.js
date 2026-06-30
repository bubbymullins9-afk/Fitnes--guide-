/**
 * Checkbox Progress Persistence Engine
 * Saves all checkbox states cleanly under a single localStorage object key.
 */
(() => {
  const STORAGE_KEY = "user_progress_checkboxes";
  // Selects ONLY the designated checkboxes to avoid breaking other inputs
  const checkboxes = document.querySelectorAll('input[type="checkbox"].save-state');

  if (!checkboxes.length) return;

  // 1. Safe parsing of historical data to prevent crash if storage gets corrupted
  let savedStates = {};
  try {
    savedStates = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    console.error("Failed to parse progress storage, resetting data.", error);
  }

  // 2. Initialize and bind events in a single optimized loop
  checkboxes.forEach((box) => {
    const boxId = box.id;

    // Fail gracefully and warn developer if they forgot a unique ID
    if (!boxId) {
      console.warn("Progress tracking failed for element: Missing a unique 'id' attribute.", box);
      return;
    }

    // Apply the saved state if it exists
    if (savedStates[boxId] !== undefined) {
      box.checked = Boolean(savedStates[boxId]);
    }

    // Use passive listener optimization if applicable, capturing changes instantly
    box.addEventListener("change", () => {
      // Update data pool
      if (box.checked) {
        savedStates[boxId] = true;
      } else {
        // Delete key instead of saving 'false' to keep string storage size tiny
        delete savedStates[boxId];
      }

      // Save everything back to a single unified storage key
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStates));
    });
  });
})();

