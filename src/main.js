import gsap from "gsap";
import { Observer, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Observer);

const initHeroBannerAnimation = () => {
    // GSAP timeline for image, title, and description animations
    gsap.fromTo(".image-section img", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1 })
        .duration(1.5)
        .delay(0.5);

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".image-section",
            start: "top top",
            end: "410%",
            scrub: true,
            pin: true,
            markers: true, // remove this line in production
        },
    });

    // Image opacity animation on page load
    gsap.fromTo(".image-section img", { opacity: 0 }, { opacity: 1, duration: 3 });

    // Add title text animation to the timeline
    tl.to(".title-text", {
        opacity: 1,
        duration: 1,
        ease: "none",
        scrollTrigger: {
            start: "+=100",
            end: "+=400",
            scrub: true,
            markers: true, // remove this line in production
        },
    }).to(".title-text", {
        opacity: 0,
        duration: 1,
        ease: "none",
        scrollTrigger: {
            start: "+=800",
            end: "+=1200",
            scrub: true,
            markers: true, // remove this line in production
        },
    });

    // Add description text animation to the timeline
    tl.to(".description-text", {
        opacity: 1,
        backgroundImage: "linear-gradient(to bottom, #39B54A 100%, rgb(0, 0, 0) 0%)",
        color: "black",
        duration: 1,
        ease: "none",
        scrollTrigger: {
            start: "+=1600",
            end: "+=2200",
            scrub: true,
            markers: true, // remove this line in production
        },
    });
};
const initImageSequenceAnimation = () => {
    const imageSequenceElm = document.querySelector("#image-sequence");
    imageSequenceElm.width = 1920;
    imageSequenceElm.height = 1080;
    const context = imageSequenceElm.getContext("2d");

    const frameCount = 300;
    const currentFrame = (index) => `/images/${(index + 1).toString().padStart(5, "0")}.jpg`;

    const images = [];
    const particles = {
        frame: 0,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.style.objectPosition = "center";
        img.style.objectFit = "cover";
        images.push(img);
    }

    const observer = Observer.create({
        type: "scroll",
        tolerance: 30,
        onUpdate: (self) => {
            // this is to avoid jerk animation on step scroll. (one scroll wheel not limit to one frame update.)
            const scrollProgress =
                self.scroll / (document.documentElement.scrollHeight - window.innerHeight);
            const targetFrame = interpolate(0, frameCount - 1, scrollProgress); // Use interpolation for smoother transitions
            particles.frame = targetFrame;
        },
    });

    gsap.to(particles, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        height: "100vh",
        scrollTrigger: {
            trigger: "#image-sequence",
            scrub: 0.5,
            markers: true,
            start: "top-=80% top",
            end: "bottom+=200%",
        },
        onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
    });
    // Pinning ScrollTrigger
    ScrollTrigger.create({
        trigger: "#image-sequence",
        start: "top 80px",
        end: "bottom top",
        pin: true,
        scrub: 0.5,
    });

    // Animation ScrollTrigger
    ScrollTrigger.create({
        trigger: "#image-sequence",
        start: "top-=80% top",
        end: "bottom+=200%",
        scrub: 0.5,
    });

    images[0].onload = render;

    function render() {
        const currentFrameImage = images[particles.frame];

        context.clearRect(0, 0, 1157, 770);
        context.drawImage(currentFrameImage, 0, 0, imageSequenceElm.width, imageSequenceElm.height);
    }
};
document.addEventListener("DOMContentLoaded", function () {
    initHeroBannerAnimation();
    initImageSequenceAnimation();
});
