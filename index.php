<?php

$use_version = 'v0.1.3';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">

    <link rel="stylesheet" href="/dist/<?= $use_version ?>/fluentcss.css">
    <link rel="stylesheet" href="/etc/prism.css?v=<?= $use_version ?>">
    <script src="/etc/planifolia.js?v=<?= $use_version ?>"></script>
    <script src="/dist/<?= $use_version ?>/fluentcss.js"></script>
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
                document.querySelectorAll("body > .win-nav-dashboard > nav > .nav-link").forEach(e => {
                    let href = e.getAttribute("onclick") ?? "";
                    if (href.includes(window.contentPath)) {
                        e.setAttribute("data-current", true);
                    } else {
                        e.removeAttribute("data-current");
                    }
                });
            },
            onFetch: (link) => {
                window.contentPath = link;
            }
        };
        window.Planifolia.fetchComponents(container);
        window.Planifolia.contentTo(dashContainer, '/index');
        window.Prism = window.Prism || {};
        window.Prism.manual = true;
    </script>
</footer>

</html>