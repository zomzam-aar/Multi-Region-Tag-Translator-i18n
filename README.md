# Multi Region Website Translator 🌍

A lightweight, client-side internationalization (i18n) library for JavaScript that enables multi-language support for websites with zero server-side dependencies.

## ✨ Features

- **Zero Dependencies**: Pure JavaScript implementation
- **Client-Side Only**: No server-side code required
- **No CORS Issues**: Language configuration embedded directly in the script
- **Easy Integration**: Simple HTML tags for translation
- **Image Localization**: Change images based on language
- **Automatic Translation**: Translates entire pages on load
- **Multiple Languages**: Support for unlimited languages
- **Lightweight**: Minimal footprint for fast loading
- **Synchronous**: No async/await complexity

## 🚀 Quick Start

### Installation

1. **Clone or Download** this repository to your project folder
2. **Include** the translator script in your HTML:
   ```html
   <script type="text/javascript" src="./translator.js" zlangu="fr"></script>
   ```
3. **Edit** `translator.js` to add your translations in the `ZLANG_CONFIG` object
4. **Use** `<zlang>` tags in your HTML for translatable content

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Multi-Language Site</title>
    <!-- Set the language using zlangu attribute -->
    <script type="text/javascript" src="./translator.js" zlangu="fr"></script>
</head>
<body>
    <h1><zlang key="title"></zlang></h1>
    <p><zlang key="greeting"></zlang>, <zlang key="name"></zlang>!</p>
    <p><zlang key="farewell"></zlang></p>
    <!-- Language-specific image -->
    <img zlang-img="logo" src="./images/default-logo.png" alt="Logo">
</body>
</html>
```

## 📁 Project Structure

```
multi_region/
├── index.html          # Example HTML page with translations
├── translator.js       # Main translation library (includes embedded config)
└── README.md          # This documentation
```

## ⚙️ Configuration

### Text Translations (ZLANG_CONFIG)

Edit the `ZLANG_CONFIG` object in `translator.js` to define your translations:

```javascript
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
```

### Image Localization (ZLANG_IMAGES)

To localize images, add language-specific image paths to the `ZLANG_IMAGES` object in `translator.js`:

```javascript
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
```

In your HTML, use the `zlang-img` attribute to mark images for localization:

```html
<img zlang-img="logo" src="./images/default-logo.png" alt="Logo">
<img zlang-img="banner" src="./images/default-banner.jpg" alt="Banner">
<img zlang-img="hero" src="./images/default-hero.webp" alt="Hero">
```

The script will automatically update the `src` attribute based on the selected language.

### Setting the Language

Specify the target language using the `zlangu` attribute in the script tag:

```html
<!-- English -->
<script src="./translator.js" zlangu="en"></script>

<!-- Spanish -->
<script src="./translator.js" zlangu="es"></script>

