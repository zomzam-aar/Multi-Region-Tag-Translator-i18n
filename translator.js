let lenOf = document.getElementsByTagName("script").length;
let ourSrc;
let useLang;
//identify the language we gonna translate to.
for (let i = 0; i < lenOf; i++) {
    ourSrc = document.getElementsByTagName("script")[i];
    if (ourSrc.hasAttribute("zlangu")) {
        useLang = ourSrc.getAttribute('zlangu');
    }
}

// Embedded language configuration (avoids CORS issues)
const ZLANG_CONFIG = {
    "en": {
        "title": "My Website",
        "greeting": "Hello",
        "name": "User",
        "farewell": "Goodbye"
    },
    "es": {
        "title": "Mi Sitio Web",
        "greeting": "Hola",
        "name": "Usuario",
        "farewell": "Adiós"
    },
    "fr": {
        "title": "Mon site web",
        "greeting": "Bonjour",
        "name": "Utilisateur",
        "farewell": "Au revoir"
    }
};

// Embedded image configuration for language-specific images
const ZLANG_IMAGES = {
    "en": {
        "logo": "./images/logo-en.png",
        "banner": "./images/banner-en.jpg",
        "hero": "./images/hero-en.webp"
    },
    "es": {
        "logo": "./images/logo-es.png",
        "banner": "./images/banner-es.jpg",
        "hero": "./images/hero-es.webp"
    },
    "fr": {
        "logo": "./images/logo-fr.png",
        "banner": "./images/banner-fr.jpg",
        "hero": "./images/hero-fr.webp"
    }
};

class zlanguageTranslator {
    constructor(zlangu) {
        this.language = zlangu;
        this.availableLangsData = ZLANG_CONFIG;
        this.imageData = ZLANG_IMAGES;
    }

    availableLanguage() {
        return this.availableLangsData;
    }

    availableImages() {
        return this.imageData;
    }

    translateText(key) {
        const availableLangs = this.availableLanguage();
        if (!availableLangs) {
            return "Error: Language data not loaded.";
        }

        if (!availableLangs[this.language]) {
            return `Error: Language '${this.language}' not found in configuration.`;
        }

        if (availableLangs[this.language][key]) {
            return availableLangs[this.language][key];
        } else {
            return `Key '${key}' not found in language '${this.language}'.`;
        }
    }

    getImage(key) {
        const images = this.availableImages();
        if (!images || !images[this.language]) {
            return null;
        }

        return images[this.language][key] || null;
    }

    translatePage() {
        // Translate text elements
        const zlangElements = document.querySelectorAll('zlang');
        for (const element of zlangElements) {
            const key = element.getAttribute('key');
            if (key) {
                const translatedText = this.translateText(key);
                element.textContent = translatedText;
            } else {
                console.warn("<zlang> tag found without 'key' attribute.");
            }
        }

        // Translate images
        const zlangImgElements = document.querySelectorAll('[zlang-img]');
        for (const element of zlangImgElements) {
            const key = element.getAttribute('zlang-img');
            if (key) {
                const imageSrc = this.getImage(key);
                if (imageSrc) {
                    element.src = imageSrc;
                }
            } else {
                console.warn("Element with zlang-img attribute found without a key value.");
            }
        }
    }
}

// Initialize translation when the DOM is fully loaded
function initializeTranslation() {
    const translator = new zlanguageTranslator(useLang);
    translator.translatePage();
}

document.addEventListener('DOMContentLoaded', initializeTranslation);

/* example
function testTranslation() {
    const translator = new zlanguageTranslator('es'); // Example: Spanish
    const availableLanguages = translator.availableLanguage();
    console.log("Available Languages:", availableLanguages);

    const translatedText = translator.translateText("greeting");
    console.log("Translated greeting:", translatedText);

    const translatedText2 = translator.translateText("farewell");
    console.log("Translated farewell:", translatedText2);

    const translatedText3 = translator.translateText("nonexistentKey");
    console.log("Translated nonexistentKey:", translatedText3);

    const translator2 = new zlanguageTranslator('fr'); // Example: French
    const translatedText4 = translator2.translateText("greeting");
    console.log("Translated greeting in French:", translatedText4);

    // Example: Get image for current language
    const logoImage = translator.getImage("logo");
    console.log("Logo image URL:", logoImage);
}

testTranslation();*/