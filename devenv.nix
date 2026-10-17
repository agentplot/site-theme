{ pkgs, ... }:

{
  # Every tool the package and its demo run is declared here, never assumed
  # on the machine.
  packages = [
    pkgs.bun
    # The demo's screenshots: Playwright and the one browser it drives, from
    # Nix, the version package.json pins.
    pkgs.playwright-test
  ];

  env.PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers-chromium}";

  scripts = {
    # The demo at http://localhost:4321/site-theme/.
    demo.exec = ''
      bun run demo
    '';
    # Build the demo, serve it and write the screenshots to $1 (default
    # demo/shots): each width, each theme, and frames of the loop.
    shots.exec = ''
      bun run demo:build && bun run shots "''${1:-demo/shots}"
    '';
  };

  enterShell = ''
    [ -d node_modules ] || bun install --frozen-lockfile 2>/dev/null || bun install
  '';
}
