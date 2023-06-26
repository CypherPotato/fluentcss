<?php

define(
    'REPLACEMENTS',
    [
        //'win-' => ''
    ]
);

function applyConditions($content)
{
    foreach (REPLACEMENTS as $repKey => $repVal) {
        $content = str_replace($repKey, $repVal, $content);
    }
    return $content;
}

function minifyClike($css)
{
    $css = preg_replace('/\/\*[^*]+\*\//', '', $css);
    $css = preg_replace('/([;\{\},])\s+/', '$1', $css);
    return $css;
}

function compile($deleteAssets = false)
{
    if ($deleteAssets) {
        foreach (glob(__DIR__ . "/dist/*.{css,js}", GLOB_BRACE) as $file) {
            unlink($file);
        }
    }

    if (!is_dir(__DIR__ . '/dist')) {
        mkdir(__DIR__ . '/dist');
    }

    $v = uniqid();
    $files = glob(__DIR__ . '/src/styles/{*,*/*,*/*/*,*/*/*/*}.css', GLOB_BRACE);
    $dist = __DIR__ . '/dist/win3-ui.' . $v . '.css';
    $output = '/*Copyright 2023 CypherPotato FluentCSS - MIT licensed*/';

    foreach ($files as $file) {
        $content = file_get_contents($file);
        $content = applyConditions($content);
        $content = minifyClike($content);
        $output .= $content;
    }

    file_put_contents($dist, $output);

    $files = glob(__DIR__ . '/src/script/{*,*/*,*/*/*,*/*/*/*}.js', GLOB_BRACE);
    $dist = __DIR__ . '/dist/win3-ui.' . $v . '.js';
    $output = '/*Copyright 2023 CypherPotato FluentCSS - MIT licensed*/';

    foreach ($files as $file) {
        $content = file_get_contents($file);
        $content = applyConditions($content);
        $output .= $content;
    }

    file_put_contents($dist, $output);
}
