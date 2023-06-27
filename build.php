<?php

include 'comp.php';

define('VERSION', 'v0.1.2');

compile(__DIR__ . '/build', true, false);
compile(__DIR__ . '/dist/' . VERSION . '/', false, true);
compile(__DIR__ . '/dist/latest/', false, true);
echo "Compiled.";
