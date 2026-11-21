"""Rebuild the <head> of every page from one table, so SEO tags stay consistent.

Add new pages to PAGES below, then run from the repo root:
    py tools/update-heads.py
Everything between <head> and </head> is regenerated; the page body is untouched.
"""
import hashlib
import json
import re
from html import escape
from pathlib import Path

SITE = "https://zeststudios.net"
ROOT = Path(__file__).resolve().parent.parent

# slug: (title, description, og image in assets/images/og/, noindex)
PAGES = {
    "index": ("Zest Studios | Indie Games and Unity Tools",
              "Indie studio making games and Unity editor tools. Our next game, Free Sweetcorn, is coming in 2027. Find our packages on the Unity Asset Store.",
              "home"),
    "free-sweetcorn": ("Free Sweetcorn, Coming 2027 | Zest Studios",
                       "Free Sweetcorn is a platformer RPG from Zest Studios, coming in 2027. Join the Discord to hear about it first.",
                       "free-sweetcorn"),
    "about": ("About | Zest Studios",
              "Zest Studios is a small indie studio making games and Unity tools since 2017. Our next game, Free Sweetcorn, is coming in 2027.",
              "about"),
    "better-logger": ("Better Logger for Unity | Zest Studios",
                      "Type-safe, channel-based logging for Unity. Organise logs into colour-coded channels, toggle them on and off, and convert Debug.Log calls in one click.",
                      "better-logger"),
    "better-logger-docs": ("Better Logger Documentation | Zest Studios",
                           "Better Logger user manual: installation, creating channels, sending logs from code, converting Debug.Log calls, updating and troubleshooting.",
                           "better-logger"),
    "level-management-kit": ("Level Management Kit for Unity | Zest Studios",
                             "Automatic level select, loading and saving for Unity mobile games. Set your levels and sections, and the UI is generated for you. Just add gameplay.",
                             "level-management-kit"),
    "low-poly-weapons": ("Low Poly Medieval Weapon Pack for Unity | Zest Studios",
                         "15 low poly 3D medieval weapons for Unity: swords, knives, axes and hammers, with handle-set origins so they drop straight into your game.",
                         "low-poly-weapons"),
    "404": ("Page not found | Zest Studios", "This page doesn't exist.", "home", True),
}

ORG = {
    "@context": "https://schema.org",
    "@graph": [
        {"@type": "Organization", "@id": f"{SITE}/#org", "name": "Zest Studios", "url": f"{SITE}/",
         "logo": f"{SITE}/assets/images/favicon.png", "email": "studioszest@gmail.com",
         "sameAs": ["https://twitter.com/studioszest", "https://www.instagram.com/studioszest/",
                    "https://www.facebook.com/studioszest", "https://assetstore.unity.com/publishers/51920"]},
        {"@type": "WebSite", "name": "Zest Studios", "url": f"{SITE}/", "publisher": {"@id": f"{SITE}/#org"}},
    ],
}


def v(path):
    """path?v=<content hash>, so browsers fetch the new file whenever it changes."""
    digest = hashlib.sha1((ROOT / path).read_bytes()).hexdigest()[:8]
    return f"{path}?v={digest}"


def head(slug, body):
    title, desc, og, *rest = PAGES[slug]
    noindex = bool(rest and rest[0])
    url = f"{SITE}/" if slug == "index" else f"{SITE}/{slug}"
    t, d = escape(title), escape(desc)
    lines = [
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        # 404.html is served at any missing URL, so pin relative links to the site root
        '<base href="/">' if slug == "404" else None,
        f"<title>{t}</title>",
        f'<meta name="description" content="{d}">',
        '<meta name="author" content="Zest Studios">',
        '<meta name="theme-color" content="#0b0b0d">',
        '<meta name="robots" content="noindex">' if noindex else f'<link rel="canonical" href="{url}">',
        "",
        "<!-- Social previews -->",
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="Zest Studios">',
        f'<meta property="og:title" content="{t}">',
        f'<meta property="og:description" content="{d}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:image" content="{SITE}/assets/images/og/{og}.jpg">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:site" content="@studioszest">',
        "",
        '<link rel="icon" href="assets/images/favicon-32.png" sizes="32x32" type="image/png">',
        '<link rel="icon" href="assets/images/favicon.png" sizes="256x256" type="image/png">',
        '<link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">',
        "",
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap">',
        f'<link rel="stylesheet" href="{v("assets/css/zest.css")}">',
        f'<script src="{v("assets/components/header.js")}" defer></script>',
        f'<script src="{v("assets/components/footer.js")}" defer></script>',
        f'<script src="{v("assets/components/media-gallery.js")}" defer></script>' if "<media-gallery" in body else None,
    ]
    if slug == "index":
        lines += ["", '<script type="application/ld+json">', *json.dumps(ORG, indent=2).splitlines(), "</script>"]
    return "\n".join("    " + l if l else "" for l in lines if l is not None)


def main():
    for f in sorted(ROOT.glob("*.html")):
        slug = f.stem
        if slug not in PAGES:
            print("skip (not in PAGES):", f.name)
            continue
        src = f.read_text(encoding="utf-8")
        body = src[src.index("</head>"):]
        out = re.sub(r"<head>.*?</head>", lambda m: f"<head>\n{head(slug, body)}\n</head>", src, count=1, flags=re.S)
        f.write_text(out, encoding="utf-8", newline="\n")
        print("updated", f.name)
    missing = set(PAGES) - {f.stem for f in ROOT.glob("*.html")}
    if missing:
        print("in PAGES but no file:", ", ".join(sorted(missing)))


if __name__ == "__main__":
    main()
