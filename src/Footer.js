import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-card games-card">
          <div className="footer-card-header">
            <span className="footer-icon" role="img" aria-label="games">
              🎮
            </span>
            <h4>Other Games</h4>
          </div>
          <ul>
            <li>
              <a
                href="https://docs.google.com/presentation/d/1GaNAqTGpuEJXiOMSKArgR3S_ZSQg8OtxL55jcqEU6lY/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                猜猜 Meme 1
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/presentation/d/16zOGXO5Ugb7P1siX_etVHgQTaQG5N3QUWA1c0qtVCGY/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                猜猜 Meme 2
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/presentation/d/1iLTVPQ7N6qOX8ayE9jfkQe37Lh3dvm_ImrBHa-WoEl8/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                猜猜 Logo 1
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/presentation/d/1FRHyF5QohIyW_1V7hVS1_G1zxDZtSSU5dI-CrV37Tck/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                猜猜 Logo 2
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/presentation/d/13k2KaAl1UZy8UrEA9ZH9ajD1Ffuky2-HIzAzu29WXho/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                猜猜複製人
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-divider" />
        <div className="footer-card profile-card">
          <div className="footer-card-header">
            <span className="footer-icon" role="img" aria-label="profile">
              🌊
            </span>
            <h4>ChiHaoLu aka Mur**, ALu, うさみ, Alfred</h4>
          </div>
          <p>
            Hi, I'm ALu (<a href="https://chihaolu.me">chihaolu.me</a>), a
            blockchain developer and the host of the podcast <b>SimpleDog</b>.
            <br />
            <br />I created this website for my friends to enjoy at parties.
            Feel free to check out my podcast and other games using the links
            above!
          </p>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} SimpleDog's Song Game. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
