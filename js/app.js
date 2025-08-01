// quicklink-app/js/app.js

const generateBtn = document.getElementById("generate-btn");
const linkInput = document.getElementById("link-input");
const imageInput = document.getElementById("image-upload");
const downloadSection = document.getElementById("download-section");
const downloadLink = document.getElementById("download-link");

generateBtn.addEventListener("click", async () => {
  const link = linkInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!link.startsWith("http")) {
    alert("Please enter a valid URL starting with http or https.");
    return;
  }

  if (!imageFile) {
    alert("Please upload an image.");
    return;
  }

  const formData = new FormData();
  formData.append("link", link);
  formData.append("image", imageFile);

  try {
    const res = await fetch("https://quicklinkbackend-ukah.onrender.com/generate_pdf", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (res.ok && result.pdfUrl) {
      const fullPdfUrl = `https://quicklinkbackend-ukah.onrender.com${result.pdfUrl}`;
      downloadLink.href = fullPdfUrl;
      downloadSection.classList.remove("hidden");
    } else {
      alert(result.error || "PDF generation failed.");
    }
  } catch (err) {
    alert("Server error. Please try again.");
    console.error(err);
  }
});
