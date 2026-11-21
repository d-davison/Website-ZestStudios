/* <footer-component>: site footer. Styles live in assets/css/zest.css. */
class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <footer class="foot">
          <div class="wrap">
              <span>© ${new Date().getFullYear()} Zest Studios</span>
              <div class="foot-links">
                  <a href="https://discord.gg/2ths8Hj9QE" target="_blank" rel="noopener noreferrer"><svg class="ico" aria-hidden="true"><use href="assets/images/icons.svg#discord"/></svg>Discord</a>
                  <a href="https://twitter.com/studioszest" target="_blank" rel="noopener noreferrer"><svg class="ico" aria-hidden="true"><use href="assets/images/icons.svg#twitter"/></svg>Twitter</a>
                  <a href="https://www.instagram.com/studioszest/" target="_blank" rel="noopener noreferrer"><svg class="ico" aria-hidden="true"><use href="assets/images/icons.svg#instagram"/></svg>Instagram</a>
                  <a href="https://www.facebook.com/studioszest" target="_blank" rel="noopener noreferrer"><svg class="ico" aria-hidden="true"><use href="assets/images/icons.svg#facebook"/></svg>Facebook</a>
                  <a href="https://assetstore.unity.com/publishers/51920" target="_blank" rel="noopener noreferrer">Asset Store</a>
                  <a href="mailto:studioszest@gmail.com">studioszest@gmail.com</a>
              </div>
          </div>
      </footer>`;
    }
}

customElements.define("footer-component", Footer);
