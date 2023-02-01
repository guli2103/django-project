/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

// Preloader js
$(window).on("load", function () {
  "use strict";
  $(".preloader").fadeOut(100);
});

(function ($) {
  "use strict";

  $(window).on("scroll", function () {
    var scrolling = $(this).scrollTop();
    if (scrolling > 10) {
      $(".navigation").addClass("nav-bg");
    } else {
      $(".navigation").removeClass("nav-bg");
    }
  });

  // navbar
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
  if ($(window).width() < 1024) {
    $(".navigation .has-dropdown").on("click", function (e) {
      $(this).children(".navbar-dropdown").toggle();
    });
  }

  // JSModal
  $('[data-toggle="modal"]').on("click", function (e) {
    e.preventDefault();
    $(this.hash).toggleClass("is-active").fadeIn();
    $($(this).data("target")).toggleClass("is-active").fadeIn();
    var vScrollWidth = window.innerWidth - $(document).width();
    $("html").css({
      "padding-right": vScrollWidth + "px",
      "overflow-y": "hidden",
    });
  });
  $('[data-dismiss="modal"]').on("click", function (e) {
    e.preventDefault();
    $(".modal").removeClass("is-active");
    $("html").css({
      "padding-right": 0,
      "overflow-y": "auto",
    });
  });
  // videoPopupInit
  var $videoSrc;
  $(".video-btn").click(function () {
    $videoSrc = $(this).data("src");
    if ($(this.hash).hasClass("is-active")) {
      $("#showVideo").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    }
  });
  $('[data-dismiss="modal"]').on("click", function (e) {
    e.preventDefault();
    $("#showVideo").attr("src", "");
  });

  // tab
  $(".tab-content")
    .find(".tab-pane")
    .each(function (idx, item) {
      var navTabs = $(this).closest(".code-tabs").find(".nav-tabs"),
        title = $(this).attr("title");
      navTabs.append(
        '<li class="control"><a class="button" href="#">' + title + "</a></li>"
      );
    });

  $(".code-tabs ul.nav-tabs").each(function () {
    $(this).find("li:first").addClass("active");
  });

  $(".code-tabs .tab-content").each(function () {
    $(this).find("div:first").addClass("active").show();
  });

  $(".nav-tabs a").click(function (e) {
    e.preventDefault();
    var tab = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest(".code-tabs"),
      tabPane = tabPanel.find(".tab-pane").eq(tabIndex);
    tabPanel.find(".active").removeClass("active");
    tab.addClass("active");
    tabPane.addClass("active");
  });

  //post slider
  $(".post-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: true,
    prevArrow:
      "<button type='button' class='prevArrow'><i class='ti-angle-left'></i></button>",
    nextArrow:
      "<button type='button' class='nextArrow'><i class='ti-angle-right'></i></button>",
  });

  // copy to clipboard
  $(".copy").click(function () {
    $(this).siblings(".inputlink").select();
    document.execCommand("copy");
  });

  // instafeed
  if ($("#instafeed").length !== 0) {
    var accessToken = $("#instafeed").attr("data-accessToken");
    var userFeed = new Instafeed({
      get: "user",
      resolution: "low_resolution",
      accessToken: accessToken,
      template:
        '<div class="instagram-post"><a href="{{link}}" target="_blank"><img src="{{image}}"></a></div>',
    });
    userFeed.run();
  }

  setTimeout(function () {
    $(".instagram-slider").slick({
      dots: false,
      speed: 300,
      autoplay: true,
      arrows: false,
      slidesToShow: 8,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }, 1500);

  // JSAccordion/Collapse
  $.fn.collapsible = function () {
    var ns = {
      open: function (me, bypass) {
        // Open the target
        var conf = me[0].__collapsible;
        if (!conf) {
          return;
        }
        if (bypass !== true) {
          if (typeof conf.group === "string") {
            if (String(conf.allowMultiple).toLowerCase() !== "true") {
              window["collapsibleAnimations_" + conf.group] = 0;
              window["collapsibleGroup_" + conf.group] = $(
                '[data-group="' + conf.group + '"]'
              ).not(me);
              var group = window["collapsibleGroup_" + conf.group];
              group.each(function () {
                ns.close($(this));
              });
              ns.open(me, true);
              return;
            }
          }
        }
        me.trigger("before:open");
        me.attr("aria-expanded", true);
        conf.target.attr("aria-expanded", true);
        conf.expanded = true;
        me.trigger("open");
        if (conf.init !== true) {
          setTimeout(function () {
            conf.init = true;
            me.__collapsible = conf;
          }, conf.speed + 100);
        }
      },
      close: function (me) {
        // Close the target
        var conf = me[0].__collapsible;
        if (!conf) {
          return;
        }
        me.trigger("before:close");
        me.attr("aria-expanded", false);
        conf.target.attr("aria-expanded", false);
        conf.expanded = false;
        me.trigger("close");
        if (conf.init !== true) {
          setTimeout(function () {
            conf.init = true;
            me.__collapsible = conf;
          }, conf.speed + 100);
        }
      },
      toggle: function (me) {
        // Toggle the target open/close
        var conf = me[0].__collapsible;
        if (!conf) {
          return;
        }
        me.trigger("before:toggle");
        var active = String(me.attr("aria-expanded")).toLowerCase();
        active = active === "true" ? true : false;
        if (active === true) {
          ns.close(me);
        } else {
          ns.open(me);
        }
        me.trigger("toggle");
      },
      onClick: function (e) {
        // On click handler
        if (!e.target.__collapsible) {
          return;
        }
        if ($(e.target).is("a")) {
          e.preventDefault();
        }
        ns.toggle($(e.target));
      },
      onClose: function (e) {
        // On close handler
        if (!e.target.__collapsible) {
          return;
        }
        var me = e.target;
        var targ = me.__collapsible.target;
        targ.stop().slideUp(me.__collapsible.speed, function () {
          $(me).trigger("after:close");
          $(me).trigger("animation:complete", ["close"]);
          window["collapsibleAnimations_" + me.__collapsible.group] += 1;
          var count = window["collapsibleAnimations_" + me.__collapsible.group];
          var group = window["collapsibleGroup_" + me.__collapsible.group];
          if (!group) {
            return;
          }
          if (count >= group.length) {
            $('[data-group="' + me.__collapsible.group + '"]:focus').trigger(
              "animations:complete",
              ["close"]
            );
          }
        });
      },
      onOpen: function (e) {
        // On open handler
        if (!e.target.__collapsible) {
          return;
        }
        var me = e.target;
        var targ = me.__collapsible.target;
        targ.stop().slideDown(me.__collapsible.speed, function () {
          $(me).trigger("after:open");
          $(me).trigger("animation:complete", ["open"]);

          if (me.__collapsible.init === true) {
            if (
              String(me.__collapsible.allowMultiple).toLowerCase() === "true"
            ) {
              $(me).trigger("animations:complete", ["open"]);
            }
          }
        });
      },
    };

    if (typeof arguments[0] === "string") {
      // Public Methods
      switch (String(arguments[0]).toLowerCase()) {
        case "open":
        case "show":
          this.each(function () {
            ns.open($(this));
          });
          break;
        case "close":
        case "hide":
          this.each(function () {
            ns.close($(this));
          });
          break;
        case "toggle":
          this.each(function () {
            ns.toggle($(this));
          });
          break;
      }
      return this;
    } else {
      // Initialization
      // Event listeners
      this.on("click", ns.onClick);
      this.on("open", ns.onOpen);
      this.on("close", ns.onClose);
      var defaultConfig = $.extend(
        {
          allowMultiple: false,
          expanded: false,
          group: null,
          init: false,
          speed: 250,
          target: null,
          temp: {},
        },
        arguments[0]
      );

      // Constructor
      this.each(function (i) {
        // Default config
        var config = $.extend({}, defaultConfig);
        // update the config with data attributes
        var data = $(this).data();
        for (var prop in defaultConfig) {
          if (data[prop]) {
            config[prop] = data[prop];
          }
        }
        // If the element is an <a> tag -> use the href attribute
        if ($(this).is("a")) {
          config.target = $(this).attr("href") || config.target;
        }
        // Exit if no target specified
        if (!config.target || config.target === null) {
          return;
        }
        // Convert the target into a jQuery object
        config.target = $(config.target);
        // Set the expanded value
        config.expanded = $(this).attr("aria-expanded") || config.expanded;
        config.expanded =
          typeof config.expanded === "string"
            ? config.expanded.toLowerCase()
            : config.expanded;
        config.expanded = config.expanded === "true" ? true : config.expanded;
        // temp storage object
        config.temp = { animations: 0, group: null };
        // Initialize
        this.__collapsible = config;
        // Open/close any elements
        if (config.expanded === true) {
          ns.open($(this));
        } else {
          ns.close($(this));
        }
      });
      // Return the query
      return this;
    }
  };
  // Default initializer
  $('[data-toggle="collapse"]').collapsible();

  // Accordions
  $('[data-toggle="collapse"]').on("click", function () {
    if ($(this).attr("aria-expanded") === "true") {
      $(this).children(".ti-plus").removeClass("ti-plus").addClass("ti-minus");
    } else {
      $(this).children(".ti-minus").removeClass("ti-minus").addClass("ti-plus");
    }
  });
})(jQuery);
