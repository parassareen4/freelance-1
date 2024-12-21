"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip, ScrollTrigger } from "gsap/all";
import Image from "next/image";

interface ContentProps {
	projectTitle: string;
	mainText: string;
	emphasizedText: string;
	imageUrl: string;
	paragraph: string;
}

const Content: React.FC<ContentProps> = ({ projectTitle, mainText, emphasizedText, imageUrl, paragraph }) => {
	const contentRef = useRef<HTMLDivElement | null>(null);
	const textBlock = useRef<HTMLElement | null>(null); // Ref for emphasizedText span
	const imageRef = useRef<HTMLImageElement | null>(null); // Ref for image element

	useEffect(() => {
		gsap.registerPlugin(Flip, ScrollTrigger);

		const scrollEffect = () => {
			const wrapElement = contentRef.current;
			const image = imageRef.current;

			if (!wrapElement || !image || !textBlock.current) {
				console.error("Missing required elements for animation.");
				return;
			}

			const expandTexts = wrapElement.querySelectorAll<HTMLSpanElement>(".anim");

			wrapElement.classList.add("type--open");
			const flipState = Flip.getState([image, ...expandTexts], {
				props: "transform",
			});

			wrapElement.classList.remove("type--open");

			Flip.to(flipState, {
				ease: "power1.inOut",
				scrollTrigger: {
					trigger: wrapElement,
					start: "top bottom",
					end: "+=150%",
					scrub: true,
				},
			})
				.to(
					textBlock.current,
					{
						ease: "sine.inOut",
						yPercent: -50,
						opacity: 0.5,
						skewX: -8,
						scrollTrigger: {
							trigger: textBlock.current,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					},
					0,
				)
				.to(image, {
					scale: 1.5, // Grow image on scroll
					scrollTrigger: {
						trigger: wrapElement,
						start: "top bottom",
						end: "200% top",
						scrub: true,
					},
				});
		};

		scrollEffect();
		return () => {
			// Clean up animations on component unmount
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);



	
	return (
		<div
			ref={contentRef}
			className="content content--left"
		>
			{/* Project Title */}
			<h3 className="meta">{projectTitle}</h3>

			{/* Main Text with Expand Effect */}
			<h2 className="type">
				{mainText.split("\n").map((line, index) => (
					<React.Fragment key={index}>
						{line}
						<br />
					</React.Fragment>
				))}
				<span className="type__expand type__expand--inline type__expand--reveal">
					<span className="type__expand-img">
						{/* Image is displayed */}
						<Image
							src={imageUrl}
							alt="Expanding"
							className="object-cover transform-gpu type__expand-img-inner"
							layout="fill"
							ref={imageRef}
						/>
					</span>
					<span
						className="anim skewed"
						ref={textBlock}
					>
						{emphasizedText}
					</span>
				</span>
			</h2>

			{/* Paragraph Block */}
			<p className="block">{paragraph}</p>
		</div>
	);
};

export default Content;
