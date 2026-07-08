/* =====================================================================
   <contact-component>: "Points of Contact" band shown above the footer.
   =====================================================================

   Three clickable cards: Instagram, Email, and Discord. Drop it on any
   page (just above <footer-component>) and load this script in <head>:
     <script src="assets/components/contact.js" defer></script>
     <contact-component></contact-component>
   ===================================================================== */
(function () {
  // Discord has no glyph in the icon font, so use an inline SVG logo.
  var DISCORD_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<defs><linearGradient id="contactDiscordGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0.15" stop-color="#dac1ff"/><stop offset="0.65" stop-color="#c095ff"/></linearGradient></defs>' +
    '<path fill="none" stroke="url(#contactDiscordGrad)" stroke-width="1.2" stroke-linejoin="round" d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.245.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z"/></svg>';

  if (!document.getElementById("contact-styles")) {
    var style = document.createElement("style");
    style.id = "contact-styles";
    style.textContent = [
      "#contacts.contact-block{background-color:#f5f5f5;}",
      ".contact-block .items .item > a{display:block;color:inherit;text-decoration:none;}",
      ".contact-block .icon-discord{display:inline-flex;align-items:center;justify-content:center;}",
      ".contact-block .icon-discord svg{width:2.8rem;height:2.8rem;}",
      ".contact-block .card:not(.no-hover):hover .icon-discord svg path{stroke:#f5f5f5;}"
    ].join("");
    document.head.appendChild(style);
  }

  class ContactPoints extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <section id="contacts" class="contact-block section-1 offers">
          <div class="container">
              <div class="row intro">
                  <div class="col-12 text-center text-md-left">
                      <h2 class="featured">Points of Contact</h2>
                      <p>Want to talk? These are the best ways to reach us.</p>
                  </div>
              </div>
              <div class="row justify-content-center text-center items">
                  <div class="col-12 col-md-6 col-lg-4 item">
                      <a href="https://www.instagram.com/studioszest/" target="_blank" rel="noopener noreferrer">
                          <div class="card featured">
                              <i class="icon icon-social-instagram"></i>
                              <h4>@studioszest</h4>
                              <p class="mb-1">Follow and message us on Instagram.</p>
                          </div>
                      </a>
                  </div>
                  <div class="col-12 col-md-6 col-lg-4 item">
                      <a href="mailto:studioszest@gmail.com">
                          <div class="card">
                              <i class="icon icon-envelope"></i>
                              <h4>studioszest@gmail.com</h4>
                              <p class="mb-1">Email us. We reply within 8 hours on business days.</p>
                          </div>
                      </a>
                  </div>
                  <div class="col-12 col-md-6 col-lg-4 item">
                      <a href="https://discord.gg/2ths8Hj9QE" target="_blank" rel="noopener noreferrer">
                          <div class="card featured">
                              <span class="icon icon-discord">${DISCORD_SVG}</span>
                              <h4>Join our Discord</h4>
                              <p class="mb-1">Hang out with us in our Discord community.</p>
                          </div>
                      </a>
                  </div>
              </div>
          </div>
      </section>
      `;
    }
  }

  customElements.define("contact-component", ContactPoints);
})();
