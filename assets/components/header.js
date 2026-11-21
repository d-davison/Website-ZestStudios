/* <header-component>: site nav. Styles live in assets/css/zest.css. */
class Header extends HTMLElement {
    connectedCallback() {
        var links = [
            ["free-sweetcorn", "Games"],
            ["/#packages", "Packages"],
            ["about", "About"]
        ];
        var here = location.pathname.replace(/^\/|\.html$/g, "");
        var item = function (l) {
            return '<li><a href="' + l[0] + '"' + (l[0] === here ? ' aria-current="page"' : "") + ">" + l[1] + "</a></li>";
        };
        var store = '<a class="btn btn-g" href="https://assetstore.unity.com/publishers/51920" target="_blank" rel="noopener noreferrer">Asset Store ↗</a>';

        this.innerHTML = `
      <nav class="nav" aria-label="Main">
          <div class="wrap">
              <a class="brand" href="/">ZEST <span class="grad">STUDIOS</span></a>
              <ul class="nav-links">${links.map(item).join("")}<li>${store}</li></ul>
              <details class="nav-menu">
                  <summary>Menu</summary>
                  <ul>
                      ${links.map(item).join("")}
                      <li><a href="better-logger">Better Logger</a></li>
                      <li><a href="level-management-kit">Level Management Kit</a></li>
                      <li><a href="low-poly-weapons">Low Poly Weapon Pack</a></li>
                      <li><a href="https://assetstore.unity.com/publishers/51920" target="_blank" rel="noopener noreferrer">Asset Store ↗</a></li>
                  </ul>
              </details>
          </div>
      </nav>`;
    }
}

customElements.define("header-component", Header);
