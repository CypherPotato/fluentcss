<?php

define(
    'REPLACEMENTS',
    [
        //'win-' => ''
    ]
);

define(
    'VER',
    '0.1'
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

function compile($to_dir, $deleteAssets = false, $is_dist = false)
{
    if ($deleteAssets) {
        foreach (glob($to_dir . "/*.{css,js}", GLOB_BRACE) as $file) {
            unlink($file);
        }
    }

    if (!is_dir($to_dir)) {
        mkdir($to_dir, 0777, true);
    }

    $v = uniqid();
    $files = glob(__DIR__ . '/src/styles/{*,*/*,*/*/*,*/*/*/*}.css', GLOB_BRACE);

    if ($is_dist) {
        $dist = $to_dir . '/fluent-css.css';
    } else {
        $dist = $to_dir . '/fluent-css.' . $v . '.css';
    }

    $output = '/*Copyright 2023 CypherPotato FluentCSS - MIT licensed*/';

    foreach ($files as $file) {
        $content = file_get_contents($file);
        $content = applyConditions($content);
        $content = minifyClike($content);
        $output .= $content;
    }

    file_put_contents($dist, $output);

    $files = glob(__DIR__ . '/src/script/{*,*/*,*/*/*,*/*/*/*}.js', GLOB_BRACE);
    
    if ($is_dist) {
        $dist = $to_dir . '/fluent-css.js';
    } else {
        $dist = $to_dir . '/fluent-css.' . $v . '.js';
    }

    $output = '/*Copyright 2023 CypherPotato FluentCSS - MIT licensed*/';

    foreach ($files as $file) {
        $content = file_get_contents($file);
        $content = applyConditions($content);
        $output .= $content;
    }

    file_put_contents($dist, $output);
}
