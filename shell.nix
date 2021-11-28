with import <nixpkgs> {};

mkShell {
  name = "brocolli-and-co";

  nativeBuildInputs = [
    adoptopenjdk-hotspot-bin-8
    firefox
    nodejs
  ] ++ (with pkgs.nodePackages; [
    pnpm
    prettier
    typescript-language-server
    vscode-css-languageserver-bin
    vscode-html-languageserver-bin
  ]);

  JAVA_TOOL_OPTIONS="-Dwebdriver.chrome.driver=${chromedriver}/bin/chromedriver -Dwebdriver.firefox.driver=${geckodriver}/bin/geckodriver -Dgwen.web.chrome.path=${google-chrome}/bin/google-chrome-stable";
}
