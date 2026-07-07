class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
      <header id="header">

          <!-- Navbar -->
          <nav data-aos="zoom-out" data-aos-delay="800" class="navbar navbar-expand">
              <div class="container header">

                  <!-- Navbar Brand-->
                  <a class="navbar-brand" href="/">
                      ZEST STUDIOS<i class="leverage-2-0"></i>
                      <!--
                          Custom Logo
                          <img src="assets/images/logo.svg" alt="Zest Studios">
                      -->
                  </a>

                  <!-- Nav holder -->
                  <div class="ml-auto"></div>

                  <!-- Navbar Items -->
                  <ul class="navbar-nav items">
                      <li class="nav-item dropdown">
                          <a href="#" class="nav-link">Games<i class="icon-arrow-down"></i></a>
                          <ul class="dropdown-menu">
                              <li class="nav-item"><a href="tilt-rocket" class="nav-link">Tilt Rocket</a></li>
                              <li class="nav-item"><a href="free-sweetcorn" class="nav-link">Free Sweetcorn</a></li>
                              <li class="nav-item"><a href="balltopia" class="nav-link">Balltopia</a></li>
                          </ul>
                      </li>
                      <li class="nav-item dropdown">
                          <a href="#" class="nav-link">Packages<i class="icon-arrow-down"></i></a>
                          <ul class="dropdown-menu">
                              <li class="nav-item"><a href="better-logger" class="nav-link">Better Logger</a></li>
                              <li class="nav-item"><a href="visual-debugging-utilities" class="nav-link">Visual Debugging Utilities</a></li>
                              <li class="nav-item"><a href="modular-settings-ui" class="nav-link">Modular Settings UI</a></li>
                              <li class="nav-item"><a href="level-management-kit" class="nav-link">Level Management Kit</a></li>
                              <li class="nav-item"><a href="low-poly-weapons" class="nav-link">Low Poly Medieval Weapon Pack</a></li>
                          </ul>
                      </li>
                      <li class="nav-item">
                          <a href="about" class="nav-link">About</a>
                      </li>
                  </ul>

                  <!-- Navbar Toggle -->
                  <ul class="navbar-nav toggle">
                      <li class="nav-item">
                          <a href="#" class="nav-link" data-toggle="modal" data-target="#menu">
                              <i class="icon-menu m-0"></i>
                          </a>
                      </li>
                  </ul>

                  <!-- Navbar Action -->

              </div>
          </nav>

      </header>
      `;
    }
}

customElements.define("header-component", Header);
