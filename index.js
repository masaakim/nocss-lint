var postcss = require('postcss')
var inspect = require('obj-inspector')

module.exports = function plugin (options) {
    options = options = {}

    return function (root) {
        inspect(root)
        var tmpSelectors = ['']

        root.eachDecl(function (decl) {
            if (decl.important)  throw new Error('NoCSS: using `!important`')
        })

        root.eachRule(function (rule) {
            rule.selectors.forEach(function (selector) {
                if (checkSelector(selector)) {
                    tmpSelectors.forEach(function (tmp) {
                        if (tmp === selector) throw new Error('NoCSS: cannot overwrite any rule sets')
                        else tmpSelectors.push(selector)
                    })
                }
                else {
                    throw new Error('NoCSS: can use only class selectors and cannot nest selectors')
                }
            })
        })

        return root
    }
}

function checkSelector (selector) {
    if (!selector.match(/^(\.(\w|\-|:)+)$/)) return false
    return true
}
