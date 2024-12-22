"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";

interface ExpandImageEffectRightProps {
    imageUrl: string;
    projectNumber: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    description: string;
}

export const ExpandImageEffectRight: React.FC<ExpandImageEffectRightProps> = ({
    imageUrl,
    projectNumber,
    line1,
    line2,
    line3,
    line4,
    description
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textBlockRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger, Flip);
        }
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const setupAnimations = () => {
            if (!wrapperRef.current || !imageRef.current || !textBlockRef.current) {
                return;
            }

            const wrapper = wrapperRef.current;
            const image = imageRef.current;

            // Initial Flip state
            wrapper.classList.add('type--open');
            const flipstate = Flip.getState(image);
            wrapper.classList.remove('type--open');

            // Create the Flip animation timeline
            Flip.to(flipstate, {
                ease: 'sine',
                simple: true,
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'center bottom',
                    end: 'center top',
                    scrub: true,
                }
            });

            // Text block animation with line height
            gsap.fromTo(textBlockRef.current,
                {
                    lineHeight: 1.2,
                    willChange: 'line-height'
                },
                {
                    ease: 'sine.inOut',
                    yPercent: -40,
                    skewX: -2,
                    lineHeight: 2,
                    opacity: 0.2,
                    scrollTrigger: {
                        trigger: textBlockRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        };

        setupAnimations();

        return () => {
            if (typeof window !== 'undefined') {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    }, [isMounted]);

    return (
        <div className="content content--right">
            <h3 className="meta">Project {projectNumber}</h3>
            <h2 className="type" ref={wrapperRef} data-expand-3>
                {line1}<br />
                {line2}<br />
                <span className="type__expand type__expand--full">
                    <span className="type__expand-img" ref={imageRef}>
                        <span
                            className="type__expand-img-inner"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                    </span>
                </span>
                {line3}<br />
                {line4}
            </h2>
            <p className="block" ref={textBlockRef}>
                {description}
            </p>
        </div>
    );
};