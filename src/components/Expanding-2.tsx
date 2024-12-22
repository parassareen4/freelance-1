"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";

interface ExpandImageEffectProps {
	imageUrl: string;
	projectNumber: string;
	beforeText: string;
	centerLeftText: string;
	centerRightText: string;
	afterText: string;
	description: string;
}

export const ExpandImageEffectCenter: React.FC<ExpandImageEffectProps> = ({ imageUrl, projectNumber, beforeText, centerLeftText, centerRightText, afterText, description }) => {
	const [isMounted, setIsMounted] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const expandTextsRef = useRef<HTMLSpanElement[]>([]);
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
			if (!wrapperRef.current || !imageRef.current || expandTextsRef.current.length === 0 || !textBlockRef.current) {
				return;
			}

			const wrapper = wrapperRef.current;
			const image = imageRef.current;
			const expandTexts = expandTextsRef.current;

			// Initial Flip state
			wrapper.classList.add("type--open");
			const flipstate = Flip.getState([image, ...expandTexts], {
				props: "transform",
			});
			wrapper.classList.remove("type--open");

			// Create the Flip animation timeline
			Flip.to(flipstate, {
				ease: "sine.inOut",
				simple: true,
				scrollTrigger: {
					trigger: wrapper,
					start: "center bottom",
					end: "center top",
					scrub: true,
				},
			});

			// Text block animation
			gsap.fromTo(
				textBlockRef.current,
				{
					xPercent: 15,
					skewX: -5,
				},
				{
					ease: "sine.inOut",
					xPercent: -15,
					skewX: 5,
					opacity: 0.2,
					scrollTrigger: {
						trigger: textBlockRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				},
			);
		};

		setupAnimations();

		return () => {
			if (typeof window !== "undefined") {
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			}
		};
	}, [isMounted]);

	// Helper function to add refs to expandTextsRef array
	const addToExpandTextsRef = (el: HTMLSpanElement | null) => {
		if (el && !expandTextsRef.current.includes(el)) {
			expandTextsRef.current.push(el);
		}
	};

	return (
		<div className="content content--center">
			<h3 className="meta">Project {projectNumber}</h3>
			<h2
				className="type"
				ref={wrapperRef}
				data-expand-2
			>
				{beforeText}
				<br />
				embrace the
				<br />
				<span className="type__expand type__expand--reveal type__expand--center">
					<span
						className="aright"
						ref={addToExpandTextsRef}
					>
						{centerLeftText}
					</span>
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
						ref={addToExpandTextsRef}
					>
						{centerRightText}
					</span>
				</span>
				<br />
				{afterText}
			</h2>
			<p
				className="block"
				ref={textBlockRef}
			>
				{description}
			</p>
		</div>
	);
};
