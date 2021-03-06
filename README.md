<!-- markdownlint-disable-next-line first-line-h1 -->
<div align="center" id="top">

  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<div align="center">
  <img src="docs/assets/icon.png" width="200" height="200">

  <h1>Spatular</h1>

  <p>
    <strong>The modern cookbook</strong><br>
    <a href="https://spatular.vercel.app">Web</a>
    ·
    <a href="">iOS (Coming soon)</a>
    ·
    <a href="https://play.google.com/store/apps/details?id=com.pedrosousa.spatular">Android</a>
  </p>

  <br>
  <br>
</div>

Tired of eating the same thing every day? Can't stand greasy junk food for lunch?

It's time to cook some Spatular recipes! The modern cookbook is filled with recipes from all around the world. Don't worry if you don't have all the ingredients, filter for only the ones you have in hand. Learn to cook with a beautiful, modern, and (best of all) ad-free interface!
<br>
<br>

<div align="center">
  <kbd>
    <img
      src="docs/assets/iOS.gif"
      title="iOS Demo"
    >
  </kbd>
  <kbd>
    <img
      src="docs/assets/Android.gif"
      title="Android Demo"
    >
  </kbd>
  <br>
  <br>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#built-with">Built with</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#known-issues">Known issues</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Screenshots

<div style="display:flex;justify-content:space-around;flex-flow:row wrap;">
  <img src="docs/assets/Frame 1.png" height="450px" />
  <img src="docs/assets/Frame 2.png" height="450px" />
  <img src="docs/assets/Frame 3.png" height="450px" />
  <img src="docs/assets/Frame 4.png" height="450px" />
  <img src="docs/assets/Frame 5.png" height="450px" />
  <img src="docs/assets/Frame 6.png" height="450px" />
  <img src="docs/assets/Frame 7.png" height="450px" />
  <img src="docs/assets/Frame 8.png" height="450px" />
</div>

## Built with

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Reanimated 2](https://docs.swmansion.com/react-native-reanimated/)
- [React Navigation](https://reactnavigation.org/)
- [Tailwind RN](https://github.com/jaredh159/tailwind-react-native-classnames)

## Installation

### Android & iOS

1. Make an [expo account](https://expo.dev/)
2. Clone the repo

   ```zsh
   git clone https://github.com/pedrossdemelo/spatular.git
   ```

3. Install packages

   ```zsh
   yarn
   ```

4. Build project with expo EAS

   for development change the --profile argument to development

   to build for ios change the -p argument to ios

   ```zsh
   eas build -p android --profile production
   ```

### Web

1. Make a [vercel account](https://vercel.com)
2. Clone the repo

   ```zsh
   git clone https://github.com/pedrossdemelo/spatular.git
   ```

3. Install packages

   ```zsh
   yarn
   ```

4. Build and deploy for web

   ```zsh
   yarn deploy:web
   ```

## Roadmap

- [x] Integration tests
- [x] Login page
- [x] Main recipe search page
- [x] Recipe details page
- [x] Recipe progress page
- [x] Explore page
- [x] Explore by ingredients page
- [x] Explore by nationality page
- [x] Profile page
- [x] Done recipes page
- [x] Favorite recipes page
- [x] Dark mode
- [ ] Guest users
- [ ] Internationalization support
- [ ] Deep linking
- [ ] Supabase auth

## Known issues

These no known issues at the moment. If you find one, please [open an issue](https://github.com/pedrossdemelo/spatular/issues), it would be greatly appreciated!

## License

Distributed under the GPL 3.0 License. See `LICENSE` for more information.

## Contact

- [pedrosousa.dev](https://pedrosousa.dev)

<p align="right"><a href="#top">Back to top</a></p>

[contributors-shield]: https://img.shields.io/github/contributors/pedrossdemelo/spatular?style=for-the-badge
[contributors-url]: https://github.com/pedrossdemelo/spatular/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/pedrossdemelo/spatular?style=for-the-badge
[forks-url]: https://github.com/pedrossdemelo/spatular/network/members
[stars-shield]: https://img.shields.io/github/stars/pedrossdemelo/spatular?style=for-the-badge
[stars-url]: https://github.com/pedrossdemelo/spatular/stargazers
[issues-shield]: https://img.shields.io/github/issues/pedrossdemelo/spatular?style=for-the-badge
[issues-url]: https://github.com/pedrossdemelo/spatular/issues
[license-shield]: https://img.shields.io/github/license/pedrossdemelo/spatular?style=for-the-badge
[license-url]: https://github.com/pedrossdemelo/spatular/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/pedrossdemelo/
