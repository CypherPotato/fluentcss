<?php

$use_version = 'v0.1.2';
$app = parse_ini_file("settings.ini");
define('APP', $app);

if (APP['DEV']) {
    require 'comp.php';
    compile(__DIR__ . '/build', true, false);

    $css_dist = glob(__DIR__ . "/build/*.css")[0];
    $js_dist = glob(__DIR__ . "/build/*.js")[0];

    $css_dist = substr($css_dist, strlen(__DIR__));
    $js_dist = substr($js_dist, strlen(__DIR__));
} else {
    $css_dist = '/dist/' . $use_version . '/fluent-css.css';
    $js_dist = '/dist/' . $use_version . '/fluent-css.js';
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">

    <script>
        window.win = {};
    </script>

    <link rel="stylesheet" href="<?= $css_dist ?>">
    <link rel="stylesheet" href="/etc/prism.css?v=<?= $use_version ?>">
    <script src="/etc/planifolia.js?v=<?= $use_version ?>"></script>
    <script src="<?= $js_dist ?>"></script>
    <script src="/etc/prism.js"></script>
</head>

<body>
    <div class="win-nav-dashboard" style="height: 100%;">
        <include name="__nav"></include>
        <main class="immersive-box">
        </main>
    </div>
</body>

<footer>
    <script type="text/javascript">
        const container = document.querySelector("body");
        const dashContainer = document.querySelector("main");
        window.PlanifoliaSettings = {
            basePath: "/explorer/",
            onNavigating: () => {
                dashContainer.scrollTop = 0;
            },
            onNavigated: () => {
                Prism.highlightAll();
                document.querySelectorAll("nav > .nav-link").forEach(e => {
                    let href = e.getAttribute("href") ?? "";
                    if (href.endsWith(window.path)) {
                        e.setAttribute("data-current", true);
                    }
                });
            }
        };
        window.Planifolia.fetchComponents(container);
        window.Planifolia.contentTo(dashContainer, '/index');
        window.Prism = window.Prism || {};
        window.Prism.manual = true;
    </script>
</footer>

</html>