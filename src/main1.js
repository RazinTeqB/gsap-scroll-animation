import * as ScrollMagic from "scrollmagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import "scrollmagic/scrollmagic/uncompressed/plugins/jquery.ScrollMagic";
import $ from "jquery";
import gsap, { Linear } from "gsap";

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize ScrollMagic Controller
    var controller = new ScrollMagic.Controller();

    // Image opacity animation on page load
    gsap.fromTo(".image-section img", { opacity: 0 }, { opacity: 1, duration: 1.5 });

    // Sticky image and title text animation
    var scene1 = new ScrollMagic.Scene({
        triggerElement: ".image-section",
        triggerHook: 0,
        duration: "300%",
    })
        .setPin(".image-section")
        .addTo(controller)
        .addIndicators({ name: "Sticky Image" });

    var titleScene = new ScrollMagic.Scene({
        triggerElement: "#title-text-trigger",
        triggerHook: "onLeave",
        offset: -2800,
        duration: 300,
    })
        .setTween(".title-text", 1, { opacity: 1 })
        .addTo(controller)
        .addIndicators({ name: "Title Text" });

    var titleScene2 = new ScrollMagic.Scene({
        triggerElement: "#title-text-trigger",
        triggerHook: "onLeave",
        offset: -2500,
        duration: 300,
    })
        .setTween(".title-text", 1, { opacity: 0 })
        .addTo(controller)
        .addIndicators({ name: "Title Text" });

    new ScrollMagic.Scene({
        triggerElement: "#description-text-trigger",
        triggerHook: "onLeave",
        offset: -2200,
        duration: 300,
    })
        .setTween(".description-text", 1, { opacity: 1 })
        .addTo(controller)
        .addIndicators({ name: "Description Text" });

    new ScrollMagic.Scene({
        triggerElement: "#description-text-trigger",
        triggerHook: "onLeave",
        offset: -1800,
        duration: 300,
    })
        .setTween(".description-text", 1, { opacity: 0 })
        .addTo(controller)
        .addIndicators({ name: "Description Text" });

    // // Description text animation and breaking sticky behavior
    // var scene2 = new ScrollMagic.Scene({
    //     triggerElement: "#title-text-trigger",
    //     triggerHook: "onLeave",
    //     offset: 4000,
    //     duration: 500,
    // })
    //     .setTween(".description-text", { opacity: 0 }, { opacity: 1, duration: 1 })
    //     .addTo(controller);

    // // Break sticky behavior
    // var scene3 = new ScrollMagic.Scene({
    //     triggerElement: ".description-text",
    //     triggerHook: 0.5,
    //     duration: "100%",
    // })
    //     .setPin(".description-text")
    //     .addTo(controller);

    // Debug indicators (optional)
    // scene2.addIndicators({ name: "Description Text" });
    // scene3.addIndicators({ name: "Break Sticky" });
});
