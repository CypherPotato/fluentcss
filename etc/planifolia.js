var __isNavigating = false;
var componentCache = [];
window.$insecureEval = eval;

window.Planifolia = {
    routerFetchPage: () => {
        var path = window.location.hash.replace("#/", "");

        window.path = "/" + path.replace(/^\//, "");
        window.pathAndQuery = window.path;

        if (path == "") {
            path = "index";
            window.location.href = "#/"
        }

        if (path.includes('?')) {
            let querystring = path.substring(path.indexOf('?'));
            window.query = window.Planifolia.parseQuery(querystring);
            path = path.substring(0, path.indexOf('?'));
            window.path = window.path.substring(0, window.path.indexOf('?'));
            if (path == "") {
                path = "index";
            }
        } else {
            window.query = {};
        }

        var basePath = (window.PlanifoliaSettings.basePath ?? "/view/");
        var routerFile = window.location.origin + basePath + path + ".html";
        window.locationFile = routerFile;

        if (window.PlanifoliaSettings.onNavigating !== undefined) {
            window.PlanifoliaSettings.onNavigating();
        }

        __isNavigating = true;
        let delay = window.PlanifoliaSettings.delayNavigation ?? 0;
        setTimeout(() => {
            fetch(routerFile)
                .then(res => res.text())
                .then(text => {
                    window.PlanifoliaSettings.container.innerHTML = text;
                    window.Planifolia.fetchComponents(window.PlanifoliaSettings.container);
                });
        }, delay);
    },
    fetchComponents: () => {
        var exts = window.PlanifoliaSettings.container.querySelectorAll("include");
        if (exts.length == 0) {
            if (__isNavigating && window.PlanifoliaSettings.onNavigated !== undefined) {
                window.PlanifoliaSettings.onNavigated();
            }
            __isNavigating = false;
            return;
        }
        exts.forEach(async e => {
            let name = e.getAttribute("name");
            let componentUrl = window.location.origin + (window.PlanifoliaSettings.basePath ?? "/view/") + name + ".html";
            let text = "";
            if (componentCache[componentUrl] == undefined) {
                text = await fetch(componentUrl)
                    .then(res => {
                        if (res.ok) {
                            return res.text();
                        } else {
                            throw new Error(`Cannot fetch include ${name}.`);
                        }
                    });
                componentCache[componentUrl] = text;
            } else {
                text = componentCache[componentUrl];
            }
            for (const attr of e.attributes) {
                let attrName = attr.name;
                let attrValue = attr.value;
                if (!attrName.startsWith('@')) {
                    continue;
                } else {
                    attrName = attrName.substr(1);
                }
                const attrRgx = new RegExp('(?<!@)@' + attrName + '\\b', 'gi');
                text = text.replace(attrRgx, attrValue);
            }
            if (e.parentNode != null) {
                e.outerHTML = text;
            }
            window.Planifolia.fetchElements();
            window.Planifolia.fetchComponents();
        });
    },
    fetchElements: () => {
        window.PlanifoliaSettings.container.querySelectorAll("script").forEach(s => {
            s.remove();
            try {
                window.$insecureEval(s.innerText);
            } catch (e) {
                throw e;
            }
        });
        if (window.PlanifoliaSettings.autoRewriteLinks ?? true) {
            window.PlanifoliaSettings.container.querySelectorAll("a").forEach(e => {
                let href = e.getAttribute("href");
                if (href != null && href.startsWith("/") && !href.startsWith("/#/")) {
                    e.setAttribute("href", "/#" + href);
                }
            });
        }
    },
    parseQuery: (queryString) => {
        var query = {};
        var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    },
    initializeAutoRouter: () => {
        window.addEventListener('hashchange', function () {
            window.Planifolia.routerFetchPage();
        });

        window.Planifolia.routerFetchPage();
    }
};

