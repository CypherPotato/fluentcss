<?php

$app = parse_ini_file("settings.ini");
define('APP', $app);

if (APP['DEV']) {
    require 'comp.php';
    compile(true);
}

$css_dist = glob(__DIR__ . "/dist/*.css")[0];
$js_dist = glob(__DIR__ . "/dist/*.js")[0];

$css_dist = substr($css_dist, strlen(__DIR__));
$js_dist = substr($js_dist, strlen(__DIR__));
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
    <link rel="stylesheet" href="/etc/prism.css">
    <script src="/etc/planifolia.js"></script>
    <script src="<?= $js_dist ?>"></script>
    <script src="/etc/prism.js"></script>
</head>

<body id="app">
</body>

<footer>
    <script type="text/javascript">
        window.PlanifoliaSettings = {
            basePath: "/explorer/",
            container: document.querySelector("#app"),
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
        window.Planifolia.initializeAutoRouter();
        window.Prism = window.Prism || {};
        window.Prism.manual = true;
    </script>
</footer>

</html>