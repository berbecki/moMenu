var myMenuData = [
    {mUrl: "#home", mTxt: "home", mTitle: "title", mSub: []},
    {mUrl: "#offer", mTxt: "offer", mTitle: "title", mSub: [
        {mUrl: "#", mTxt: "sub-link", mTitle: "title", mSub: []},
        {mUrl: "#", mTxt: "sub-link", mTitle: "title", mSub: []}
    ]},
    {mUrl: "#about", mTxt: "about", mTitle: "title", mSub: []},
    {mUrl: "#mission", mTxt: "mission", mTitle: "title", mSub: [
        {mUrl: "#", mTxt: "sub-link", mTitle: "title", mSub: []}
    ]},
    {mUrl: "#contact", mTxt: "contact", mTitle: "title", mSub: []}
];

var MenuEngine = new Class({
    Implements: [Events, Options],
    options: {
        mNavId: '',
        mNavData: null,
        mNavClass: 'menu-generated'
    },
    initialize: function (options) {
        'use strict';
        this.setOptions(options);
        this.menuStart();
    },
    menuStart: function () {
        'use strict';
        var mNavId = $(this.options.mNavId),
            mNavData = this.options.mNavData,
            mBox = new Element('ul.' + this.options.mNavClass + '.clearfix').inject(mNavId, "top"),
            menuLevel,
            mSubBox,
            menuSubLevel,
            timeO;
        
        if (typeOf(mNavData) === "array") {
            mNavData.each(function (elem, index) {
                menuLevel = new Element('li.level-0#menu-' + (index + 1), {'html': '<a title="' + elem.mTitle + '" href="' + elem.mUrl + '">' + elem.mTxt + '</a>', 'events': {
                    mouseover: function (event) {
                        event.stopPropagation;
                        event.preventDefault;
                        this.addClass('hovered');
                        if (this.hasClass('is-parent')) {
                            this.addClass('open');
                        }
                        this.getChildren('.sub-menu').setStyle('display', 'block').morph({'opacity': 1, duration: 'short', transition: 'bounce:out'});
                    },
                    mouseleave: function (event) {
                        event.stopPropagation;
                        event.preventDefault;
                        this.removeClass('hovered');
                        this.removeClass('open');
                        //this.getChildren('.sub-menu').morph({'opacity': 0});
                        this.getChildren('.sub-menu').setStyles({'opacity': 0, 'display': 'none' });
//                        timeO = setTimeout(function() {
//                            event.target.getChildren('.sub-menu').setStyle('display', 'none');
//                        }, 800);

                    }
                }}).inject(mBox);
                if (index === 0) {
                    menuLevel.addClass('first');
                } else if (index === (mNavData.length - 1)) {
                    menuLevel.addClass('last');
                }
                if (elem.mSub.length > 0) {
                    menuLevel.addClass('is-parent');
                    mSubBox = new Element('ul.sub-menu');
                    elem.mSub.each(function (subelem, subindex) {
                        menuSubLevel = new Element('li.level-1#sub-menu-' + (subindex + 1), {'html': '<a title="' + subelem.mTitle + '" href="' + subelem.mUrl + '">' + subelem.mTxt + '</a>'}).inject(mSubBox);
                    });
                    mSubBox.setStyle('display', 'none');
                    mSubBox.inject(menuLevel);
                }
            });
        } else {
        
        }
    }
});
// TODO: better animations