<!-- French -->
<script src="./translator.js" zlangu="fr"></script>
```

### HTML Translation Tags

Use `<zlang>` tags with a `key` attribute to mark translatable text content:

```html
<zlang key="your_translation_key"></zlang>
```

### HTML Image Localization

Use the `zlang-img` attribute on `<img>` tags to swap images based on language:

```html
<!-- The src will be replaced with the language-specific image -->
<img zlang-img="logo" src="./images/default-logo.png" alt="Logo">
<img zlang-img="banner" src="./images/default-banner.jpg" alt="Banner">
```

The `src` attribute serves as a fallback if no image is defined for the current language.

## 🔧 How It Works (For Developers)

### Core Components

#### 1. **Language Detection**
The script scans all `<script>` tags to find the one with the `zlangu` attribute and extracts the target language.

```javascript
let lenOf = document.getElementsByTagName("script").length;
let useLang;
for (let i = 0; i < lenOf; i++) {
    ourSrc = document.getElementsByTagName("script")[i];
    if (ourSrc.hasAttribute("zlangu")) {
        useLang = ourSrc.getAttribute('zlangu');
    }
}
```

#### 2. **Embedded Configuration**
All translations and images are embedded directly in the script, eliminating CORS issues:

```javascript
const ZLANG_CONFIG = { /* text translations */ };
const ZLANG_IMAGES = { /* image URLs */ };
```

#### 3. **zlanguageTranslator Class**
The main class that handles all translation operations:

- **Constructor**: Initializes with target language
- **availableLanguage()**: Returns the embedded language data
- **availableImages()**: Returns the embedded image data
- **translateText(key)**: Returns translated text for a specific key
- **getImage(key)**: Returns image URL for a specific key
- **translatePage()**: Automatically translates all `<zlang>` elements and `[zlang-img]` images on the page

#### 4. **Automatic Page Translation**
On DOM ready, the script automatically:
1. Instantiates the translator with the detected language
2. Scans for all `<zlang>` elements and replaces their content
3. Scans for all `[zlang-img]` elements and updates their `src` attribute

```javascript
document.addEventListener('DOMContentLoaded', initializeTranslation);
```

### Architecture Flow

```
1. Page loads → Script detects zlangu attribute
2. DOM ready → Translator initializes
3. Read embedded ZLANG_CONFIG and ZLANG_IMAGES
4. Find all <zlang> tags → Replace text content
5. Find all [zlang-img] elements → Update image sources
```

### Error Handling

The library includes robust error handling for:
- Non-existent languages
- Missing translation keys
- Missing image keys (gracefully falls back to default src)

## 📖 API Reference

### `zlanguageTranslator` Class

#### Constructor
```javascript
new zlanguageTranslator(language)
```
- **language** (string): Target language code (e.g., 'en', 'es', 'fr')

#### Methods

##### `availableLanguage()`
Returns the language configuration data.
```javascript
const config = translator.availableLanguage();
```

##### `availableImages()`
Returns the image configuration data.
```javascript
const images = translator.availableImages();
```

##### `translateText(key)`
Translates a specific key to the target language.
```javascript
const text = translator.translateText('greeting');
```

##### `getImage(key)`
Gets the image URL for a specific key in the target language.
```javascript
const imageUrl = translator.getImage('logo');
```

##### `translatePage()`
Automatically translates all `<zlang>` elements and updates all `[zlang-img]` images on the page.
```javascript
translator.translatePage();
```

## 🌐 Adding New Languages

1. **Add text translations** to `ZLANG_CONFIG` in `translator.js`:
   ```javascript
   const ZLANG_CONFIG = {
       // existing languages...
       "de": {
           "title": "Meine Website",
           "greeting": "Hallo",
           "name": "Benutzer",
           "farewell": "Auf Wiedersehen"
       }
   };
   ```

2. **Add language-specific images** to `ZLANG_IMAGES` in `translator.js` (optional):
   ```javascript
   const ZLANG_IMAGES = {
       // existing languages...
       "de": {
           "logo": "./images/logo-de.png",
           "banner": "./images/banner-de.jpg"
       }
   };
   ```

3. **Use the new language** by setting `zlangu="de"` in your script tag

## 🔄 Dynamic Language Switching

For dynamic language switching, you can programmatically change languages:

```javascript
function switchLanguage(newLang) {
    const translator = new zlanguageTranslator(newLang);
    translator.translatePage();
}

// Switch to Spanish
switchLanguage('es');
```

## 🎯 Use Cases

- **Multi-language websites** without server-side complexity
- **Static site generators** requiring i18n support
- **Client-side applications** needing quick translation
- **Prototyping** multilingual interfaces
- **Educational projects** demonstrating i18n concepts

## 🚀 Performance Considerations

- **No network requests**: All data is embedded, eliminating HTTP latency
- **No CORS issues**: Works on any server or local files
- **Synchronous execution**: Faster page rendering
- **Minimal DOM manipulation**: Efficient element updates
- **Single script file**: Reduces HTTP requests

## 🤝 Contributing

1. Fork the repository
2. Add your language to `ZLANG_CONFIG` in `translator.js`
3. Optionally add images to `ZLANG_IMAGES`
4. Test with your language using `zlangu` attribute
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**Translations not appearing?**
- Verify the language code in `zlangu` attribute matches a key in `ZLANG_CONFIG`
- Ensure translation keys exist in the config object
- Check that `<zlang>` tags have the `key` attribute

**Images not changing?**
- Verify the language has entries in `ZLANG_IMAGES`
- Ensure the `zlang-img` attribute value matches a key in the image config
- Check that image paths are correct

**Console errors?**
- Check browser console for specific error messages
- Verify JavaScript syntax in `translator.js`

**Need help?**
Open an issue in the repository with details about your setup and the problem you're experiencing.

---

**Made with ❤️ for the global web community**
