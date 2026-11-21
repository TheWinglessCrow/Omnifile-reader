// ===============================================
// OMNIFILE - MAIN APPLICATION
// Version 0.1.0
// ===============================================

// Application elements

const fileInput = document.getElementById("file-input");
const selectButton = document.getElementById("select-files");
const openButton = document.getElementById("open-file");
const fileList = document.getElementById("file-list");
const fileCount = document.getElementById("file-count");
const imageCount = document.getElementById("image-count");
const archiveCount = document.getElementById("archive-count");
const previewSection = document.getElementById("preview-section");
const imagePreview = document.getElementById("image-name");
const previewName = document.getElementById("preview-name");
const closeButton = document.getElementById("clear-files");

// Application storage (current session)

let selectedFiles = [];
let currentPreviewURL = null;

// Support file types

const imageType = ["jpg","jpeg","png","gif"];
const archiveType = ["zip","rar","chz"];
const comicType = ["cbz"];
const diskTypes = ["chd"];

// Get file extension

function getExtension(filename) {
    const parts = filename.split(".");
    if (parts.length < 2) {
        return "";
    }
    return parts.pop().toLowerCase();
}

// Identify file type

function identifyFile(file) {
    const extension = getExtension(file.name);
    if (imageTypes.includes(extension)) {
        return "image";
    }
    if (comicTypes.includes(extensions)) {
        return "comic";
    }
    if (archiveTypes.includes(extensions)) {
        return "archive";
    }
    if (diskTypes.includes(extensions)) {
        return "disk";
    }
    return "unknown";
}

// Display file size

function formatFileSize(bytes) {
    if (bytes < 1024) {
        return bytes + " Bytes";
    }
    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + " KB";
    }
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

// Open file selector

selectButton.addEvenListener("click", () => {
    fileInput.click();
});
opneButton.addEvenListener("click", () => {
    fileInput.click();
});

// When files are selected

fileInput.addEvenListener("change", (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        const alreadyAdded = selectedFiles.some(
            existing =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified
        );
        if (!alreadyAdded) {
            selectedFiles.push(file);
        }
    });
    displayFiles();
    fileInput.value = "";
});

// Display selected files

function displayFiles() {
    fileList.innerHTML = "";
    if (selectedFiles.length === 0) {
        fileList.innerHTML = `
            <div class="empty-state">
                <div>📁</div>
                <h3>No files selected</h3>
                <p>Your selected files will appear here.</p>
            </div>
        `;
    }
    let images = 0;
    let archives = 0;
    let comics = 0;
    selectedFiles.forEach((file, index) => {
        const type = identifyFile(file);
        let icon = "📄";
        if (type === "image") {
            icon = "🖼️";
            images++;
        }
        if (type === "archive") {
            icon = "📦";
            archives++;
        }
        if (type === "disk") {
            icon = "💿";
        }
        if (type === "comic") {
            icon = "📚";
        }
        if (type === "comic") {
            comic++;
        }
        const card = document.createElement("div");
        card.className = "file-card";
        const iconElement = document.createElement("div");
        iconElement.className = "file-icon";
        iconElement.textContent = icon;
        actionButton.textContent =
            type === "image" ? "Preview" : "Open";
        actionButton.addEventListener("click", () => {
            openFile(file);
        });
        card.appendChild(iconElement);
        card.appendChild(nameElement);
        card.appendChild(sizeElement);
        card.appendChild(typeElement);
        card.appendChild(actionButton);
        fileList.appendChild(card);
    });
    fileCount.textContent = selectedFiles.length;
    imageCount.textContent = images;
    archiveCount.textContent = archives;
}

// Open selected file

function openFile(file) {
    const type = identifyFile(file);
    if (type === "image") {
        previewImage(file);
    } else if (type === "archive") {
        alert(
            "Archive support is coming in Phase 3 and Phase 4.\n\n" +
            "Selected file: " + file.name
        );
    } else if (type === "disk") {
        alert(
            "CHD processing is coming in Phase 5.\n\n" +
            "Selected file: " + file.name
        );
    } else {
        alert("This file format is not supported.");
    }
}

// Close preview

closePreview.addEventListener("click", () => {
    previewSection.hidden = true;
    imagePreview.removeAttribute("src");
    if (currentPreviewURL) {
        URL.revokeObjectURL(currentPreviewURL);
        currentPreviewURL = null;
    }
});

// Clear selected files

clearButton.addEventListener("click", () => {
    selectedFiles = [];
    displayFiles();
    previewSection.hidden = true;
    imagePreview.removeAttribute("src");
    if (currentPreviewURL) {
        URL.revokeObjectURL(currentPreviewURL);
        currentPreviewURL = null;
    }
});

// Application startup

displayFiles();
console.log("OmniFile v0.1.0 loaded successfully.");