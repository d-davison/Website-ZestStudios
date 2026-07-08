/* =====================================================================
   <media-gallery>: Unity Asset Store–style media gallery.
   =====================================================================

   A big "stage" shows the selected image or a YouTube embed. A row of
   thumbnails sits underneath: the selected one is full colour, the rest
   are greyed out. A small "1/5" capsule shows the current position.

   REUSE ON ANY PAGE:
     1. Load this script once in <head>:
          <script src="assets/components/media-gallery.js" defer></script>
     2. Drop the element wherever you want it, with a JSON list of items:

          <media-gallery>
            <script type="application/json">
            [
              { "type": "image",   "src": "assets/images/foo/shot-1.svg", "alt": "Console" },
              { "type": "youtube", "id": "YOUR_YOUTUBE_ID", "thumb": "assets/images/foo/video.svg", "alt": "Tutorial" }
            ]
            </script>
          </media-gallery>

   Item types:
     image   -> { "src": "...", "alt": "..." }
     youtube -> { "id": "<11-char video id>", "thumb": "<thumbnail img>", "alt": "..." }
                Until a real id is set, the stage shows a friendly placeholder.
   ===================================================================== */
(function () {
  // ---- Inject styles once ----------------------------------------------
  if (!document.getElementById("mg-styles")) {
    var style = document.createElement("style");
    style.id = "mg-styles";
    style.textContent = [
      ".mg{--mg-accent:#dd1e4b;--mg-radius:12px;width:100%;}",
      ".mg:focus{outline:none;}",
      ".mg-stage{position:relative;width:100%;aspect-ratio:16/10;background:#0e1014;border-radius:var(--mg-radius);overflow:hidden;display:flex;align-items:center;justify-content:center;}",
      ".mg-media{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}",
      ".mg-media img{width:100%;height:100%;object-fit:contain;display:block;}",
      ".mg-media iframe{width:100%;height:100%;border:0;display:block;}",
      ".mg-videohint{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;color:#fff;padding:24px;background:radial-gradient(circle at 50% 42%,#202632,#0e1014);}",
      ".mg-videohint .mg-play{width:88px;height:88px;border-radius:50%;background:#ff0000;display:flex;align-items:center;justify-content:center;}",
      ".mg-videohint .mg-play::after{content:'';border-style:solid;border-width:17px 0 17px 28px;border-color:transparent transparent transparent #fff;margin-left:6px;}",
      ".mg-videohint p{margin:0;font-size:1.05rem;font-weight:600;}",
      ".mg-videohint small{opacity:.6;font-size:.82rem;max-width:26rem;}",
      ".mg-counter{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.62);color:#fff;font-size:.8rem;line-height:1;padding:.4rem .75rem;border-radius:999px;letter-spacing:.05em;pointer-events:none;}",
      ".mg-toolbar{position:absolute;top:12px;right:12px;display:flex;gap:8px;z-index:2;}",
      ".mg-btn{width:38px;height:38px;border:0;border-radius:50%;background:rgba(0,0,0,.5);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;transition:background .2s;}",
      ".mg-btn:hover{background:rgba(0,0,0,.78);}",
      ".mg-btn i{margin:0;}",
      ".mg-toast{position:absolute;top:58px;right:12px;background:rgba(0,0,0,.82);color:#fff;font-size:.75rem;padding:.4rem .65rem;border-radius:6px;opacity:0;transform:translateY(-4px);transition:.2s;pointer-events:none;z-index:2;}",
      ".mg-toast.show{opacity:1;transform:none;}",
      ".mg-thumbs{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;}",
      ".mg-thumb{position:relative;width:104px;height:65px;padding:0;border:0;border-radius:8px;overflow:hidden;cursor:pointer;background:#0e1014;opacity:.5;filter:grayscale(65%);transition:opacity .2s,filter .2s,box-shadow .2s;}",
      ".mg-thumb img{width:100%;height:100%;object-fit:cover;display:block;}",
      ".mg-thumb:hover{opacity:.85;filter:grayscale(15%);}",
      ".mg-thumb.is-active{opacity:1;filter:none;box-shadow:0 0 0 3px var(--mg-accent);}",
      ".mg-thumb--video::before{content:'';position:absolute;top:50%;left:50%;width:34px;height:34px;transform:translate(-50%,-50%);background:rgba(255,0,0,.9);border-radius:50%;}",
      ".mg-thumb--video::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-38%,-50%);border-style:solid;border-width:9px 0 9px 15px;border-color:transparent transparent transparent #fff;}",
      "@media (max-width:575px){.mg-thumb{width:76px;height:48px;}}"
    ].join("");
    document.head.appendChild(style);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>\"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function isVideo(it) { return it && (it.type === "youtube" || it.type === "video"); }

  function validYouTubeId(id) {
    id = (id || "").trim();
    if (!/^[\w-]{6,}$/.test(id)) return false;
    if (/^(your|replace|video|todo)/i.test(id)) return false; // placeholder guards
    return true;
  }

  class MediaGallery extends HTMLElement {
    connectedCallback() {
      var items = [];
      var dataEl = this.querySelector('script[type="application/json"]');
      if (dataEl) {
        try { items = JSON.parse(dataEl.textContent); }
        catch (e) { console.error("media-gallery: invalid JSON config", e); }
      }
      this._items = Array.isArray(items) ? items : [];
      this._index = 0;
      this.render();
    }

    render() {
      var items = this._items;
      if (!items.length) { this.innerHTML = ""; return; }
      var multi = items.length > 1;

      this.innerHTML =
        '<div class="mg" tabindex="0">' +
          '<div class="mg-stage">' +
            '<div class="mg-media"></div>' +
            '<div class="mg-toolbar">' +
              '<button class="mg-btn mg-share" type="button" title="Share" aria-label="Share"><i class="icon-share-alt"></i></button>' +
              '<button class="mg-btn mg-full" type="button" title="Fullscreen" aria-label="Fullscreen"><i class="icon-size-fullscreen"></i></button>' +
            '</div>' +
            '<div class="mg-toast">Link copied</div>' +
            (multi ? '<div class="mg-counter"></div>' : '') +
          '</div>' +
          (multi ? '<div class="mg-thumbs">' +
            items.map(function (it, i) {
              var vid = isVideo(it);
              var src = vid ? it.thumb : it.src;
              var alt = it.alt || (vid ? "Video" : "Image " + (i + 1));
              return '<button class="mg-thumb' + (vid ? " mg-thumb--video" : "") + '" data-i="' + i + '" type="button" aria-label="' + esc(alt) + '">' +
                (src ? '<img src="' + esc(src) + '" alt="' + esc(alt) + '">' : "") +
                '</button>';
            }).join("") +
          '</div>' : '') +
        '</div>';

      this._root = this.querySelector(".mg");
      this._stage = this.querySelector(".mg-stage");
      this._media = this.querySelector(".mg-media");
      this._counter = this.querySelector(".mg-counter");
      this._toast = this.querySelector(".mg-toast");

      var self = this;
      this.querySelectorAll(".mg-thumb").forEach(function (btn) {
        btn.addEventListener("click", function () { self.select(parseInt(btn.dataset.i, 10)); });
      });
      this.querySelector(".mg-full").addEventListener("click", function () { self.toggleFullscreen(); });
      this.querySelector(".mg-share").addEventListener("click", function () { self.share(); });
      this._root.addEventListener("keydown", function (e) {
        var n = self._items.length;
        if (e.key === "ArrowRight") { self.select((self._index + 1) % n); e.preventDefault(); }
        else if (e.key === "ArrowLeft") { self.select((self._index - 1 + n) % n); e.preventDefault(); }
      });

      this.select(0);
    }

    select(i) {
      var items = this._items, n = items.length;
      if (!n) return;
      this._index = i;
      var it = items[i];

      this.querySelectorAll(".mg-thumb").forEach(function (b, bi) {
        b.classList.toggle("is-active", bi === i);
      });
      if (this._counter) this._counter.textContent = (i + 1) + "/" + n;

      var stage = this._stage;
      if (isVideo(it)) {
        if (validYouTubeId(it.id)) {
          if (stage) stage.style.aspectRatio = "16 / 9";
          this._media.innerHTML =
            '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(it.id.trim()) +
            '?rel=0&autoplay=1" title="' + esc(it.alt || "Tutorial video") +
            '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
        } else {
          if (stage) stage.style.aspectRatio = "16 / 10";
          this._media.innerHTML =
            '<div class="mg-videohint"><div class="mg-play"></div>' +
            '<p>Tutorial video coming soon</p>' +
            '<small>Set this item\'s <code>id</code> to your YouTube video ID in the gallery data to embed it here.</small></div>';
        }
      } else {
        this._media.innerHTML = '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || "") + '">';
        // Fit the stage to the image's own aspect ratio so it expands to fill with no letterbox bars.
        var img = this._media.querySelector("img");
        if (img && stage) {
          var fit = function () {
            if (img.naturalWidth && img.naturalHeight) {
              stage.style.aspectRatio = img.naturalWidth + " / " + img.naturalHeight;
            }
          };
          if (img.complete) fit(); else img.addEventListener("load", fit);
        }
      }
    }

    toggleFullscreen() {
      var el = this.querySelector(".mg-stage");
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
      } else {
        (el.requestFullscreen || el.webkitRequestFullscreen || function () {}).call(el);
      }
    }

    share() {
      var url = location.href, self = this;
      if (navigator.share) {
        navigator.share({ title: document.title, url: url }).catch(function () {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { self._showToast(); }).catch(function () {});
      } else {
        this._showToast();
      }
    }

    _showToast() {
      var t = this._toast;
      t.classList.add("show");
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1500);
    }
  }

  customElements.define("media-gallery", MediaGallery);
})();
