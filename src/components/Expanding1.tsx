"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";

// Move GSAP registration into a client-side check

interface ExpandImageEffectProps {
    imageUrl: string;
    projectNumber: string;
    text: string;
    expandText: string;
}

export const ExpandImageEffect: React.FC<ExpandImageEffectProps> = ({ 
    imageUrl, 
    projectNumber, 
    text, 
    expandText 
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const expandTextRef = useRef<HTMLSpanElement>(null);
    const textBlockRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			gsap.registerPlugin(ScrollTrigger, Flip);
		}

        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const setupAnimations = async () => {
            if (!wrapperRef.current || !imageRef.current || 
                !expandTextRef.current || !textBlockRef.current) {
                return;
            }

            const wrapper = wrapperRef.current;
            const image = imageRef.current;
            const expandText = expandTextRef.current;

            wrapper.classList.add("type--open");
            const flipstate = Flip.getState([image, expandText], {
                props: "transform",
            });
            wrapper.classList.remove("type--open");

            Flip.to(flipstate, {
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: wrapper,
                    start: "clamp(top bottom)",
                    end: "+=135%",
                    scrub: true,
                },
            });

            gsap.to(textBlockRef.current, {
                ease: "sine.inOut",
                yPercent: -150,
                opacity: 0.2,
                skewX: -8,
                scrollTrigger: {
                    trigger: textBlockRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        };

        setupAnimations();

        return () => {
            if (typeof window !== 'undefined') {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            }
        };
    }, [isMounted]);

    // Rest of the component remains the same
    return (
        <div className="content content--left">
            <h3 className="meta">Project {projectNumber}</h3>
            <h2
                className="type"
                ref={wrapperRef}
                data-expand-1
            >
                {text.split("<br />").map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
                <span className="type__expand type__expand--inline type__expand--reveal">
                    <span
                        className="type__expand-img"
                        ref={imageRef}
                    >
                        <span
                            className="type__expand-img-inner"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                    </span>
                    <span
                        className="anim skewed"
                        ref={expandTextRef}
                    >
                        {expandText}
                    </span>
                </span>
            </h2>
            <p
                className="block"
                ref={textBlockRef}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, dolor! Rerum, maiores voluptates. Nisi, labore impedit optio similique culpa, suscipit repellat magnam quia, nesciunt
                veniam debitis. Quae assumenda eveniet minima magni ipsa velit quas?
            </p>
        </div>
    );
};