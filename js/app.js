// js/app.js

// DOM Elements
const shortenBtn = document.getElementById("shortenBtn");
const longUrlInput = document.getElementById("longUrl");
const customNameInput = document.getElementById("customName");
const imageInput = document.getElementById("imageUpload");
const outputSection = document.getElementById("outputSection");
const shortLink = document.getElementById("shortLink");
const copyBtn = document.getElementById("copyBtn");
const downloadSection = document.getElementById("downloadSection");

// Max image size: 2MB
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

// Handle button click
shortenBtn.addEventListener("click", () => {
  const longUrl = longUrlInput.value.trim();
  const customName = customNameInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!longUrl || !longUrl.startsWith("http")) {
    alert("Please enter a valid link starting with http or https.");
    return;
  }

  if (customName.length > 30) {
    alert("Custom name must be 30 characters or less.");
    return;
  }

  if (imageFile && imageFile.size > MAX_IMAGE_SIZE) {
    alert("Image file is too large! Please upload an image less than 2MB.");
    return;
  }

  // Simulate shortened link (this will later be replaced by Flask API)
  let slug = customName || Math.random().toString(36).substring(2, 8);
  let shortenedUrl = `${window.location.origin}/r/${slug}`;

  shortLink.value = shortenedUrl;
  outputSection.classList.remove("hidden");

  // Show download section if image was uploaded
  if (imageFile) {
    downloadSection.classList.remove("hidden");
  } else {
    downloadSection.classList.add("hidden");
  }
});

// Copy to clipboard
copyBtn.addEventListener("click", () => {
  shortLink.select();
  document.execCommand("copy");
  copyBtn.innerText = "Copied!";
  setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
});
