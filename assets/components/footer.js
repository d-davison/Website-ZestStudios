class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!document.getElementById("footer-styles")) {
            var s = document.createElement("style");
            s.id = "footer-styles";
            // Tighten social-icon spacing so 5 icons don't crowd the email column.
            s.textContent = "footer .navbar-nav.social i,footer .navbar-nav.social svg{margin:0 12px !important;}";
            document.head.appendChild(s);
        }
        this.innerHTML = `
      <footer class="odd">

          <!-- Footer [links] -->
          <section id="footer" class="footer">
              <div class="container">
                  <div class="row items footer-widget">
                      <div class="col-12 col-lg-3 p-0">
                          <div class="row">
                              <div class="branding col-12 p-3 text-center text-lg-left item">
                                  <div class="brand">
                                      <a href="/" class="logo">
                                          Socials.
                                      </a>
                                  </div>
                                  <p></p>
                                  <ul class="navbar-nav social share-list mt-0 ml-auto">
                                      <li class="nav-item">
                                          <a href="https://twitter.com/studioszest" target="_blank" rel="noopener noreferrer" class="nav-link"><i class="icon-social-twitter"></i></a>
                                      </li>
                                      <li class="nav-item social">
                                          <a href="https://www.instagram.com/studioszest/" target="_blank" rel="noopener noreferrer" class="nav-link"><i class="icon-social-instagram"></i></a>
                                      </li>
                                      <li class="nav-item social">
                                          <a href="https://www.facebook.com/studioszest" target="_blank" rel="noopener noreferrer" class="nav-link"><i class="icon-social-facebook"></i></a>
                                      </li>
                                      <li class="nav-item social">
                                          <a href="https://discord.gg/2ths8Hj9QE" target="_blank" rel="noopener noreferrer" class="nav-link" aria-label="Discord"><svg viewBox="0 0 24 24" style="width:22px;height:22px;margin:0 12px;vertical-align:middle;" aria-hidden="true"><defs><linearGradient id="footerDiscordGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0.15" stop-color="#dac1ff"/><stop offset="0.65" stop-color="#c095ff"/></linearGradient></defs><path fill="none" stroke="url(#footerDiscordGrad)" stroke-width="1.4" stroke-linejoin="round" d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.245.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z"/></svg></a>
                                      </li>
                                      <li class="nav-item social">
                                          <a href="https://assetstore.unity.com/publishers/51920" target="_blank" rel="noopener noreferrer" class="nav-link" aria-label="Unity Asset Store"><svg viewBox="0 0 24 24" style="width:20px;height:20px;margin:0 12px;vertical-align:middle;" aria-hidden="true"><defs><linearGradient id="footerUnityGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0.15" stop-color="#dac1ff"/><stop offset="0.65" stop-color="#c095ff"/></linearGradient></defs><path fill="none" stroke="url(#footerUnityGrad)" stroke-width="1.3" stroke-linejoin="round" d="m12.9288 4.2939 3.7997 2.1929c.1366.077.1415.2905 0 .3675l-4.515 2.6076a.4192.4192 0 0 1-.4246 0L7.274 6.8543c-.139-.0745-.1415-.293 0-.3675l3.7972-2.193V0L1.3758 5.5977V16.793l3.7177-2.1456v-4.3858c-.0025-.1565.1813-.2682.318-.1838l4.5148 2.6076a.4252.4252 0 0 1 .2136.3676v5.2127c.0025.1565-.1813.2682-.3179.1838l-3.7996-2.1929-3.7178 2.1457L12 24l9.6954-5.5977-3.7178-2.1457-3.7996 2.1929c-.1341.082-.3229-.0248-.3179-.1838V13.053c0-.1565.087-.2956.2136-.3676l4.5149-2.6076c.134-.082.3228.0224.3179.1838v4.3858l3.7177 2.1456V5.5977L12.9288 0Z"/></svg></a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="col-12 col-lg-9 p-0">
                          <div class="row">
                              <div class="col-12 col-lg-4 p-3 text-center text-lg-left item">
                                  <h4 class="title">Get in Touch</h4>
                                  <ul class="navbar-nav">
                                      <li class="nav-item">
                                          <a href="mailto:studioszest@gmail.com" class="nav-link">
                                              <i class="icon-envelope mr-2"></i>
                                              studioszest@gmail.com
                                          </a>
                                      </li>
                                  </ul>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </section>

      </footer>
        `;
    }
}

customElements.define("footer-component", Footer);
