<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Hamziss/timerr">
    <img src="/public/images/favicon.ico" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Timerr</h3>

  <p align="center">
    A Multiplayer Draw and guess game !
    <br />
    <a href="https://github.com/Hamziss/timerr"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://timerr-dev.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/Hamziss/timerr/issues">Report Bug</a>
    ·
    <a href="https://github.com/Hamziss/timerr/pulls">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
   
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
![Peek ](Drawilio-Front/public/preview.gif)


timerr is a free productivity web app. The goal of this app is to help you to be productive and focus on any task you are working on it can be anything , for example studying, writing, or coding. :smile:.

<p align="right">(<a href="#top">back to top</a>)</p>

### Tech Stack used

- [React.js](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [zustand](https://github.com/pmndrs/zustand)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up you have to first create a cluster in redis cloud .

### Prerequisites


- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/Hamziss/timerr.git
   ```
3. Install NPM packages inside Drawilio-Api and Drawilio-Front
   ```sh
   npm install
   ```
4. Enter this env variables in `.env`
   ```env
    MONGODB_URI=""
    NEXTAUTH_SECRET=""
    NEXTAUTH_URL="http://localhost:3000"
    NEXT_PUBLIC_SECRET_SESSION=""
    NEXT_PUBLIC_CLOUDINARY_URL="your cloundinary link"
    ANALYZE="false"
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    GITHUB_ID=
    GITHUB_SECRET=
   ```
5. start the server and the front with two terminal by running :
   ```
   npm start
   ```
<p align="right">(<a href="#top">back to top</a>)</p>




<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Hamziss/timerr/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/Hamziss/timerr/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/Hamziss/timerr/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/Hamziss/timerr/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/Hamziss/timerr/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[product-screenshot]: images/screenshot.png
