# FluentCSS

This repository is a set of components inspired by Microsoft Fluent Design in Windows 11, available for the web development. A link below has an interactive gallery
on how to use this library.

It was written in plain CSS and vanilla Javascript. No SCSS, pre-compilers, Node, etc., was used in this project.

You can visit the interactive gallery [here]().

## Building

You must have PHP installed in your machine to build FluentCSS or you can simply clone that repository and grab the components you want to use inside the `/src` folder.
Just make sure to include `main.css` on it too.

To build it using PHP, you can:

```
> php .\build.php
```

And the distribution JS and CSS will be copied to `/dist` directory.

You can remove the `.win-` prefixes, or change it, by changing this line on `comp.php`:

```php
<?php

define(
    'REPLACEMENTS',
    [
        'win-' => 'replacement-'
    ]
);
```

## Credits

None of the designs here were made by me. I just made the CSS classes and the Javascript to perfectly
emulate Microsoft's design.

- [Fluenticons](https://fluenticons.co/)
- [Microsoft Fluent Design](https://fluent2.microsoft.design/components/windows)
- Mac OS X wallpapers on `/etc`

## License

You can copy, clone, distribute, modify, sell or edit this repository as you want, however, it's mandatory to give credit to the repository, and a link to it.